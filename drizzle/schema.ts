import { pgTable, unique, serial, varchar, timestamp, boolean } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const users = pgTable("users", {
	id: serial().primaryKey().notNull(),
	email: varchar({ length: 255 }).notNull(),
	hashedPassword: varchar("hashed_password", { length: 255 }).notNull(),
	name: varchar({ length: 100 }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
	isActive: boolean("is_active").default(true),
}, (table) => [
	unique("users_email_unique").on(table.email),
]);
