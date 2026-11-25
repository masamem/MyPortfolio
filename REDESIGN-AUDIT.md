# muvfx.com redesign audit

Done with the `redesign-existing-projects` skill, using the `landing-page-design` skill for every concrete value. Stack kept as it was: React 19, Vite, Tailwind v4 import, vanilla CSS, Google Drive API.

## What was wrong (diagnosis)

**Typography**
- Three typefaces (Satoshi, Inter, Cairo) plus Georgia italic for accents. Inter is on the banned list, italics are banned.
- Weight 900 headlines everywhere (cap is bold).
- Off scale sizes everywhere: `21vw` headline, `clamp()` sizes, 9 to 11px labels, 145px section titles.
- All caps labels, buttons and headings across the page.
- Hyphens and em dashes inside copy ("short-form", "Feb 2024 — Now", "crafted in Riyadh, built to move").

**Color and surfaces**
- Light page `#e9ecf2` and dark `#12141b` / `#0e1015` / `#151312`, none from the approved dark palette.
- Five accent colors at once: lime `#c9ff38` (100% saturation), blue `#1e45fc`, red `#e24b35`, green `#27856f`, plus six panel tones (`#8370ff`, `#ff6946`, ...).
- Background gradients: glass nav, footer glow blobs, patience bar, project fallbacks, modal radial gradient.
- Random full lime contact section inside a dark page.
- Sun and moon style theme toggle (◐).

**Layout**
- Everything centred hero; `100vh` / `100svh` sections; no max width on most sections; spacing invented per element.
- Contact used `margin-right:auto` style physical properties that break in Arabic.

**Interactivity and states**
- Default `ease` transitions, `.3s` / `.18s` timings.
- Nav welded into the page flow on mobile; menu was a small dropdown.
- No current section indicator, no skip link, weak focus rings.
- Loading state was a line of text, no error retry, no empty state.
- Quick contact form posted to `mailto:` with the email as the subject and no validation.

**Content and ship**
- No services, process, FAQ, or tagline section; proof (brands) buried near the bottom.
- No privacy or terms, no 404 page, no `og:image` or social tags.
- Icons from Lucide (banned set).

## What changed

| Area | Change |
|---|---|
| Fonts | Geist only (400 to 700). Cairo stays only as the Arabic glyph fallback. No italics, no weight above 700. |
| Type scale | Every text element uses a named style (`heading-1` ... `caption-5`) mapped to the Tailwind scale. |
| Color | Dark only, surfaces `#000000 / #181818 / #1F1F1F / #272727 / #313131`. One accent: the MUVFX lime brought to `#BDE94E` (78% saturation). Hero heading uses the `#FFFFFF → #9B9B9B` text gradient. Film grain overlay instead of gradients. |
| Spacing and radius | Only 2 to 96px scale values; Tailwind radii; nested radius rule on media inside cards. |
| Nav | Floating, content sized, blurred pill. Current section highlighted. Language switch as a text button. Animated two line menu icon and a full height mobile sheet with staggered links. |
| Hero | Left aligned copy (680px cap), one primary CTA "Start a project", text link to work, proof line, the stretch face kept as the hero visual. |
| Work | Asymmetric 7/5 zigzag grid instead of the multicolour accordion. Videos only play while on screen. Skeleton loading, error state with retry and Behance link, empty state. |
| New sections | Brands proof row under the hero, tagline reveal (word by word on scroll), services list, three step process, FAQ (side by side, 7 questions), contact with validated form and copy email button. |
| Project viewer | Restyled as a full screen sheet, Escape to close, focus returns to the card, Phosphor icons. |
| Motion | One curve `cubic-bezier(0.22,1,0.36,1)`, 500ms movement, 300ms colour, scroll reveals via `IntersectionObserver`, full `prefers-reduced-motion` support. |
| Ship | Skip link, `/legal` (privacy and terms that match what the site does), branded 404, SPA rewrite in `vercel.json`, `og.png`, Open Graph and Twitter tags, real meta description. |

## Needs your input

1. **Risk reversal**: `src/lib/copy.ts` → `RISK_REVERSAL` is a visible `{{placeholder}}`. Put a real offer (for example a free intro call) or set it to `''`.
2. **Drive descriptions**: two project descriptions in Google Drive still contain hyphens ("AI-assisted", "coming-soon"). Edit the folder descriptions in Drive.
3. **Testimonials**: none exist, so none were invented. Send 2 or 3 real quotes and they go next to the work.
4. **Light theme**: the skill only defines dark surfaces, so the site is dark only now.
5. **Leftover files**: `FramerEffects.tsx`, `framer-effects.css` and older home variants (`EditorialHome`, `MobileHome`, `HeroSection`, ...) are no longer used. Safe to delete.
6. **Install**: run `npm install` once; `@phosphor-icons/react` was added.
