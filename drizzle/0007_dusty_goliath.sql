ALTER TABLE "daily_logs" ALTER COLUMN "body_part" SET DATA TYPE text[] USING ARRAY[body_part];
