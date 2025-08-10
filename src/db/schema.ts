import { pgTable, serial, varchar, date, boolean, integer, timestamp } from "drizzle-orm/pg-core";

export const dailyLogs = pgTable("daily_logs", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull().references(() => users.id),
    date: date("date").notNull(),
    bodyPart: varchar("body_part", { length: 255 }).notNull(),
    markAsComplete: boolean("mark_as_complete").default(false),
});

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    hashedPassword: varchar('hashed_password', { length: 255 }).notNull(),
    name: varchar('name', { length: 100 }),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
    isActive: boolean('is_active').default(true),
});