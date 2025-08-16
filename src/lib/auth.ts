import { adapter, drizzleClient } from "@/db"
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "../../auth-schema";

// console.log("Better Auth Adapter:", adapter); // ✅ Confirm it's not undefined

export const auth = betterAuth({
    // logger: {
    //     warn: (msg) => console.warn("Better Auth WARN:", msg),
    //     info: (msg) => console.info("Better Auth INFO:", msg),
    // },
    database: drizzleAdapter(drizzleClient, {
        schema,
        provider: "pg",
        usePlural: true
    }),
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            prompt: "select_account",
            accessType: "offline"
        }
    }
})