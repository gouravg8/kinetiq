import { adapter } from "@/db"
import { betterAuth } from "better-auth"

export const auth = betterAuth({
    adapter,
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            prompt: "select_account",
            accessType: "offline"
        }
    }
})