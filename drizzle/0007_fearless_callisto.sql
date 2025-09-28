CREATE TYPE "public"."user_roles" AS ENUM('student', 'manager');--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "password" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" "user_roles" DEFAULT 'student' NOT NULL;