import { spawn, type ChildProcess } from "node:child_process";
import { mkdir, readdir, rm } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { setTimeout as delay } from "node:timers/promises";

import {
  e2eAppPort,
  e2eBaseUrl,
  e2eDbHost,
  e2eDbName,
  e2eDbPort,
  e2eManifestPath,
  e2eMigrationsDir,
  e2ePostgresDataDir,
  e2eTmpDir,
  getE2eAppEnv,
} from "./e2e-env";

const trackedChildren = new Set<ChildProcess>();
let shuttingDown = false;

function withAppEnv() {
  return {
    ...process.env,
    ...getE2eAppEnv(),
  };
}

function trackChild(processLabel: string, child: ChildProcess) {
  trackedChildren.add(child);

  child.on("exit", (code, signal) => {
    trackedChildren.delete(child);

    if (!shuttingDown) {
      const detail = signal ? `signal ${signal}` : `code ${code ?? "unknown"}`;
      console.error(`${processLabel} exited before Playwright finished (${detail}).`);
      void shutdown(code ?? 1);
    }
  });

  return child;
}

async function runCommand(
  label: string,
  command: string,
  args: string[],
  stdio: "inherit" | "ignore" = "inherit",
) {
  await new Promise<void>((resolve, reject) => {
    const child = spawn(command, args, {
      env: withAppEnv(),
      stdio,
    });

    child.once("error", reject);
    child.once("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`${label} failed with exit code ${code ?? "unknown"}.`));
    });
  });
}

async function commandSucceeds(command: string, args: string[]) {
  return new Promise<boolean>((resolve) => {
    const child = spawn(command, args, {
      env: withAppEnv(),
      stdio: "ignore",
    });

    child.once("error", () => resolve(false));
    child.once("exit", (code) => resolve(code === 0));
  });
}

async function waitForPostgres() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    if (
      await commandSucceeds("pg_isready", [
        "-h",
        e2eDbHost,
        "-p",
        String(e2eDbPort),
        "-U",
        "postgres",
        "-d",
        "postgres",
      ])
    ) {
      return;
    }

    await delay(500);
  }

  throw new Error("Postgres did not become ready in time.");
}

async function waitForHttp(url: string) {
  for (let attempt = 0; attempt < 120; attempt += 1) {
    try {
      const response = await fetch(url);

      if (response.ok || response.status < 500) {
        return;
      }
    } catch {
      // Keep polling until the app is reachable.
    }

    await delay(500);
  }

  throw new Error(`App server at ${url} did not become ready in time.`);
}

async function getE2eMigrationPaths() {
  const entries = await readdir(e2eMigrationsDir, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile() && /^\d+.*\.sql$/.test(entry.name))
    .map((entry) => path.join(e2eMigrationsDir, entry.name))
    .sort((left, right) => left.localeCompare(right));
}

async function setupDatabase() {
  await rm(e2eManifestPath, { force: true });
  await rm(e2eTmpDir, { recursive: true, force: true });
  await mkdir(e2eTmpDir, { recursive: true });

  await runCommand("initdb", "initdb", [
    "-D",
    e2ePostgresDataDir,
    "-U",
    "postgres",
    "-A",
    "trust",
  ]);

  trackChild(
    "postgres",
    spawn(
      "postgres",
      [
        "-D",
        e2ePostgresDataDir,
        "-p",
        String(e2eDbPort),
        "-c",
        `listen_addresses=${e2eDbHost}`,
      ],
      {
        env: withAppEnv(),
        stdio: "inherit",
      },
    ),
  );

  await waitForPostgres();

  await runCommand("create database", "psql", [
    "-h",
    e2eDbHost,
    "-p",
    String(e2eDbPort),
    "-U",
    "postgres",
    "-d",
    "postgres",
    "-c",
    `CREATE DATABASE ${e2eDbName};`,
  ]);

  await runCommand("enable pgcrypto", "psql", [
    "-h",
    e2eDbHost,
    "-p",
    String(e2eDbPort),
    "-U",
    "postgres",
    "-d",
    e2eDbName,
    "-c",
    "CREATE EXTENSION IF NOT EXISTS pgcrypto;",
  ]);

  const migrationPaths = await getE2eMigrationPaths();

  for (const migrationPath of migrationPaths) {
    await runCommand("apply migration", "psql", [
      "-h",
      e2eDbHost,
      "-p",
      String(e2eDbPort),
      "-U",
      "postgres",
      "-d",
      e2eDbName,
      "-f",
      migrationPath,
    ]);
  }
}

async function startApp() {
  trackChild(
    "next-app",
    spawn(
      "npm",
      [
        "run",
        "dev",
        "--",
        "--hostname",
        e2eDbHost,
        "--port",
        String(e2eAppPort),
      ],
      {
        env: withAppEnv(),
        stdio: "inherit",
      },
    ),
  );

  await waitForHttp(e2eBaseUrl);
}

async function shutdown(exitCode = 0) {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;

  try {
    const { closeDb } = await import("@/src/db");
    await closeDb();
  } catch {
    // Ignore DB shutdown errors during teardown.
  }

  const children = [...trackedChildren].reverse();

  for (const child of children) {
    if (child.exitCode === null) {
      child.kill("SIGTERM");
    }
  }

  await delay(1_000);

  for (const child of children) {
    if (child.exitCode === null) {
      child.kill("SIGKILL");
    }
  }

  process.exit(exitCode);
}

process.on("SIGINT", () => {
  void shutdown(0);
});

process.on("SIGTERM", () => {
  void shutdown(0);
});

process.on("uncaughtException", (error) => {
  console.error(error);
  void shutdown(1);
});

process.on("unhandledRejection", (error) => {
  console.error(error);
  void shutdown(1);
});

async function main() {
  Object.assign(process.env, getE2eAppEnv());

  await setupDatabase();

  const { seedPlaywrightData } = await import("./seed-playwright-data");
  await seedPlaywrightData();

  await startApp();

  await new Promise(() => {
    // Keep the process alive for Playwright's webServer lifecycle.
  });
}

void main().catch((error) => {
  console.error(error);
  void shutdown(1);
});
