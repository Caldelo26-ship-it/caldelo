# Caldelo — Claude Code Project Context

## Founder Rule

**Claude Code must never make changes to this codebase without explicit approval from the founder.**

Before making any edit — however small — state what you intend to change and why, then wait for a confirmed go-ahead. This applies to code, copy, styles, configuration, and file structure. Do not act on assumptions.

---

## What Caldelo Is

Caldelo is a UK household bill comparison platform. Users answer a short set of questions and Caldelo finds them better deals across their bills. The business model is referral commission from providers — completely free to the user.

**Core focus (the only categories that matter strategically):**
- Energy (gas & electricity tariffs)
- EV Charging (home charger tariffs and public network costs)
- Solar (solar panel deals and battery storage)

Do not build features, write copy, or add categories outside these three areas without explicit founder approval. Broadband and Mobile & TV exist in the current codebase as placeholders but are not the strategic priority.

---

## 12-Month Goal

Reach **£5,000 MRR** and be recognised as a trusted UK energy comparison brand within 12 months.

Every decision — design, copy, features, SEO — should be evaluated against whether it moves Caldelo closer to this goal. Prioritise trust, clarity, and conversion over cleverness.

---

## Brand

### Colours

| Name  | Hex       | Usage                                      |
|-------|-----------|--------------------------------------------|
| Navy  | `#0F2D5E` | Primary brand colour, headings, nav, trust |
| Teal  | `#00B8A9` | Primary CTA buttons, highlights, accents   |
| Green | `#00C853` | Savings figures, positive indicators       |
| Pink  | `#FF6B8A` | Secondary accents, EV category             |

These are defined as CSS custom properties (`--navy`, `--teal`, `--green`, `--pink`). Always use the variables — never hardcode hex values in styles.

### Voice & Tone

- Plain English. No jargon.
- Direct and reassuring — "on your side, not the providers."
- UK spelling throughout (e.g. licence, colour, centre, recognised).
- Never overpromise. Savings figures should always feel credible.

---

## Primary CTA Rule

**Every primary call-to-action must link to `/calculator`.**

This is non-negotiable. The calculator is the conversion point. Do not change primary CTA destinations to anchors, external URLs, or other internal pages without founder sign-off.

---

## Tech Stack

| Layer      | Technology             |
|------------|------------------------|
| Framework  | Next.js 14 (App Router)|
| Language   | TypeScript             |
| Styling    | CSS Modules            |
| Hosting    | Vercel                 |
| Version control | GitHub            |

### Conventions

- Pages live in `app/` using the App Router (`page.tsx`, `layout.tsx`).
- Styles are co-located as `page.module.css` or `[component].module.css`.
- No external CSS frameworks (no Tailwind, no Bootstrap).
- Keep dependencies minimal — add a package only when the founder approves it.

---

## Repository Structure

```
caldelo/
├── app/              # App Router pages and layouts
├── public/           # Static assets
├── privacy/          # Privacy policy content
├── page.tsx          # Root homepage (currently in root, may move to app/)
├── next.config.js    # Next.js configuration
├── tsconfig.json     # TypeScript configuration
└── package.json
```

---

## What to Always Do

- Ask before touching anything.
- Use CSS variables for all brand colours.
- Link primary CTAs to `/calculator`.
- Write UK English.
- Keep the UI clean, fast, and trustworthy-looking.

## What to Never Do

- Make changes without approval.
- Add categories outside energy, EV charging, and solar without approval.
- Hardcode hex colour values in stylesheets.
- Add npm packages without approval.
- Change the primary CTA destination away from `/calculator`.
- Use American English spelling.
