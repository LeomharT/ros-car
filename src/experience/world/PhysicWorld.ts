import { World } from '@dimforge/rapier3d';
import { BufferAttribute, BufferGeometry, LineBasicMaterial, LineSegments } from 'three';
import type { Experience } from '../Experience';

export class PhysicWorld {
  constructor(exp: Experience) {
    this._exp = exp;
    this.enableDebug = true;

    this.instance = this._createWorld();
    this.mesh = this._createDebug();
  }

  private static FIXED_STEP = 1 / 120;

  private _exp: Experience;

  public enableDebug: boolean;

  public instance: World;

  public mesh: LineSegments;

  private _accumulator: number = 0;

  private _prevTime: number = performance.now();

  private _createWorld() {
    const gravity = { x: 0.0, y: -9.81, z: 0.0 };
    const world = new World(gravity);
    world.timestep = PhysicWorld.FIXED_STEP;
    return world;
  }

  private _createDebug() {
    const geometry = new BufferGeometry();
    const material = new LineBasicMaterial({ color: 0xffffff, vertexColors: true, fog: false });
    const mesh = new LineSegments(geometry, material);
    mesh.visible = this._exp.debug.debugging;
    mesh.frustumCulled = false;

    this._exp.scene.add(mesh);

    const pane = this._exp.debug.pane.addFolder({ title: '⚛️ Physic' });
    pane.addBinding(mesh, 'visible', {
      label: 'Debug Visible',
    });

    return mesh;
  }

  public update() {
    const now = performance.now();
    const dt = (now - this._prevTime) / 1000;
    this._prevTime = now;

    this._accumulator += Math.min(dt, 0.1);

    while (this._accumulator >= PhysicWorld.FIXED_STEP) {
      this.instance.step();
      this._accumulator -= PhysicWorld.FIXED_STEP;
    }

    const { vertices, colors } = this.instance.debugRender();

    this.mesh.geometry.setAttribute('position', new BufferAttribute(vertices, 3));
    this.mesh.geometry.setAttribute('color', new BufferAttribute(colors, 4));
  }
}
