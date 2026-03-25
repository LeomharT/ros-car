# ros-car

3D experience project built with Vite + TypeScript + Three.js (early draft in progress).

## Status

This is an initial version. Features and structure are still evolving, and the docs will be expanded.

## Tech Stack

- Vite
- TypeScript
- Three.js
- Tweakpane

## Project Structure

```
.
├─ public/                 Static assets
├─ src/
│  ├─ index.ts             Entry file, mounts Experience
│  ├─ index.css            Global styles
│  └─ experience/          Core 3D experience
│     ├─ Camera.ts
│     ├─ Renderer.ts
│     ├─ Experience.ts
│     ├─ Ui/               Debug and UI
│     ├─ Utils/            Utilities and shared logic
│     └─ World/            Scene and objects
├─ index.html              HTML template
├─ tsconfig.json
└─ package.json
```

## Dev & Build

Install dependencies:

```bash
npm install
```

Development (Vite dev server):

```bash
npm run dev
```

Production build:

```bash
npm run build
```

The build script runs `tsc` for type checking, then `vite build` to emit `dist/`.

Preview the build locally:

```bash
npm run preview
```

## TODO

- Asset loading and management
- Responsibilities of scene/camera/renderer
- Interaction and controls
- Deployment notes
