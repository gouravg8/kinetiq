import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { users, accounts, verifications, sessions } from "../../auth-schema";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

const pool = new Pool({ connectionString: process.env.DATABASE_URL! });
export const drizzleClient = drizzle(pool);

export const adapter = drizzleAdapter(drizzleClient, {
    schema: {
        users,
        accounts,
        verifications,
        sessions
    },
    provider: "pg",
});
