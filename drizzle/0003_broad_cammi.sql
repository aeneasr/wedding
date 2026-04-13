CREATE TYPE "public"."activity_type" AS ENUM('invite_sent', 'invite_resent', 'recovery_sent', 'link_opened', 'rsvp_updated', 'admin_updated');--> statement-breakpoint
CREATE TYPE "public"."attendee_type" AS ENUM('named_guest', 'child');--> statement-breakpoint
CREATE TYPE "public"."invitation_mode" AS ENUM('individual', 'household');--> statement-breakpoint
CREATE TYPE "public"."invitee_kind" AS ENUM('adult', 'child');--> statement-breakpoint
CREATE TYPE "public"."locale" AS ENUM('en', 'de');--> statement-breakpoint
CREATE TYPE "public"."rsvp_status" AS ENUM('pending', 'attending', 'declined');--> statement-breakpoint
CREATE TABLE "invitations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"external_id" text,
	"primary_email" text NOT NULL,
	"invitation_mode" "invitation_mode" NOT NULL,
	"locale" "locale" DEFAULT 'de' NOT NULL,
	"token_version" integer DEFAULT 1 NOT NULL,
	"sent_at" timestamp with time zone,
	"last_sent_at" timestamp with time zone,
	"first_opened_at" timestamp with time zone,
	"last_opened_at" timestamp with time zone,
	"access_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "invitations_external_id_unique" UNIQUE("external_id")
);--> statement-breakpoint
CREATE TABLE "invitees" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"invitation_id" uuid NOT NULL,
	"full_name" text NOT NULL,
	"email" text,
	"kind" "invitee_kind" DEFAULT 'adult' NOT NULL,
	"is_primary" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
CREATE TABLE "rsvps" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"invitation_id" uuid NOT NULL,
	"status" "rsvp_status" DEFAULT 'pending' NOT NULL,
	"submitted_at" timestamp with time zone,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
CREATE TABLE "attendee_responses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"rsvp_id" uuid NOT NULL,
	"invitee_id" uuid,
	"attendee_type" "attendee_type" NOT NULL,
	"full_name" text NOT NULL,
	"is_attending" boolean DEFAULT false NOT NULL,
	"dietary_requirements" text,
	"phone_number" text,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
CREATE TABLE "invitation_activity" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"invitation_id" uuid NOT NULL,
	"type" "activity_type" NOT NULL,
	"metadata" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
CREATE TABLE "recovery_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"ip_address" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
ALTER TABLE "invitees" ADD CONSTRAINT "invitees_invitation_id_invitations_id_fk" FOREIGN KEY ("invitation_id") REFERENCES "public"."invitations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rsvps" ADD CONSTRAINT "rsvps_invitation_id_invitations_id_fk" FOREIGN KEY ("invitation_id") REFERENCES "public"."invitations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attendee_responses" ADD CONSTRAINT "attendee_responses_rsvp_id_rsvps_id_fk" FOREIGN KEY ("rsvp_id") REFERENCES "public"."rsvps"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attendee_responses" ADD CONSTRAINT "attendee_responses_invitee_id_invitees_id_fk" FOREIGN KEY ("invitee_id") REFERENCES "public"."invitees"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invitation_activity" ADD CONSTRAINT "invitation_activity_invitation_id_invitations_id_fk" FOREIGN KEY ("invitation_id") REFERENCES "public"."invitations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "invitations_primary_email_idx" ON "invitations" USING btree ("primary_email");--> statement-breakpoint
CREATE INDEX "invitees_invitation_idx" ON "invitees" USING btree ("invitation_id");--> statement-breakpoint
CREATE INDEX "invitees_email_idx" ON "invitees" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "rsvps_invitation_idx" ON "rsvps" USING btree ("invitation_id");--> statement-breakpoint
CREATE INDEX "attendee_responses_rsvp_idx" ON "attendee_responses" USING btree ("rsvp_id");--> statement-breakpoint
CREATE INDEX "invitation_activity_invitation_idx" ON "invitation_activity" USING btree ("invitation_id");--> statement-breakpoint
CREATE INDEX "recovery_requests_email_idx" ON "recovery_requests" USING btree ("email");--> statement-breakpoint
CREATE INDEX "recovery_requests_ip_idx" ON "recovery_requests" USING btree ("ip_address");
