import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "@/src/db/schema";
import { env } from "@/src/lib/env";

let poolInstance: Pool | null = null;
let dbInstance: ReturnType<typeof drizzle<typeof schema>> | null = null;

export function getDb() {
  if (!env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured.");
  }

  if (!dbInstance) {
    poolInstance = new Pool({
      connectionString: env.DATABASE_URL,
    });
    dbInstance = drizzle(poolInstance, { schema });
  }

  return dbInstance;
}

export async function closeDb() {
  if (poolInstance) {
    await poolInstance.end();
    poolInstance = null;
  }

  dbInstance = null;
}
