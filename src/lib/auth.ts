import { db } from "@/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "@/db/schema";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  // Trusted origins for CORS / origin checks. Populate from env or use sensible defaults for local dev.
  trustedOrigins: (`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"},http://127.0.0.1:3000`)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      ...schema,
    },
  }),
});
