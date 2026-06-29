# ROS Car

ROS Car is a **WebGL 3D virtual simulation** and **digital twin** portfolio project built with **Three.js**, **Rapier3D**, **Yuka**, **React**, and **TypeScript**.

Live Demo: https://ros-car-blush.vercel.app/

The name comes from the `ROS car` project I worked on in my company, but this repository is positioned as a **WebGL showcase piece** in my personal portfolio. It uses a robotics-inspired sandbox as the scene theme while focusing on browser-based 3D interaction, physics, pathfinding, and UI composition.

## What This Project Does

- Renders an interactive 3D scene in the browser
- Simulates a drivable vehicle with real-time physics
- Supports automatic navigation through a navigation mesh
- Provides clickable scene elements and floating UI overlays
- Uses custom GLSL shaders for the floor grid
- Includes debug tools for tuning scene, physics, and navigation state
- Loads GLTF models, HDR lighting, and YUKA navmesh assets

## Core Features

- **Vehicle physics** with Rapier3D
- **Manual driving** with `W / A / S / D`
- **Auto navigation** along a YUKA-generated path
- **Interactive sandbox objects** including barrier gates, traffic lights, and a parking zone
- **Shader-driven floor grid** with tweakable parameters
- **HDR environment lighting** and fog
- **CSS3D marker overlay** for map targeting and occlusion-aware display
- **Debug pane** exposed through `#debug`

## Tech Stack

| Category       | Tools                                 |
| :------------- | :------------------------------------ |
| 3D / Rendering | Three.js                              |
| Physics        | Rapier3D                              |
| Pathfinding    | Yuka                                  |
| UI             | React 19, Sonner, Radix UI, shadcn/ui |
| Animation      | GSAP                                  |
| Debugging      | Tweakpane                             |
| Build Tool     | Vite                                  |
| Language       | TypeScript                            |

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Controls

- `W` / `S`: Accelerate / reverse
- `A` / `D`: Steer left / right
- Mouse click: Interact with scene objects
- Add `#debug` to the URL to show the debug pane

## Notes

- The project is intentionally framed as a **WebGL / 3D portfolio work**, not as a robotics product.
- The ROS-themed scene is the inspiration, while the implementation focus is browser-native 3D simulation and digital twin presentation.
- The application uses a layered UI approach: WebGL canvas for the scene, CSS3D for markers, and React for dialogs and system panels.
