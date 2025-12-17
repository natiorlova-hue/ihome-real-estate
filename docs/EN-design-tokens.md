Design tokens → Tailwind mapping

🎯 Purpose

Visual consistency, calm UX, and predictable layouts.

Typography

One H1 per page

H2 / H3 from Portable Text only

Paragraphs use standard prose / text utilities

Colors

❌ No inline styles

✅ Tailwind tokens only

Semantic usage

text-primary

text-tertiary

bg-gray-50, bg-white

Layout

Content constrained to container width

❌ No full-width sections inside articles

Images

Always next/image

Explicit width / height

Lazy loading (except hero image)

Animation

❌ Framer Motion (ABSOLUTE BAN)

✅ CSS transitions / tailwindcss-animate

Style: Minimal, purposeful, never noisy

🧠 Core project principle

Engineering serves calm.

If a decision:

Increases complexity

Gives editors too much control

Reduces predictability

→ It is the wrong decision.

✅ Final recommendation

Place these files in /docs

Reference them from README.md

Treat them as living rules, not suggestions
