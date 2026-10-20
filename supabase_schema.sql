-- ==============================================================================
-- GWPR PRIVATE LIMITED — SUPABASE DATABASE SCHEMA & INITIAL SEED
-- Run this script in the Supabase SQL Editor (Dashboard -> SQL Editor -> New Query)
-- ==============================================================================

-- 1. COURSES TABLE
CREATE TABLE IF NOT EXISTS public.courses (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  short_description TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  level TEXT NOT NULL,
  duration TEXT NOT NULL,
  thumbnail TEXT NOT NULL,
  badge_color TEXT NOT NULL DEFAULT 'bg-blue-600',
  skills JSONB NOT NULL DEFAULT '[]'::jsonb,
  syllabus JSONB NOT NULL DEFAULT '[]'::jsonb,
  learning_outcomes JSONB NOT NULL DEFAULT '[]'::jsonb,
  certificate_eligible BOOLEAN NOT NULL DEFAULT TRUE,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. STUDENTS TABLE
CREATE TABLE IF NOT EXISTS public.students (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  mobile TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. ENROLLMENTS TABLE
CREATE TABLE IF NOT EXISTS public.enrollments (
  id TEXT PRIMARY KEY,
  student_id TEXT NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  course_id TEXT NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  enrollment_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  progress INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'Enrolled',
  completed_lessons JSONB NOT NULL DEFAULT '[]'::jsonb,
  completion_date TIMESTAMPTZ,
  CONSTRAINT unique_student_course UNIQUE (student_id, course_id)
);

-- 4. CERTIFICATES TABLE (Universal Public Verification)
CREATE TABLE IF NOT EXISTS public.certificates (
  id TEXT PRIMARY KEY, -- e.g. GWPR-CERT-2026-A7K92X
  student_id TEXT NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  student_name TEXT NOT NULL,
  course_id TEXT NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  course_title TEXT NOT NULL,
  enrollment_id TEXT REFERENCES public.enrollments(id) ON DELETE SET NULL,
  completion_date TEXT NOT NULL,
  issue_date TEXT NOT NULL,
  verification_status TEXT NOT NULL DEFAULT 'Valid',
  signatory_name TEXT NOT NULL,
  signatory_title TEXT NOT NULL,
  company_name TEXT NOT NULL,
  verification_url TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. CONTACT & SERVICE ENQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.enquiries (
  id BIGSERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  mobile TEXT NOT NULL,
  interest TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. COMPANY CONFIG TABLE
CREATE TABLE IF NOT EXISTS public.company_config (
  id INTEGER PRIMARY KEY DEFAULT 1,
  company_name TEXT NOT NULL,
  legal_name TEXT NOT NULL,
  tagline TEXT NOT NULL,
  signatory_name TEXT NOT NULL,
  signatory_title TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  whatsapp_number TEXT NOT NULL,
  address TEXT NOT NULL,
  base_url TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_config ENABLE ROW LEVEL SECURITY;

-- POLICIES: Public read access for universal certificate verification and course catalogue
DROP POLICY IF EXISTS "Public can view all courses" ON public.courses;
CREATE POLICY "Public can view all courses" ON public.courses FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view certificates" ON public.certificates;
CREATE POLICY "Public can view certificates" ON public.certificates FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view company config" ON public.company_config;
CREATE POLICY "Public can view company config" ON public.company_config FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert to enquiries" ON public.enquiries;
CREATE POLICY "Allow public insert to enquiries" ON public.enquiries FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anon full access for students" ON public.students;
CREATE POLICY "Allow anon full access for students" ON public.students FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anon full access for enrollments" ON public.enrollments;
CREATE POLICY "Allow anon full access for enrollments" ON public.enrollments FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anon full access for certificates" ON public.certificates;
CREATE POLICY "Allow anon full access for certificates" ON public.certificates FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anon full access for courses" ON public.courses;
CREATE POLICY "Allow anon full access for courses" ON public.courses FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anon full access for config" ON public.company_config;
CREATE POLICY "Allow anon full access for config" ON public.company_config FOR ALL USING (true) WITH CHECK (true);

-- SEED INITIAL COMPANY CONFIG
INSERT INTO public.company_config (id, company_name, legal_name, tagline, signatory_name, signatory_title, contact_email, contact_phone, whatsapp_number, address, base_url)
VALUES (
  1,
  'GWPR Private Limited',
  'GWPR Private Limited (CIN: U72900KA2024PTC189234)',
  'Empowering Technical Minds & Accelerating Digital Transformation',
  'Dr. Rajesh Vardhan',
  'Head of Academics & Technical Certifications',
  'admissions@gwpr.in',
  '+91 80 4920 1800',
  '918049201800',
  'Tech Innovation Hub, 4th Floor, Global Technology Park, Outer Ring Road, Bengaluru, Karnataka 560103, India',
  'https://gwpr.vercel.app'
) ON CONFLICT (id) DO NOTHING;

-- SEED DEMO STUDENT
INSERT INTO public.students (id, full_name, email, mobile, avatar_url)
VALUES (
  'std_demo_01',
  'Aarav Sharma',
  'aarav.sharma@example.com',
  '+91 98765 12345',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
) ON CONFLICT (id) DO NOTHING;
