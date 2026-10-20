# GWPR Private Limited — Corporate Website, Student Career Portal & Certificate Verification Platform

A modern corporate website, student career portal, online course enrollment system, and verifiable certificate issuance/lookup platform built for **GWPR Private Limited**.

---

## 🌟 Key Features

1. **Corporate & Services Website:**
   - **Hero Section:** "Build Skills. Earn Certifications. Shape Your Career." with tech visuals and quick actions.
   - **9 Enterprise Digital Services:** Website Development, E-commerce, UI/UX Design, Digital Marketing, SEO, Social Media Marketing, Meta Ads Campaign Management, Lead Generation, and Website Maintenance.
   - **Configurable WhatsApp & Contact Form:** Direct integration with WhatsApp and custom enquiry modal.
   - **No Fabricated Claims:** Transparent depiction of company capabilities, curriculum, and technology services.

2. **Course Catalogue & Enrollment System:**
   - **11 Technical Training Programs:**
     - Machine Learning (ML)
     - SQL (Structured Query Language)
     - Python Programming
     - Artificial Intelligence and Machine Learning (AI/ML)
     - Java Programming
     - Blockchain Technology
     - Full Stack Web Development
     - Digital Marketing
     - Power BI
     - Java Full Stack Development
     - Amazon Web Services (AWS)
   - **Search & Filter:** Category chips, difficulty level filter (Beginner, Intermediate, Advanced), and live keyword search.
   - **Detailed Syllabus Modal:** Module breakdown, lesson lists, learning outcomes, and certificate eligibility.
   - **Duplicate Enrollment Prevention:** Unique `ENR-YYYY-XXXX` identifier generation with browser LocalStorage persistence.

3. **Student Career Portal & Interactive Learning Interface:**
   - **Demo Authentication:** Mock session without storing passwords on disk. Includes one-click demo login (`aarav.sharma@example.com` / `password123`).
   - **Student Dashboard:** Enrolled courses, curriculum progress indicators, completed courses counter, and certificate list.
   - **Interactive Learning Interface (`/learning/:enrollmentId`):** Module-by-module lesson navigation, lesson completion toggle, progress bar, and confetti celebration upon 100% completion.

4. **Verifiable Certificate Generation & QR System:**
   - **Landscape A4 Design:** Navy blue, white, and gold accents with decorative borders, seal, and digital signature.
   - **Unique ID Format:** E.g., `GWPR-CERT-2026-A7K92X`.
   - **Client-Side PDF Generation & Print:** High-resolution export using `html2canvas` and `jsPDF`.
   - **Embedded QR Code:** Encodes the live verification route `[baseUrl]/verify/[certificateId]`.

5. **Public Certificate Verification Portal (`/verify` and `/verify/:certificateId`):**
   - **Dual Verification Options:** Instant manual Certificate ID search or camera QR code scanning via `html5-qrcode`.
   - **Real Integrity Validation:** Verifies against actual browser records and returns authentic details or an honest "Certificate Not Found" message.
   - **Transparent Prototype Notice:** Explains LocalStorage scope vs future cloud API verification.

6. **Admin Demonstration Workspace (`/admin`):**
   - **Overview Statistics:** Active catalog courses, demo enrollments, completed courses, and issued certificates.
   - **Course Management:** Add, edit, and delete courses.
   - **Registry Inspection:** Search certificates, view student profiles, and inspect demo enrollments.
   - **Branding Configuration:** Edit company name, legal CIN, signatory details, contact numbers, and verification URL base.
   - **Reset Demo Data:** One-click confirmation to restore seed data.

---

## 🛠️ Technology Stack

- **Framework:** React 19 + TypeScript + Vite
- **Database / Cloud:** Supabase (`@supabase/supabase-js`) + PostgreSQL with RLS
- **Fallback Persistence:** LocalStorage resilient offline client
- **Styling:** Tailwind CSS v4 + Vanilla CSS custom print stylesheets
- **Icons:** Lucide React
- **QR Engine:** `qrcode.react` (SVG generator) + `html5-qrcode` (camera scanner)
- **PDF Generation:** `jspdf` + `html2canvas`
- **Animations:** `canvas-confetti`
- **Routing:** `react-router-dom` v7

---

## 🗄️ Supabase Cloud Database Integration

This application includes built-in hybrid cloud connectivity:
- When connected to **Supabase**, certificate verification works **universally across any mobile phone, tablet, or PC** by querying the shared PostgreSQL database!
- When disconnected or offline, it automatically and gracefully falls back to local browser storage so the website **never breaks**.

### Quick 3-Step Setup:

1. **Create Tables & Security Policies:**
   - Open your [Supabase Dashboard](https://supabase.com/dashboard) → **SQL Editor** → **New Query**.
   - Copy the complete script from [`supabase_schema.sql`](file:///d:/inter%20cer/supabase_schema.sql) (or click **Copy SQL Schema** in `/admin` → **Supabase Database**).
   - Click **Run**. This creates `courses`, `students`, `enrollments`, `certificates`, and `enquiries` with public read RLS policies.

2. **Connect via Admin Panel (Zero Server Restarts):**
   - Open [http://localhost:5173/admin](http://localhost:5173/admin).
   - Go to the **Supabase Database** tab.
   - Paste your **Project URL** and **Anon / Public Key** (from Supabase *Project Settings → API*).
   - Click **Save & Connect**.
   - Click **Test Connection** to verify live communication with your cloud database.

3. **1-Click Seed Data Migration:**
   - On the same tab, click **Sync All Data to Supabase**.
   - All 11 course curriculums, demo student *Aarav Sharma*, and pre-seeded certificate `GWPR-CERT-2026-A7K92X` are instantly uploaded to your PostgreSQL database!

*(Optional)* You can also configure via `.env`:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### 2. Installation
```bash
# Clone or open project directory
cd "d:/inter cer"

# Install dependencies
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production
```bash
npm run build
```
The optimized production bundle will be generated in the `dist/` directory.

---

## ☁️ Deployment on Vercel

1. Push this repository to GitHub or GitLab.
2. In Vercel, click **"Add New Project"** and import the repository.
3. Configure the build settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. The included [`vercel.json`](file:///d:/inter%20cer/vercel.json) rewrites all incoming routes to `index.html` so that deep links such as `/verify/GWPR-CERT-2026-A7K92X` resolve seamlessly.
5. In the Admin Workspace (`/admin`), set your **Base Verification Domain URL** to your assigned Vercel URL (e.g. `https://gwpr.vercel.app`).
