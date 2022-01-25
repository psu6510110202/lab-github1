CREATE TABLE IF NOT EXISTS public.recommendations
(
  id bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
  stars bigint NOT NULL DEFAULT 0,
  issues bigint NOT NULL DEFAULT 0,
  total_stars bigint NOT NULL DEFAULT 0,
  votes bigint NOT NULL DEFAULT 0,
  avg_recency_score numeric,
  repo_name text COLLATE pg_catalog."default",
  description text COLLATE pg_catalog."default",
  contributors text[] COLLATE pg_catalog."default",
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT recommendations_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.recommendations
  OWNER to supabase_admin;

GRANT ALL ON TABLE public.recommendations TO anon;

GRANT ALL ON TABLE public.recommendations TO authenticated;

GRANT ALL ON TABLE public.recommendations TO postgres;

GRANT ALL ON TABLE public.recommendations TO service_role;

GRANT ALL ON TABLE public.recommendations TO supabase_admin;