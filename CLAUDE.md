# The Appointment Engine™

## Project Overview
Professional sales training course website for **Tyler Lister** (Assistant Sales Manager, Garber Chevrolet Midland).
A plug-and-play document/resource system: course modules, scripts, calendars, calculators, printable PDFs.

## Client
- **Name:** Tyler Lister
- **Role:** Assistant Sales Manager
- **Dealership:** Garber Chevrolet Midland
- **Goal:** Create a complete, usable training system for dealership sales team activity & follow-up

## Brand System
- **Course Name:** The Appointment Engine™
- **Primary Color:** #1B2A4A (deep navy — professionalism, trust)
- **Accent Color:** #E8963E (warm orange — energy, action, urgency)
- **Success Color:** #2ECC71 (green — wins, completed tasks)
- **Warning Color:** #E74C3C (red — missed opportunities)
- **Background:** #F8F9FA (light gray)
- **Text:** #1A1A2E (near-black)
- **Font Headings:** "Inter", sans-serif (via Google Fonts)
- **Font Body:** "Inter", sans-serif
- **Font Mono (scripts):** "JetBrains Mono", monospace (via Google Fonts)
- **Logo/Icon:** Engine gear icon (emoji or SVG)
- **Tone:** Direct, no-nonsense, professional. Like talking to a coach, not a professor.

## Tech Stack
- **Pure HTML5 + CSS3 + Vanilla JavaScript** — no build tools, no frameworks
- **Tailwind CSS v3** via CDN (Play CDN) — utility-first styling
- **Google Fonts** — Inter + JetBrains Mono
- **Print stylesheets** — each page optimized for Ctrl+P → Save as PDF
- No Node.js dependencies required for the site itself
- Static files only — deployable anywhere

## File Structure
```
TylerLister/
├── CLAUDE.md                    # This file
├── index.html                   # Landing page / course overview
├── css/
│   └── print.css                # Print-specific styles
├── js/
│   └── app.js                   # Calculator, interactive features
├── modules/
│   ├── module-1-foundation.html       # MODULE 1 – Foundation
│   ├── module-2-followup-system.html  # MODULE 2 – 30-Day Follow-Up
│   ├── module-3-reasons-to-call.html  # MODULE 3 – Strategic Reasons
│   ├── module-4-objections.html       # MODULE 4 – Objection Handling
│   ├── module-5-voicemail.html        # MODULE 5 – Voicemail System
│   └── module-6-metrics.html          # MODULE 6 – Metrics & Income
├── tools/
│   ├── calendar.html            # 30-Day Follow-Up Calendar (interactive)
│   ├── calculator.html          # Income Reverse-Engineering Calculator
│   ├── tracker.html             # Daily Activity Tracker
│   └── scripts-cards.html       # Printable Script Reference Cards
└── assets/
    └── (images/icons if needed)
```

## Pages to Build

### 1. index.html — Landing Page
- Course title + branding
- "What You'll Learn" overview
- Navigation to all 6 modules
- Quick links to tools (calendar, calculator, tracker)
- Professional hero section

### 2. Module Pages (6 total)
Each module page includes:
- Module number + title
- Objective section
- Full video scripts (formatted as "script cards" — styled blocks)
- Key takeaways box
- Navigation: prev/next module + back to home
- Print button (triggers browser print dialog)

### 3. Tools

#### calendar.html — 30-Day Follow-Up Calendar
- Visual calendar grid: Days 1–30
- Color-coded phases:
  - Days 1–3: RED (Speed & Urgency)
  - Days 4–10: ORANGE (Value Reinforcement)
  - Days 11–20: BLUE (Pattern Interruption)
  - Days 21–30: NAVY (Professional Persistence)
- Click on day → shows recommended script/action
- Printable version

#### calculator.html — Income Calculator
- Input fields: close rate %, show rate %, avg commission, income goal
- Auto-calculates: appointments needed, conversations needed, calls needed
- Visual funnel graphic
- "Your Daily Plan" output

#### tracker.html — Daily Activity Tracker
- Table with columns: Date, Calls, Conversations, Appointments Set, Shows, Sales
- Weekly summary rows
- Print-friendly for daily desk use
- Simple editable fields (for digital use)

#### scripts-cards.html — Printable Script Cards
- All scripts from all modules
- Formatted as pocket-reference cards (2-per-page print layout)
- Categories: Internet Lead, Phone Up, Walk-In, Service, Equity, Objections

## Content Source
All course content comes from the user's initial prompt (Tyler's ChatGPT outline).
Modules 1–6 scripts are provided in full. Do not modify the sales language — Tyler wrote it.

## Design Rules
- Mobile-responsive (Tyler's team may view on phones)
- Every page has a "Print / Save as PDF" button
- Navigation consistent across all pages
- Dark sidebar or top nav with course branding
- Script blocks styled distinctively (left border accent, monospace option)
- No login required — open access
- Clean, corporate-professional look (not flashy, not boring)

## Deployment
- **GitHub Pages** — free hosting via zkuzma8 account
- Repository: `TylerLister` (or `appointment-engine`)
- Tyler gets a link like: `https://zkuzma8.github.io/appointment-engine/`

## Development Order
1. Create base HTML template with nav + branding + Tailwind
2. Build index.html (landing page)
3. Build Module 1–6 pages (content from source)
4. Build Calendar tool
5. Build Calculator tool
6. Build Tracker tool
7. Build Script Cards (printable)
8. Test print/PDF output on all pages
9. Deploy to GitHub Pages

## Important Notes
- All text content is in ENGLISH (this is for an American dealership)
- Keep the tone professional but approachable
- The ™ symbol must appear with "The Appointment Engine" in headings
- Scripts should be easy to read aloud (clear formatting, no walls of text)
- Each "video script" is meant to be read on camera — format accordingly
