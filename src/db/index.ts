import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";

// In dev, avoid creating a new Pool on every HMR reload by caching it on global
declare global {
	var __NEON_POOL__: Pool | undefined;
}

const connectionString = process.env.DATABASE_URL!;

const pool =
	global.__NEON_POOL__ ?? new Pool({ connectionString });

if (process.env.NODE_ENV === "development") {
	global.__NEON_POOL__ = pool;
}

export const db = drizzle(pool);
