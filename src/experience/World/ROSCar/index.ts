import { EquirectangularReflectionMapping, Mesh, MeshStandardMaterial } from 'three';
import type { Experience } from '../../Experience';

export class ROSCar {
  constructor(exp: Experience) {
    this._exp = exp;
    this._setupModel();
  }

  private _exp: Experience;

  private _setupModel() {
    const env = this._exp.resources.items.environment;
    env.mapping = EquirectangularReflectionMapping;

    const model = this._exp.resources.items.carModel;
    const car = model.scene;

    car.traverse((obj) => {
      if (obj instanceof Mesh && obj.material instanceof MeshStandardMaterial) {
        obj.material.envMap = env;
        obj.material.fog = false;
      }
    });
    this._exp.scene.add(car);
  }
}
