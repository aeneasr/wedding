import path from "node:path";

export const e2eAppPort = 34101;
export const e2eBaseUrl = `http://localhost:${e2eAppPort}`;

export const e2eDbHost = "127.0.0.1";
export const e2eDbPort = 35433;
export const e2eDbName = "wedding_playwright";
export const e2eDbUrl = `postgres://postgres@${e2eDbHost}:${e2eDbPort}/${e2eDbName}`;

export const e2eTmpDir = path.join(process.cwd(), ".e2e-tmp");
export const e2ePostgresDataDir = path.join(e2eTmpDir, "postgres-data");
export const e2eManifestPath = path.join(e2eTmpDir, "e2e-manifest.json");
export const e2eMigrationsDir = path.join(process.cwd(), "drizzle");

export const e2eAdminPassword = "playwright-admin-password";
export const e2eAdminPasswordHash =
  "sha256:5298122aefa24faac72d4d89c9ca3f716ad1004dc0a3d89ab652ff894ba29fa5";
export const e2eSigningSecret =
  "playwright-signing-secret-with-at-least-thirty-two-chars";

export function getE2eAppEnv() {
  return {
    APP_URL: e2eBaseUrl,
    DATABASE_URL: e2eDbUrl,
    APP_SIGNING_SECRET: e2eSigningSecret,
    ADMIN_SHARED_PASSWORD_HASH: e2eAdminPasswordHash,
  };
}
