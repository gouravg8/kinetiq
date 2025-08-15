import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "@/db/schema";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL!,
});

const drizzleClient = drizzle(pool, { schema });

export const adapter = drizzleAdapter(drizzleClient, {
    schema: { users: schema.users, dailyLogs: schema.dailyLogs },
    provider: "pg"
    // db:drizzleClient, {
    // schema,
    // provider: "pg",

});
