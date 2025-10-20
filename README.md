Perfect ⚡️ — here’s your ready-to-commit `README.md` that documents your branching strategy and initial project setup so any future collaborator (or client) knows exactly how this repo works.

You can copy this whole block and save it as:

```bash
touch README.md
code README.md
```

Then paste ↓ and commit:

```bash
git add README.md
git commit -m "docs: add project setup and branching workflow guide"
git push origin feature/init-scaffold
```

---

## 📘 README.md — iHome Realty Web Platform

### 🏡 Overview

Premium real estate web platform for Costa del Sol properties, built with a lifestyle-first approach.
Tech stack: Next.js 15 (App Router) + TypeScript + Tailwind 3.4 + Firebase + Sanity + Vercel.

---

### 🧭 Branching Strategy

| Branch     | Purpose                                     | Deploy Target            |
| ---------- | ------------------------------------------- | ------------------------ |
| main       | Production-ready code only                  | `www.ihomemarbella.com`  |
| dev        | Integration branch for ongoing development  | Vercel Preview           |
| feature/\* | New pages, UI components, or modules        | temporary preview        |
| ui/\*      | Reusable UI elements (buttons, cards, etc.) | temporary preview        |
| fix/\*     | Bug or style fixes                          | temporary preview        |
| config/\*  | Environment, build, or CI tweaks            | temporary preview        |
| docs/\*    | Documentation updates                       | —                        |
| hotfix/\*  | Urgent production fixes                     | deploys directly to main |

---

### ⚙️ Creating Branches

```bash
# start from dev
git checkout dev
git pull

# new feature
git checkout -b feature/homepage-hero
# after work
git push -u origin feature/homepage-hero
```

For a release:

```bash
git checkout main
git pull
git merge --no-ff dev -m "release: v1.0 foundation"
git push origin main
```

---

### 🧱 Repository Setup (initial)

Follow these once per environment.

```bash
# ensure you’re on feature/init-scaffold
git checkout -b feature/init-scaffold
```

#### 0. Open repo

```bash
cd ~/Developer/ihome-real-estate
code .
git status
```

#### 1. Scaffold Next.js 15 project

```bash
npx create-next-app@latest . --ts --eslint --tailwind --app --use-npm --import-alias "@/*"
git add .
git commit -m "chore: bootstrap Next.js 15 + TS + Tailwind + ESLint"
```

#### 2. Install core dependencies

```bash
npm i lucide-react swiper aos react-hook-form zod next-sanity @sanity/client firebase resend
npm i @vercel/analytics
npm i -D @types/node @types/react
git add package*.json
git commit -m "chore: add core deps (AOS, RHF+Zod, Sanity, Firebase, Resend)"
```

#### 3. Configure Tailwind + fonts + minimal homepage

_(see `tailwind.config.ts` & `app/layout.tsx` in repo — includes iHome brand palette & typography)_
After testing locally:

```bash
npm run dev
# open http://localhost:3000
```

Commit:

```bash
git add .
git commit -m "feat: brand Tailwind config + fonts + minimal homepage shell"
```

#### 4. Structure folders

```bash
mkdir -p components/{layout,home,ui} lib/{sanity,firebase,utils} public/locales/{en,es,ru} app/[locale]
touch components/layout/.keep components/home/.keep components/ui/.keep \
      lib/sanity/.keep lib/firebase/.keep lib/utils/.keep \
      public/locales/en/.keep public/locales/es/.keep public/locales/ru/.keep \
      app/[locale]/.keep
git add .
git commit -m "chore: scaffold folders for components/lib/locales and i18n route"
```

#### 5. Push and open PR → dev

```bash
git push origin feature/init-scaffold
```

Create Pull Request:
base: `dev` ← compare: `feature/init-scaffold`
Merge once Vercel preview builds successfully.

---

### ✅ Next Steps

1. Add `/[locale]` route with EN / ES / RU.
2. Create `Header` + `Footer` (Tailwind + Lucide).
3. Add AOS animations.
4. Implement lifestyle blocks + guides section.
5. Integrate Firebase + Sanity + Resend.
6. Prepare `.env.example` for all environment keys.

---

### 🧠 Notes

- Protect `main` (require PR + Vercel check).
- Optional: protect `dev` (no force-push).
- Every push to `main` auto-deploys to Production via Vercel.
- Every push to `dev` or `feature/*` auto-deploys a Preview.

---

Would you like me to add the small `.env.example` next (so your repo is ready for Sanity / Firebase / Resend before the next commit)?
