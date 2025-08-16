-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"hashed_password" varchar(255) NOT NULL,
	"name" varchar(100),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"is_active" boolean DEFAULT true,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);

*/