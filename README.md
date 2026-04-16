# ROS Car 🏎️

A high-performance 3D vehicle simulation and interactive sandbox built with **Three.js**, **Rapier3D**, and **TypeScript**.

## 🌟 Features

- **Physics-Based Vehicle Dynamics**: Realistic car behavior using `@dimforge/rapier3d` with revolute joints for steering and motor-driven wheels.
- **Interactive Environment**: 
  - Clickable scene objects (e.g., toggleable barriers).
  - Hover effects and spatial interactions via a custom `RaycasterServer`.
  - React-integrated UI notifications using `Sonner`.
- **Advanced Rendering**:
  - HDR environment lighting.
  - Custom GLSL shaders for visual effects (e.g., `CautionTape`, `Floor`).
  - DRACO-compressed 3D models for optimized loading.
- **Robust Architecture**: Singleton-based `Experience` core with decoupled modules for World, Physics, UI, and Utilities.
- **Live Debugging**: Integrated `Tweakpane` for real-time adjustment of car physics, world parameters, and performance monitoring.

## 🛠️ Tech Stack

| Category | Tools |
| :--- | :--- |
| **Engine** | [Three.js](https://threejs.org/) |
| **Physics** | [Rapier3D](https://rapier.rs/) |
| **Animation** | [GSAP](https://greensock.com/gsap/) |
| **UI / UX** | [React 19](https://react.dev/), [Sonner](https://sonner.stevenly.me/) |
| **Debug** | [Tweakpane](https://cocopon.github.io/tweakpane/) |
| **Build Tool** | [Vite](https://vitejs.dev/) |
| **Language** | [TypeScript 6](https://www.typescriptlang.org/) |

## 📂 Project Structure

```text
src/
├── experience/
│   ├── world/             # Scene objects & logic
│   │   ├── Car/           # Vehicle physics & controls
│   │   ├── Sandbox/       # Interactive map elements
│   │   ├── Floor/         # Custom shader floor
│   │   └── Environment/   # Lighting & HDRI
│   ├── ui/                # React-based UI & Debug tools
│   ├── utils/             # Resources, Time, Sizes, Raycaster
│   ├── PhysicWorld.ts     # Rapier3D integration
│   └── Experience.ts      # Main Singleton Entry
├── index.ts               # App bootstrap
└── index.css              # Global styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- npm or yarn

### Installation

```bash
npm install
```

### Development

Start the Vite development server with HMR:

```bash
npm run dev
```

### Production

Build the project (Type-check + Vite build):

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## 🎮 Controls

- **W / S**: Accelerate / Brake (Reverse)
- **A / D**: Steer Left / Right
- **Mouse Click**: Interact with objects (Barriers, Parking zones)

## 📝 Roadmap

- [x] Rapier3D physics integration
- [x] Basic vehicle controller
- [x] Resource management (GLTF/HDR)
- [x] Interactive sandbox elements
- [ ] Multiple camera modes (Follow, Orbit, First-person)
- [ ] Mobile-friendly touch controls
- [ ] Advanced vehicle sound effects (Web Audio API)
- [ ] Multiplayer support (WebSockets)

---

Built with ❤️ using the Three.js ecosystem.
