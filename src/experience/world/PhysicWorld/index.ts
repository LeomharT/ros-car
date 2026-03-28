import { World } from '@dimforge/rapier3d';
import { BufferAttribute, BufferGeometry, LineBasicMaterial, LineSegments } from 'three';
import type { Experience } from '../../Experience';

export class PhysicWorld {
  constructor(exp: Experience) {
    this._exp = exp;
    this._enableDebug = false;

    this.instance = this._createWorld();
    this.mesh = this._createDebug();
  }

  private _exp: Experience;

  private _enableDebug: boolean;

  public instance: World;

  public mesh: LineSegments;

  private _createWorld() {
    const gravity = { x: 0.0, y: -9.81, z: 0.0 };
    const world = new World(gravity);
    return world;
  }

  private _createDebug() {
    const geometry = new BufferGeometry();
    const material = new LineBasicMaterial({ color: 0xffffff, vertexColors: true, fog: false });
    const mesh = new LineSegments(geometry, material);
    mesh.frustumCulled = false;
    this._exp.scene.add(mesh);

    return mesh;
  }

  public update() {
    const { vertices, colors } = this.instance.debugRender();

    this.mesh.geometry.setAttribute('position', new BufferAttribute(vertices, 3));
    this.mesh.geometry.setAttribute('color', new BufferAttribute(colors, 4));

    this.instance.step();
  }
}
