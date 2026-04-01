ALTER TABLE "invitation_events" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "invitation_events" CASCADE;--> statement-breakpoint
ALTER TABLE "attendee_responses" ALTER COLUMN "attendee_type" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."attendee_type";--> statement-breakpoint
CREATE TYPE "public"."attendee_type" AS ENUM('named_guest', 'child');--> statement-breakpoint
ALTER TABLE "attendee_responses" ALTER COLUMN "attendee_type" SET DATA TYPE "public"."attendee_type" USING "attendee_type"::"public"."attendee_type";--> statement-breakpoint
DROP INDEX "rsvps_invitation_event_idx";--> statement-breakpoint
CREATE UNIQUE INDEX "rsvps_invitation_idx" ON "rsvps" USING btree ("invitation_id");--> statement-breakpoint
ALTER TABLE "invitation_activity" DROP COLUMN "event_key";--> statement-breakpoint
ALTER TABLE "rsvps" DROP COLUMN "event_key";--> statement-breakpoint
DROP TYPE "public"."event_key";