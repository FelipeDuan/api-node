ALTER TABLE "users" ADD COLUMN "password" text;--> statement-breakpoint
CREATE UNIQUE INDEX "enrollments_userId_courseId_index" ON "enrollments" USING btree ("userId","courseId");