import { Object3D, Raycaster, Vector2 } from 'three';
import type { Experience } from '../Experience';

export class RaycasterServer {
  constructor(exp: Experience) {
    this._exp = exp;
    this._raycaster = new Raycaster();
    this._cursro = new Vector2();

    window.addEventListener('pointermove', (e) => {
      this._cursro.x = (e.clientX / window.innerWidth) * 2 - 1;
      this._cursro.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });
  }

  private _exp: Experience;

  private _raycaster: Raycaster;

  private _cursro: Vector2;

  public pick(target: Object3D[]) {
    this._raycaster.setFromCamera(this._cursro, this._exp.camera.instance);
    return this._raycaster.intersectObjects(target, true);
  }
}
