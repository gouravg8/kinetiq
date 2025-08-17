DROP INDEX "user_date_unique";--> statement-breakpoint
ALTER TABLE "daily_logs" ADD COLUMN "date_only" date NOT NULL;--> statement-breakpoint
ALTER TABLE "daily_logs" ADD COLUMN "updated_on" timestamp DEFAULT now() NOT NULL;