# ARCHITECTURE_RULES

Project: `ihome-real-estate`
Goal: production-ready, type-safe, performant Next.js app for a boutique, lifestyle-driven real estate experience.

This is **not a marketplace**. This is a **guided lifestyle journey**.

---

## 0) Non-negotiables

- **Server Components by default**
- **No accidental complexity**
- **Type-safe everything** (no `any`)
- **Mobile-first always**
- **i18n-safe routing only**
- `npm run build` must pass (CI-level rule)

---

## 1) Routing & i18n (STRICT)

### ✅ Allowed (internal navigation)

- **All internal navigation MUST go through `@/i18n/routing`**
  - Example: `Link` from `@/i18n/routing`
  - Example: helpers like `withLocale(...)`, `resolveNavHref(...)` if they’re built on the routing layer

### ❌ Forbidden

- `import Link from "next/link"` in feature code
- Manual locale concatenation like `href=\`/${locale}/...``
- Hardcoded locale paths `/en/...`, `/es/...`, `/ru/...`

### Rule

> `next/link` is allowed only as a **render-primitive inside routing wrappers** (internal routing components).
> Feature/UI code never imports `next/link` directly.

---

## 2) Links policy (Internal vs External)

### Internal links

- Use `@/i18n/routing` only.

### External links

- Use a single wrapper component: `ExternalLink`
- Requirements:
  - `target="_blank"` + `rel="noopener noreferrer"`
  - `aria-label` if link text is not descriptive

### Rule

> `<a>` tags are considered **external-only**, and must be created via the `ExternalLink` component.

---

## 3) Mobile-first (STRICT)

### Principle

> Write base styles for **mobile** first, then add `sm: md: lg: xl:` enhancements.

### ✅ Preferred patterns

- `hidden md:block`
- `flex flex-col md:flex-row`
- `text-base md:text-lg`

### ❌ Avoid

- Desktop-first class stacks that assume desktop is the “default”
- Layouts that only become usable at `md`+

### Rule

> If a section looks correct only on desktop — it’s wrong.

---

## 4) Rendering model & component boundaries

### Default

- **Server Components** for pages and content sections.
- Client Components only for:
  - forms
  - filters
  - modals
  - sliders
  - interactive maps
  - intersection observers / on-scroll reveals

### Rule

> Client Components must be **leaf nodes**. No “client at the top of the tree”.

---

## 5) Styling rules

- Tailwind only
- `cn()` for conditional classes
- No CSS Modules
- No inline styles (`style={{ ... }}`)
- No styled-components

---

## 6) Animation rules

### ✅ Allowed

- CSS transitions
- Tailwind animations
- `tailwindcss-animate`
- AOS (only if used consistently across the project)

### ❌ Forbidden

- Framer Motion (absolute ban)

### Performance rule

- Do **not** animate the **Hero** on initial load unless it’s purely CSS and effectively zero-cost.
- Prefer animations starting from the **next section** downward.

---

## 7) Text & translations (STRICT)

### ✅ Always

- `t("key")` for every user-facing string
- Server: `getTranslations({ locale, namespace })`
- Client: `useTranslations("namespace")`

### ❌ Never

- Rename or delete existing translation keys
- Change translation JSON structure (translate **values only**)
- Hardcode strings in JSX

---

## 8) SEO & metadata

- Use semantic HTML: `header`, `main`, `section`, `article`
- **Exactly one `<h1>` per page**
- `generateMetadata` on every meaningful route
- `next/image` must always include: `width`, `height`, `sizes`
- JSON-LD where applicable (articles, properties)

---

## 9) Imports & file structure

### ✅ Prefer

- Absolute imports via `@/`
- Colocate components near usage

### ❌ Avoid

- Deep relative imports (`../../..`)
- Cross-module coupling without a shared `lib` boundary

---

## 10) Git workflow (STRICT)

- `main` → production only
- `dev` → integration
- Feature branches:
  - `feature/...`
  - `fix/...`
  - `ui/...`

Commits: **Conventional Commits only**
`feat:`, `fix:`, `refactor:`, `ui:`, `chore:`

### Rule

> Always merge into `dev` first.
> `main` is updated **only via PR** and **only after `npm run build` is green**.

---

## 11) Admin experience / Sanity Studio (baseline)

- Studio lives at `/studio`
- Must never break app build
- Authoring UX must protect editors:
  - validations
  - hints
  - character limits
  - SEO fields
  - structured desk navigation

### Security

- Minimum: `robots noindex` (already applied)
- Next step: protect `/studio` via password or middleware

---

## 12) Enforcement (ESLint)

Architecture is enforced through linting:

- forbid `next/link` usage in feature/app code
- restrict deep relative imports
- surface mobile-first violations
- a11y checks that push external links into `ExternalLink`

### Rule

> If ESLint blocks you — **fix the architecture**.
> Never disable rules to “get it working”.

---

## 13) Final principle

> **Clarity over cleverness.**
> **Structure before speed.**
> **If it feels hacky — it’s wrong.**
