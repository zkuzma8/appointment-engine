# The Appointment Engine

## Project
Sales training course website for **Tyler Lister** (Assistant Sales Manager, Garber Chevrolet Midland).
Complete activity & follow-up system: 6 modules, scripts, calendar, calculator, tracker.

**Live:** https://zkuzma8.github.io/appointment-engine/
**Repo:** https://github.com/zkuzma8/appointment-engine

## Client
- **Tyler Lister** - Assistant Sales Manager
- **Garber Chevrolet Midland** - 1700 N Saginaw Road, Midland, MI 48640
- Chevrolet dealership, part of Garber Automotive Group (since 1907)
- Uses **DriveCentric** CRM for customer communication
- This is Tyler's personal training system, not an official Garber product

## Brand
- **Name:** The Appointment Engine (always with TM symbol in headings)
- **Colors:** Navy #1B2A4A, Orange #E8963E, Green #2ECC71, Red #E74C3C
- **Font:** Inter (Google Fonts)
- **Tone:** Direct, no-nonsense, like a coach talking to salespeople. No marketing fluff.

## Rules
- **English only** - American dealership, American audience
- **No AI patterns** - no emojis in headings, no generic buzzwords ("unlock", "transform", "comprehensive"), no tricolons, no "Pro Tip" or "Key Insight" headings
- **No long dashes** - use regular hyphens only (no em dash, no en dash, no &mdash;, no &ndash;)
- **No emojis** as decoration or icons anywhere on the site
- **[Name]** and **[Vehicle]** are intentional placeholders in scripts (user fills in)
- **Garber Chevrolet Midland** is hardcoded everywhere [Dealership] used to be
- **Tyler** is hardcoded everywhere [Your Name] used to be
- **cursor-pointer** on every clickable element (buttons, links, onclick divs)
- Mobile-responsive (min 375px), every page has Print button
- Scripts are Tyler's original content - do not rewrite the sales language

## Tech
- Pure HTML + CSS + vanilla JS (no build tools, no frameworks)
- Tailwind CSS via Play CDN
- Google Fonts (Inter)
- Print stylesheet: css/print.css
- Shared JS: js/app.js
- Deployed on GitHub Pages (master branch)

## Structure
```
index.html                              # Landing page
css/print.css                           # Print styles
js/app.js                               # Calculator, tracker, calendar JS
modules/
  module-1-foundation.html              # The Discipline Framework
  module-2-followup-system.html         # 30-Day Follow-Up System
  module-3-reasons-to-call.html         # Strategic Reasons to Call
  module-4-objections.html              # Objection Handling (4-step formula)
  module-5-voicemail.html               # Voicemail System (20-sec timer)
  module-6-metrics.html                 # Metrics & Income Formula
tools/
  calendar.html                         # 30-Day Calendar (click day = script)
  calculator.html                       # Income Calculator (reverse-engineer goals)
  tracker.html                          # Daily Activity Tracker (editable table)
  scripts-cards.html                    # 13 Printable Script Reference Cards
```

## Calendar Phases
- Days 1-3: Red #E74C3C (Speed & Urgency)
- Days 4-10: Orange #E8963E (Value Reinforcement)
- Days 11-20: Blue #3498DB (Pattern Interruption)
- Days 21-30: Navy #1B2A4A (Professional Persistence)
- Days 27, 29: Rest days (no contact)

## Calculator Fields
- Monthly income goal ($)
- Average commission per unit ($)
- Close rate (%)
- Show rate (%)
- Conversation-to-appointment rate (%)
- Output: daily calls needed (based on 22 working days)

## Testing
- Use Playwright for visual and functional testing
- Check: no long dashes, no [Dealership], no Cyrillic, no emojis in headings
- Check: cursor-pointer on all clickable elements
- Check: no mobile overflow at 375px
- Check: print mode hides nav and buttons
