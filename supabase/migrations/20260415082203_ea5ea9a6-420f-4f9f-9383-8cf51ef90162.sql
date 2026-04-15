
ALTER TABLE public.lead_qualifications
  DROP COLUMN role,
  DROP COLUMN company,
  DROP COLUMN main_challenge,
  ADD COLUMN website TEXT,
  ALTER COLUMN terms_accepted SET DEFAULT true;
