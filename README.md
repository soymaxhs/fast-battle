# ⚡ Fast‑Battle – _Speed Battle Dice Game_

A **Next.js 15 / React 19** mini‑game that pits players against each other in lightning‑fast dice duels. Roll smart, roll quickly, and climb the 🏆 leaderboard.

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?logo=next.js" />
  <img src="https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript" />
  <img src="https://img.shields.io/badge/React--Bootstrap-2.10-7952b3?logo=bootstrap" />
  <img src="https://img.shields.io/badge/Three.js-0.175-000000?logo=three.js" />
  <img src="https://img.shields.io/badge/Jest-29-C21325?logo=jest" />
</p>

![image](https://github.com/user-attachments/assets/10745409-ef73-4a1d-bfdc-0db84a2488e7)

---

## 🌐 Live Demo

Try it now → **[fast‑battle.vercel.app](https://fast-battle.vercel.app/)**

---

## ✨ Tech Stack

| Layer         | Library                                                     | Why                                           |
| ------------- | ----------------------------------------------------------- | --------------------------------------------- |
| **Framework** | **Next.js 15** (App Router)                                 | SSR, file‑system routing, fast refresh        |
| **UI Core**   | **React 19** + **React‑Bootstrap 2**                        | Declarative components, Bootstrap 5.3 styling |
| **3D Dice**   | **@react-three/fiber**, **@react-three/drei**, **three.js** | WebGL renderer for animated dice rolls        |
| **Typing**    | **TypeScript 5**                                            | End‑to‑end type safety                        |
| **Quality**   | **ESLint 9**, **Commitizen/commitlint**, **Jest 29**        | Linting, conventional commits, unit tests     |

---

## 🚀 Getting Started

```bash
# install dependencies
pnpm i   # or npm i / yarn

# run dev server
pnpm dev  # -> http://localhost:3000
```

The main entry point is **`app/page.tsx`**; edits trigger instant refresh.

### Useful npm Scripts

| Command                | Purpose                    |
| ---------------------- | -------------------------- |
| `pnpm dev`             | Run in development mode    |
| `pnpm build` / `start` | Production build & server  |
| `pnpm lint`            | ESLint report              |
| `pnpm test`            | Jest unit tests (_jsdom_)  |
| `pnpm commit`          | Conventional‑commit wizard |

---

## 🗺️ Roadmap

| Priority                        | Task                                                                                                                                                                                                     |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **♻️ Refactor**                 | • Extract **client components** (`Rules`, `PlayerCard`, `GameHistory`, etc.) into their own files.<br>• Move repeated dice‑update logic into **utility helpers** to remove “smelly handler” duplication. |
| **🛠️ Experimental Multiplayer** | Finalise support for **3 + players** (dynamic player creation, adaptive layout, turn rotation).                                                                                                          |
| **📈 Performance**              | • Memoise heavy React‑Three scenes.<br>• Consider `react-window`/`framer-motion` for list & animation perf.<br>• Enable Next.js image and font optimisation.                                             |
| **✅ Testing & Coverage**       | • Add unit tests for utility pure functions.<br>• Integrate **ts‑jest** coverage threshold (≥ 90 %).<br>• Add React Testing Library tests for components & interactions.                                 |
| **🎨 UI/UX**                    | • Replace placeholder dice with high‑poly models.<br>• Add dark‑mode toggle.<br>• Mobile‑first tweaks.                                                                                                   |
| **🔌 CI/CD**                    | GitHub Actions: lint + test on PR, deploy preview to Vercel.                                                                                                                                             |

> _Feel free to open an issue or PR if you’d like to tackle any item!_

---

## 🧩 Project Structure

```
app/
  ├─ components/
  │   ├─ molecules/Rules.tsx
  │   ├─ organisms/DicesScene.tsx
  │   └─ …
  ├─ page.tsx           ← main game logic (to be split)
config/
  ├─ constants.ts
types/
  └─ index.ts
utilities/
  └─ diceHelpers.ts
public/
  └─ favicon.svg
```
