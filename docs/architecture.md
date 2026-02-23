# Architecture Details

## Calendar: 6 Touchpoints, 36 Scripts

The calendar is a 30-day window with 6 strategic touchpoints (not daily contact).
Each touchpoint has multiple script variants filterable by channel (ALL/CALL/VM/TEXT/EMAIL).

| Day | Phase | Color | Scripts |
|-----|-------|-------|---------|
| 1 | Speed & Urgency | Red #E74C3C | 3 call, 2 vm, 3 text, 1 email = 9 |
| 2 | Speed & Urgency | Red #E74C3C | 2 call, 1 vm, 2 text = 5 |
| 5 | Value Reinforcement | Orange #E8963E | 2 call, 1 vm, 2 text, 1 email = 6 |
| 12 | Pattern Interruption | Blue #3498DB | 2 call, 1 vm, 2 text = 5 |
| 25 | Professional Persistence | Navy #1B2A4A | 2 call, 1 vm, 2 text, 1 email = 6 |
| 30 | Professional Persistence | Navy #1B2A4A | 1 call, 1 vm, 2 text, 1 email = 5 |

Days 3-4, 6-11, 13-24, 26-29: No scheduled contact (strategic silence).

### Module 2 vs Calendar Tool
- **Module 2** (module-2-followup-system.html) = teaching page. Shows 1 representative script per channel per day, philosophy sections ("Why 6 Touchpoints"), silence gap explanations between phases.
- **Calendar tool** (tools/calendar.html) = full library. All 36 scripts with channel filter tabs per touchpoint day.

### Channel Labels
Module 2 uses CSS classes instead of emoji entities:
- `.channel-label-call` (navy background)
- `.channel-label-vm` (gray background)
- `.channel-label-text` (green background)
- `.channel-label-email` (orange background)

Calendar tool uses existing classes:
- `.script-label-call`, `.script-label-vm`, `.script-label-text`, `.script-label-email`

### Calendar JS
- `filterChannel(day, channel)` in app.js - toggles script visibility by data-type attribute
- `showDayDetail(day)` in app.js - shows/hides day detail panels
- Scripts use `data-type="call|vm|text|email"` on `.script-item` divs

## Daily Discipline Log

Generated dynamically by `calculateIncome()` in app.js.
Appears in `#discipline-log` div in calculator.html after clicking Calculate.

Breaks daily calls into 4 categories with checkboxes:

| Category | % | Description |
|----------|---|-------------|
| Fresh Leads | 35% | New internet leads, phone-ups, walk-in follow-ups |
| Pipeline Follow-Up | 30% | Customers in 30-day follow-up sequence |
| Service Lane | 20% | Customers in for service - upgrade opportunity |
| Past Customers | 15% | Equity calls, anniversary calls, referral asks |

Plus text/email targets per category:
- Texts match call count per category
- Emails = ~25% of calls per category

Uses `buildCheckboxes(label, count)` helper in app.js.
Printable with checkbox styling in print.css (`input[type="checkbox"]` rules).

## Script Cards

15 printable reference cards in tools/scripts-cards.html:

| Range | Category | Color | Content |
|-------|----------|-------|---------|
| Cards 1-6 | Follow-Up | Orange accent | One per touchpoint day (1, 2, 5, 12, 25, 30) |
| Cards 7-10 | Strategic | Blue #3498DB | Inventory, equity, service lane, anniversary |
| Cards 11-14 | Objection | Red danger | Just looking, think about it, payment, shopping |
| Card 15 | Voicemail | Navy | 4-step formula template (spans 2 columns) |
