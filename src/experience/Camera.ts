import { MathUtils, PerspectiveCamera } from 'three';
import { OrbitControls, TrackballControls } from 'three/examples/jsm/Addons.js';
import type { Experience } from './Experience';

const MAX_POLAR_ANGLE = Math.PI / 2.5;
const MIN_POLAR_ANGLE = 0;
const LERP_SPEED = 15;

export default class Camera {
  constructor(exp: Experience) {
    this._exp = exp;

    // Setup
    this.instance = this._setupCamera();
    this._controls = this._setupControls();
  }

  private _exp: Experience;

  public instance: PerspectiveCamera;

  private _controls: ReturnType<typeof this._setupControls>;

  get control1() {
    return this._controls.controls1;
  }

  get control2() {
    return this._controls.controls2;
  }

  private _setupControls() {
    const controls1 = new OrbitControls(this.instance, this._exp.canvas);
    controls1.enableDamping = true;
    controls1.dampingFactor = 0.08;
    controls1.rotateSpeed = 0.65;
    controls1.enableRotate = true;
    controls1.enablePan = true;
    controls1.enableZoom = false;

    const controls2 = new TrackballControls(this.instance, this._exp.canvas);
    controls2.noPan = true;
    controls2.noRotate = true;
    controls2.noZoom = false;
    controls2.zoomSpeed = 1.5;

    return { controls1, controls2 };
  }

  private _setupCamera() {
    const camera = new PerspectiveCamera(
      50,
      this._exp.sizes.width / this._exp.sizes.height,
      0.1,
      1000,
    );
    camera.position.set(0, 12, 20);
    this._exp.scene.add(camera);

    return camera;
  }

  public resize() {
    this.instance.aspect = this._exp.sizes.width / this._exp.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  public update(time: number) {
    const t = 1.0 - Math.exp(LERP_SPEED * -time);

    const polar = this.control1.getPolarAngle();

    const maxPolarAngle = MathUtils.lerp(polar, MAX_POLAR_ANGLE, t);
    const minPolarAngle = MathUtils.lerp(polar, MIN_POLAR_ANGLE, t);

    this.control1.maxPolarAngle = maxPolarAngle;
    this.control1.minPolarAngle = minPolarAngle;

    this.control2.update();
    this.control1.update(time);
  }
}
