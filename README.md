# jiro.dev — portfolio site

Desktop OS-style portfolio. Draggable + resizable windows, per-workspace themes, floating bar.

**Stack:** Next.js 14 · React 18 · TypeScript · Tailwind CSS · react-rnd

---

## Getting started

```bash
cd portfolio-site
npm install
npm run dev
```

Open http://localhost:3000

---

## Adding your wallpapers

Drop images into `public/assets/wallpapers/`:

| File           | Workspace | Theme           |
|----------------|-----------|-----------------|
| `home.jpg`     | HOME      | dark / JRPG     |
| `projects.jpg` | PROJECTS  | sakura / pink   |
| `skills.jpg`   | SKILLS    | purple / anime  |
| `contact.jpg`  | CONTACT   | forest / green  |

If a file is missing, the solid fallback colour shows instead.

---

## Adding your screenshots

Drop into `public/assets/`:

| File                     | Window          |
|--------------------------|-----------------|
| `twitch-clip-editor.png` | clip_editor.py  |
| `video-storyboarder.png` | storyboarder.py |

Cards fall back to a placeholder if missing.

---

## Adding a new project

1. Add an entry to `src/data/projects.ts`
2. Add a `WindowConfig` entry to the `projects` workspace in `src/data/workspaces.ts`
3. Add an `IconConfig` entry to the same workspace's `icons` array
4. Add a `case` to `renderContent()` in `src/components/Desktop.tsx`

The new window tiles in automatically.

---

## Project structure

```
src/
├── app/
│   ├── globals.css          # base styles, corner ornaments, window chrome
│   ├── layout.tsx           # font, metadata, icon CDN
│   └── page.tsx             # root — provides WindowManager context
├── context/
│   └── WindowManager.tsx    # open/close/minimise/z-index state per workspace
├── components/
│   ├── FloatingBar.tsx      # floating nav bar (top, with margins)
│   ├── Desktop.tsx          # wallpaper + icons + renders all windows
│   ├── AppWindow.tsx        # react-rnd draggable/resizable window shell
│   ├── DesktopIcon.tsx      # double-click to open a window
│   ├── Dock.tsx             # floating dock for minimised windows
│   └── windows/             # content component per window
│       ├── ProfileWindow.tsx
│       ├── ProjectLogWindow.tsx
│       ├── ProjectWindow.tsx
│       ├── SkillsWindow.tsx
│       ├── ContactWindow.tsx
│       └── CvWindow.tsx
├── data/
│   ├── workspaces.ts        # ← themes, icons, default window positions
│   ├── projects.ts          # ← your project data
│   └── skills.ts            # ← your skills list
└── hooks/
    └── useScrollReveal.ts   # (reserved for pixel-dissolve animation TODO)
```

---

## Workspaces

| Label    | Theme          | Key files                     |
|----------|----------------|-------------------------------|
| HOME     | dark / JRPG    | profile.sh · project.log      |
| PROJECTS | sakura / pink  | clip_editor.py · storyboarder.py |
| SKILLS   | purple / anime | skills.json                   |
| CONTACT  | forest / green | contact.md · cv.pdf           |

To change a workspace's colours, edit `src/data/workspaces.ts`.

---

## Once your GitHub migration is done

Update the `github` URLs in `src/data/projects.ts` — they already point at `github.com/JiroDavid`.
