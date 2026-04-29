# Caldelo Homepage — Design Spec
**Date:** 2026-04-29  
**Phase:** 1 — Brand system + marketing homepage  
**Type:** Hybrid waitlist page (email capture now, converts to signup flow at launch)

---

## Purpose

A credible, product-forward waitlist page that:
- Communicates what Caldelo is and why it matters in under 10 seconds
- Captures email addresses for the launch waitlist
- Signals that a real product is being built (phone mockup, specific feature names)
- Can be expanded into a full marketing site at launch with minimal rework

---

## Page Structure

Six sections in order:

| # | Section | Job |
|---|---|---|
| 1 | Nav | Brand identity + sticky CTA |
| 2 | Hero | Headline + subtext + phone mockup + email form |
| 3 | Problem | Emotional recognition — "sound familiar?" |
| 4 | Features | Three product previews with stylised phone UI |
| 5 | Second CTA | Repeat email capture on green background |
| 6 | Footer | Logo + Privacy + Terms |

---

## Section Detail

### 1. Nav

- Left: Caldelo wordmark — Fraunces serif, `#1A1917`
- Right: "Join waitlist" pill button — `#6B8F71` background, white text
- Sticky on scroll, background `#FAFAF8` with `1px solid #E5E3DC` bottom border
- No other nav links — nothing to distract from the CTA

### 2. Hero

**Layout:** Two-column on desktop (copy left, phone right), single-column stacked on mobile (copy above, phone below)

**Copy:**
- Badge: `NOW IN DEVELOPMENT` — small, sage green, all-caps, letter-spaced
- Headline: `Run family life like a team.` — Fraunces, 48px desktop / 32px mobile, `#1A1917`
- Subtext: `Caldelo gives busy parents shared clarity — who's doing what, what's coming up, and no more dropped balls.` — DM Sans, 16px, `#6B6B64`
- Social proof line below form: `Join [n] families already on the list · Free · No spam` — 12px, `#B0ACA6`. The number is hardcoded in the component and updated manually as the list grows. Start at a real count once the first signups come in; use "early families" as the pre-launch placeholder.

**Email form:**
- Input: full-width, `#F2F1EE` background, `1px solid #E5E3DC` border, 8px radius, 44px tall
- Button: `Get early access` — `#6B8F71`, white, 600 weight, 8px radius
- On submit: inline success state — input+button replaced by `✓ You're on the list. We'll be in touch.`
- On submit: POST to `/api/waitlist` (Next.js route) → Supabase `waitlist` table insert

**Phone mockup:**
- Dark phone shell (`#1A1917`, 18px radius)
- Interior screen: Today View UI (described below)
- Desktop: right column, ~220px wide, slight `rotate(-2deg)` tilt and drop shadow
- Mobile: centred below copy, ~180px wide, no tilt

**Phone screen — Today View:**
Shows a realistic but stylised version of the Today View:
- Date header: "Tuesday" in bold
- Subtitle: "3 things today" in muted grey
- 4 cards stacked:
  1. School drop-off / `You ✓` — neutral `#F2F1EE`
  2. Pickup 3:15pm / `Jamie` — neutral `#F2F1EE`
  3. PE kit (urgent) / `Needed tomorrow` — warm coral tint `#FFF3F0`, `#C27B6A` label
  4. Dinner / `Pasta ✓` — neutral `#F2F1EE`

### 3. Problem Section

Background: `#F2F1EE`, separated by `1px solid #E5E3DC`

**Label:** `SOUND FAMILIAR?` — small, all-caps, `#B0ACA6`

**Three quote cards** (warm white cards, `3px solid #E5E3DC` left border, italic):
1. "Wait, who's doing pickup today?"
2. "Forgotten PE kit. Again."
3. "One of us is quietly doing everything."

**Bridge line:** `Caldelo makes the invisible visible — and turns household chaos into shared ownership.` — DM Sans, 14px, `#6B6B64`

### 4. Features Section

