import { Group, Mesh, MeshStandardMaterial } from 'three';
import type { FolderApi } from 'tweakpane';
import type { Experience } from '../../Experience';

export class Car {
  constructor(exp: Experience) {
    this._exp = exp;
    this._pane = this._setupPane();

    this.mesh = this._initModel();
    this.car = this._initCar();
  }

  private _exp: Experience;

  private _pane: FolderApi;

  public mesh: Group;

  public car: ReturnType<typeof this._initCar>;

  private _setupPane() {
    const pane = this._exp.debug.pane.addFolder({ title: '🚗 Car' });
    return pane;
  }

  private _initModel() {
    const model = this._exp.resources.items.carModel;
    const car = model.scene;

    car.traverse((obj) => {
      if (obj instanceof Mesh && obj.material instanceof MeshStandardMaterial) {
        obj.material.fog = false;
      }
    });
    this._exp.scene.add(car);

    return car;
  }

  private _initCar() {
    const wheelFL = this.mesh.getObjectByName('前轮1') as Mesh;
    const wheelFR = this.mesh.getObjectByName('前轮2') as Mesh;
    const wheelBL = this.mesh.getObjectByName('后轮1') as Mesh;
    const wheelBR = this.mesh.getObjectByName('后轮2') as Mesh;

    const wheels = [wheelFL, wheelFR, wheelBL, wheelBR] as const;

    return { wheels };
  }

  public update() {
    for (const w of this.car.wheels) {
      w.rotation.z -= 0.111;
    }
  }
}
