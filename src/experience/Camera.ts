import { PerspectiveCamera } from 'three';
import { OrbitControls, TrackballControls } from 'three/examples/jsm/Addons.js';
import type { Experience } from './Experience';

export default class Camera {
  constructor(experience: Experience) {
    this._experience = experience;

    // Setup

    this.instance = this._setupCamera();
    this._controls = this._setupControls();
  }

  private _experience: Experience;

  public instance: PerspectiveCamera;

  private _controls: ReturnType<typeof this._setupControls>;

  get control1() {
    return this._controls.controls1;
  }

  get control2() {
    return this._controls.controls2;
  }

  private _setupControls() {
    const controls1 = new OrbitControls(this.instance, this._experience.canvas);
    controls1.enableDamping = true;
    controls1.enableRotate = true;
    controls1.enablePan = true;
    controls1.enableZoom = false;

    const controls2 = new TrackballControls(this.instance, this._experience.canvas);
    controls2.noPan = true;
    controls2.noRotate = true;
    controls2.noZoom = false;
    controls2.zoomSpeed = 1.5;

    return { controls1, controls2 };
  }

  private _setupCamera() {
    const camera = new PerspectiveCamera(
      50,
      this._experience.sizes.width / this._experience.sizes.height,
      0.1,
      1000,
    );
    camera.position.set(12, 12, 12);
    this._experience.scene.add(camera);

    return camera;
  }

  public resize() {
    this.instance.aspect = this._experience.sizes.width / this._experience.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  public update(time: number) {
    this.control2.update();
    this.control1.update(time);
  }
}
