
CREATE TABLE public.lead_qualifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  monthly_revenue TEXT NOT NULL,
  main_challenge TEXT NOT NULL,
  terms_accepted BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.lead_qualifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a lead qualification"
ON public.lead_qualifications
FOR INSERT
WITH CHECK (true);
