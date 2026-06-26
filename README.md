# ROS Car

An interactive 3D vehicle simulation built with **Three.js**, **Rapier3D**, **Yuka**, and **TypeScript**.

The project focuses on real-time 3D interaction, physics-driven motion, custom shaders, and navigation mesh based path following. It uses a ROS-inspired sandbox theme as the application context, but the core value is the WebGL experience itself.

## Highlights

- **Physics-based vehicle simulation** with Rapier3D
- **Navigation mesh pathfinding** using Yuka
- **Interactive scene objects** with pointer picking and UI actions
- **Custom GLSL shaders** for the floor and visual effects
- **React-based HUD and dialogs** layered on top of the 3D canvas
- **Live debugging tools** for inspecting runtime state and tuning parameters
- **HDR environment lighting** and compressed GLTF asset loading

## Tech Stack

| Category | Tools |
| :--- | :--- |
| **3D / Rendering** | Three.js |
| **Physics** | Rapier3D |
| **Pathfinding** | Yuka |
| **UI** | React 19, Sonner, shadcn/ui, Radix UI |
| **Animation** | GSAP |
| **Debugging** | Tweakpane |
| **Build Tool** | Vite |
| **Language** | TypeScript |

## Features

- Drivable vehicle with keyboard control
- Auto-navigation mode that follows a navigation path
- Clickable map elements such as barriers, parking zones, and traffic lights
- HUD overlay for system information and control hints
- Runtime debug pane for tweaking scene and simulation state
- GLSL-based floor shader
- HDRI environment lighting
- GLTF model loading with DRACO compression

## Project Structure

```text
src/
├── experience/
│   ├── world/             # Scene objects and simulation logic
│   │   ├── Car/           # Vehicle physics and controls
│   │   ├── Sandbox/       # Interactive map elements
│   │   ├── Floor/         # Custom shader floor
│   │   ├── Environment/   # Lighting and HDRI setup
│   │   └── NavigationMesh/ # Pathfinding and route visualization
│   ├── ui/                # React UI, dialogs, and debug tools
│   ├── utils/             # Loading, timing, input, and picking helpers
│   ├── PhysicWorld.ts     # Rapier3D integration
│   └── Experience.ts      # Main runtime entry
├── index.ts               # App bootstrap
└── index.css              # Global styles
```

## Getting Started

### Prerequisites

- Node.js 18+ recommended
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

## What This Project Demonstrates

- Real-time 3D scene architecture in the browser
- Physics integration for a dynamic vehicle
- Pathfinding and route visualization on a navigation mesh
- Shader authoring and environment lighting
- UI composition on top of a WebGL canvas
- Runtime tooling for simulation inspection

## Notes

- The ROS theme is used as the simulation context.
- The project is best positioned as a **WebGL / 3D frontend showcase**, not as a robotics or hardware project.

## Roadmap

- Mobile touch controls
- More camera modes
- Improved performance profiling
- Optional sound effects
