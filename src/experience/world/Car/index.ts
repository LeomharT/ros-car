import { ColliderDesc, RigidBodyDesc } from '@dimforge/rapier3d';
import { Mesh, MeshStandardMaterial, Quaternion } from 'three';
import type { FolderApi } from 'tweakpane';
import type { Experience } from '../../Experience';

export class Car {
  constructor(exp: Experience) {
    this._exp = exp;
    this._pane = this._setupPane();

    this.car = this._initModel();
  }

  private _exp: Experience;

  private _pane: FolderApi;

  public car: ReturnType<typeof this._initModel>;

  private _setupPane() {
    const pane = this._exp.debug.pane.addFolder({ title: '🚗 Car' });
    return pane;
  }

  private _initModel() {
    const q = new Quaternion();

    const model = this._exp.resources.items.carModel;
    const mesh = model.scene;

    mesh.traverse((obj) => {
      if (obj instanceof Mesh && obj.material instanceof MeshStandardMaterial) {
        obj.material.fog = false;
      }
    });
    this._exp.scene.add(mesh);

    const wheelFL = mesh.getObjectByName('前轮1') as Mesh;
    const wheelFR = mesh.getObjectByName('前轮2') as Mesh;
    const wheelBL = mesh.getObjectByName('后轮1') as Mesh;
    const wheelBR = mesh.getObjectByName('后轮2') as Mesh;
    // Wheels
    const wheels = [wheelFL, wheelFR, wheelBL, wheelBR] as const;

    const carBodyDesc = RigidBodyDesc.dynamic();
    carBodyDesc.setTranslation(0, 3, 0);
    carBodyDesc.setCanSleep(false);
    const carBody = this._exp.physicWorld.instance.createRigidBody(carBodyDesc);

    const carColliderDesc = ColliderDesc.cuboid(1, 2.25, 1);
    carColliderDesc.setTranslation(0, 2.25, 0);
    carColliderDesc.setRestitution(0.55);
    const carCollider = this._exp.physicWorld.instance.createCollider(carColliderDesc, carBody);

    return { mesh, wheels, carBody, carCollider, q };
  }

  public update() {
    const t = this.car.carBody.translation();
    const q = this.car.carBody.rotation();

    //Transform
    this.car.mesh.position.copy(t);
    // Rotate
    this.car.mesh.quaternion.set(q.x, q.y, q.z, q.w);

    // Update wheels
    for (const w of this.car.wheels) {
      w.rotation.z -= 0.111;
    }
  }
}
