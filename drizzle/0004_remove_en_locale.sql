-- Migration: remove 'en' from locale enum
-- PostgreSQL does not support DROP VALUE on enums directly.
-- Strategy: migrate all 'en' rows to 'de', rename old enum, create new one, update column, drop old.

-- Step 1: Migrate any existing 'en' locale rows to 'de'
UPDATE invitations SET locale = 'de' WHERE locale = 'en';

-- Step 2: Rename the old enum
ALTER TYPE "locale" RENAME TO "locale_old";

-- Step 3: Create new enum with only 'de'
CREATE TYPE "locale" AS ENUM ('de');

-- Step 4: Alter the column to use the new enum (cast via text)
-- Must drop default first; PostgreSQL cannot cast a typed default automatically.
ALTER TABLE invitations ALTER COLUMN locale DROP DEFAULT;

ALTER TABLE invitations
  ALTER COLUMN locale TYPE "locale"
  USING locale::text::"locale";

ALTER TABLE invitations ALTER COLUMN locale SET DEFAULT 'de';

-- Step 5: Drop the old enum
DROP TYPE "locale_old";
