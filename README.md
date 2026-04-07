# Lavya Damania — Portfolio

![Portfolio screenshot placeholder](https://via.placeholder.com/1200x630/030308/e8206a?text=Portfolio+Preview)

A production-style personal portfolio: dark UI, pink accent system, 3D hero (Three.js + React Three Fiber), smooth scrolling (Lenis), and live GitHub activity.

## Tech stack

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?logo=tailwind-css&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-WebGL-000000?logo=three.js&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF)

Also: React Router DOM, React Icons, Axios, EmailJS, `@react-three/drei`, `@studio-freight/lenis`.

## Installation

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Environment variables

Copy `.env.local` and fill in real values:

| Variable | Purpose |
|----------|---------|
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key |
| `VITE_GITHUB_TOKEN` | Optional GitHub PAT for higher API rate limits |

Without EmailJS keys, the contact form shows a clear configuration message instead of sending.

## Folder structure (high level)

- `src/components/3d/` — Three.js scenes (particles, globe, hero text, shaders)
- `src/components/sections/` — Page sections (Hero, About, Projects, …)
- `src/components/ui/` — Reusable UI (glass cards, buttons, modals, cursor, loader)
- `src/data/` — **Edit these to customize copy, projects, skills, and links**
- `src/hooks/` — GitHub fetch, scroll progress, tilt, in-view
- `src/utils/` — Motion variants and small helpers
- `public/fonts/` — `helvetiker_bold.typeface.json` for 3D text

## Customization

1. **Profile & links:** `src/data/personal.js`
2. **Projects grid & modal:** `src/data/projects.js`
3. **Skill bars & categories:** `src/data/skills.js`
4. **Timeline:** `src/data/experience.js`
5. **Testimonials carousel:** `src/data/testimonials.js`
6. **LinkedIn-style feed:** `src/data/linkedin.js`

Add a real resume at `public/resume.pdf` for the **Download Resume** button.

## Deployment (Vercel)

1. Push the repo to GitHub.
2. In [Vercel](https://vercel.com), **Import** the repository.
3. Framework preset: **Vite**.
4. Add the same `VITE_*` environment variables in **Project → Settings → Environment Variables**.
5. Deploy.

## Build

```bash
npm run build
npm run preview
```

---

Built with React, Vite, Tailwind CSS v3, Framer Motion, and Three.js.
