# 🎓 Campus Resolve 2.0

> **Multi-Tier Student Grievance & Statutory Escalation Resolution Network**  
> Built with Next.js (App Router), TypeScript, Tailwind CSS, and Lucide Icons.

[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🌟 Overview

**Campus Resolve 2.0** is an enterprise-grade collegiate grievance redressal platform engineered with a **two-tier resolution hierarchy**:

1. **Tier 1 (College Admin / Department Triage)**: Handles day-to-day academic, hostel, library, and campus infrastructure issues first.
2. **Tier 2 (Super Admin / Apex Higher Organization)**: Handles high-stakes grievances (Anti-Ragging, harassment, systemic administrative failures) and cases escalated when college-level resolution stalls.

### 🎯 Key Highlights
- **Target Authority Routing**: Students can choose *who* to complain to (Department HOD, Hostel Warden, Exam Cell Controller, or Apex bodies like the Central Anti-Ragging Council & State Ombudsman).
- **Mandatory "Why Chosen" Justification**: Prevents frivolous routing and gives administrators immediate context on why higher authorities were engaged.
- **Urgency SLAs**:
  - 🚨 **CRITICAL (6h SLA)**: Immediate hazards, violence, ragging threats.
  - ⚡ **HIGH (24h SLA)**: Urgent hostel utility breakdowns, exam mark discrepancies.
  - ⏱️ **MEDIUM (48h SLA)**: Standard departmental grievances.
  - 📅 **LOW (3-5 Days SLA)**: General administrative inquiries.
- **Anonymous Whistleblower Shield**: Junior students or sensitive complainants can mask their identity under cryptographic token protection to prevent retaliation.
- **Two-Way Escalation Trigger**:
  - College Admins can escalate complex inter-department or high-budget cases to Super Admin.
  - Students can escalate to Super Admin if college authorities breach SLAs or provide unsatisfactory responses.
- **Student Resolution Rating & Feedback**: 1-to-5 star rating and feedback review upon ticket closure.
- **Role Switcher**: Instant switching between **Student**, **College Admin**, and **Super Admin** personas in the navbar for demonstrations and audits.

---

## 🏗️ Architecture & Grievance Flow

```
+-------------------------------------------------------------+
|                      STUDENT PORTAL                         |
|   Selects Priority (Low/Med/High/Critical)                  |
|   Chooses Recipient (College Level vs Apex Org)             |
|   Provides Justification ("Why Chosen Authority")           |
|   Option: Anonymous Whistleblower Protection                |
+------------------------------+------------------------------+
                               |
            +------------------+------------------+
            |                                     |
    [College Authority]                     [Apex Statutory]
            |                                     |
            v                                     v
+-----------------------+             +-----------------------+
|   TIER 1 RESOLUTION   |             |   TIER 2 RESOLUTION   |
|   College Admin       |             |   Super Admin / Org   |
|   - Dept Review       |  Escalates  |   - Anti-Ragging      |
|   - Remedial Action   | ----------> |   - Ombudsman Board   |
|   - Mark Resolved     |  (Breach)   |   - Statutory Order   |
+-----------------------+             +-----------------------+
```

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0 or later)
- [npm](https://www.npmjs.com/) (v9.0 or later)

### Installation

1. **Clone or navigate to the workspace directory**:
   ```bash
   cd "campus resolve 2.0"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🌐 Deploying to GitHub & Vercel

### Step 1: Create a New Repository on GitHub
1. Go to [github.com/new](https://github.com/new).
2. Enter repository name: `campus-resolve-2.0` (or your preferred name).
3. Set visibility to **Public** (or **Private**).
4. Do **not** initialize with README or .gitignore (this project already includes them).
5. Click **Create repository**.

### Step 2: Push Local Code to GitHub
Run the following commands in PowerShell or terminal inside your project directory:

```bash
# Initialize git repository
git init

# Stage all files
git add .

# Create initial commit
git commit -m "feat: complete Campus Resolve 2.0 multi-tier grievance portal"

# Set default branch to main
git branch -M main

# Link to your remote GitHub repository (replace with your repo URL)
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/campus-resolve-2.0.git

# Push code to GitHub
git push -u origin main
```

---

### Step 3: Deploy to Vercel (Free & Instant)
Vercel is the native cloud deployment platform for Next.js applications:

1. Go to [vercel.com](https://vercel.com/) and sign in with your **GitHub account**.
2. Click **Add New...** → **Project**.
3. Select your `campus-resolve-2.0` repository from the list.
4. Click **Deploy** (zero configuration needed; Next.js settings are auto-detected).
5. Within 60 seconds, your application will be live at a public URL (e.g. `https://campus-resolve-2-0.vercel.app`).

---

## 📁 Project Structure

```
campus-resolve-2.0/
├── public/                     # Static assets & icons
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── complaints/     # Full-stack API endpoint (GET, POST)
│   │   │   └── stats/          # Real-time analytics API endpoint
│   │   ├── globals.css         # Tailwind CSS v4 design tokens
│   │   ├── layout.tsx          # Root layout & page metadata
│   │   └── page.tsx            # Main application controller & state coordinator
│   ├── components/
│   │   ├── Badges.tsx          # Visual badges for Priority, Status, Tier
│   │   ├── CollegeAdminPortal.tsx # Tier 1 College Admin triage dashboard
│   │   ├── ComplaintDetailModal.tsx # Audit timeline, action triggers, rating modal
│   │   ├── Navbar.tsx          # Interactive topbar with role switcher & alerts
│   │   ├── NewComplaintModal.tsx # Grievance filing form with targeting & justification
│   │   ├── StudentPortal.tsx   # Student view with filters, tracking & escalation
│   │   └── SuperAdminPortal.tsx # Tier 2 Apex Directorate command center
│   ├── lib/
│   │   ├── authorities.ts      # Directory of College & Super Admin authorities
│   │   ├── mock-data.ts        # Seed complaints covering all tiers & statuses
│   │   └── storage.ts          # Reactive client store with localStorage persistence
│   └── types/
│       └── complaint.ts        # Strict TypeScript domain interfaces
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🛡️ License

This project is licensed under the MIT License - feel free to use, modify, and distribute it for academic or organizational deployments.