Background: `#FAFAF8`  
Label: `HOW IT WORKS` — small, all-caps, `#B0ACA6`

Three feature blocks. On desktop: alternating left/right layout (copy + phone side by side). On mobile: stacked, copy above phone. Desktop order: Today View — copy left / phone right. Load Balance — copy right / phone left. Smart Reminders — copy left / phone right.

Each feature block:
- Feature label + one-line description
- Accent colour bar (gradient from accent to transparent)
- Stylised phone screen UI (placeholder until real screens are built)

| Feature | Accent | Copy |
|---|---|---|
| Today View | Sage `#6B8F71` | "What matters. Who has it. At a glance." |
| Load Balance | Slate `#5C7A9E` | "See who's carrying the week — without a conversation." |
| Smart Reminders | Coral `#C27B6A` | "Warm nudges at the right moment. Never naggy." |

**Phone UI placeholders:** Each feature's phone screen is a styled wireframe for now. These are replaced with real app screenshots as each feature ships. The placeholder must look intentional, not empty — use the Caldelo colour palette and realistic card layouts.

### 5. Second CTA

Full-width section, `#6B8F71` background.

- Headline: `Be first when we launch.` — Fraunces, white, 24px
- Subline: `Join the waitlist. Free. No spam. Ever.` — DM Sans, `rgba(255,255,255,0.75)`
- Same email form as hero — white/translucent input, white button with green text
- Same Supabase submit behaviour

### 6. Footer

Background: `#1A1917`

- Left: Caldelo wordmark — Fraunces, `#FAFAF8`
- Right: Privacy · Terms — DM Sans 11px, `#6B6B64`
- Privacy and Terms pages must exist (stubs are fine at launch)

---

## Email Capture — Backend

**Route:** `POST /api/waitlist` (Next.js App Router route handler)

**Supabase table:**
```sql
create table waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz default now(),
  source text default 'homepage'
);
```

**Behaviour:**
- Validate email format server-side before inserting
- On duplicate email: return 200 with success message (don't reveal the email is already registered)
- On success: return `{ success: true }`
- Client shows inline success state — never redirect

**Environment variables required:**
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=   # used server-side in the route handler only
```

---

## Design System — Applied

| Token | Value |
|---|---|
| Background | `#FAFAF8` |
| Surface | `#F2F1EE` |
| Border | `#E5E3DC` |
| Text primary | `#1A1917` |
| Text secondary | `#6B6B64` |
| Text muted | `#B0ACA6` |
| Accent green | `#6B8F71` |
| Accent blue | `#5C7A9E` |
| Accent coral | `#C27B6A` |
| Display font | Fraunces (Google Fonts) |
| Body font | DM Sans (Google Fonts) |
| Card radius | 12–16px |
| Input radius | 8px |
| Min touch target | 44px |

---

## Responsive Behaviour

Mobile-first. Breakpoints: 375px, 390px, 430px (iPhone SE → 14 Plus).

| Section | Mobile | Desktop (≥768px) |
|---|---|---|
| Hero | Single column, phone below copy | Two column, phone right with tilt |
| Features | Stacked, copy above phone | Alternating left/right |
| Nav | Logo left, CTA right | Same |

---

## What This Page Is Not

- Not a full marketing site — no pricing section, no FAQ, no testimonials yet
- Not an app entry point — no login, no dashboard links
- Not final — phone mockup screens are placeholders; the page expands at launch

---

## Acceptance Criteria

- [ ] Page loads in under 2s on mobile (no heavy dependencies)
- [ ] Email form submits and shows inline success state
- [ ] Duplicate email handled gracefully (no error shown to user)
- [ ] Works one-handed at 375px width
- [ ] Fraunces + DM Sans load from Google Fonts with no layout shift
- [ ] Phone mockup renders correctly at all three mobile breakpoints
- [ ] Nav CTA scrolls to hero email form (anchor link)
- [ ] Privacy and Terms pages exist (stub content acceptable)
- [ ] `.superpowers/` in `.gitignore`
