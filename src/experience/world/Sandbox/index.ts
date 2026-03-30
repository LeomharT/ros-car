import { ColliderDesc, RigidBodyDesc } from '@dimforge/rapier3d';
import { Mesh, MeshStandardMaterial, type Group } from 'three';
import type { Experience } from '../../Experience';

export class Sandbox {
  constructor(exp: Experience) {
    this._exp = exp;

    this.mesh = this._initModel();
    this.floor = this._initFloor();

    this._exp.scene.add(this.mesh);
  }

  private _exp: Experience;

  public mesh: Group;

  public floor: ReturnType<typeof this._initFloor>;

  private _initModel() {
    const model = this._exp.resources.items.mapModel;
    const mesh = model.scene;
    mesh.traverse((obj) => {
      if (obj instanceof Mesh && obj.material instanceof MeshStandardMaterial) {
        obj.material.fog = false;
      }
    });

    return mesh;
  }

  private _initFloor() {
    const mesh = this.mesh.getObjectByName('大地面') as Mesh;

    const bodyDesc = RigidBodyDesc.fixed().setTranslation(0, -0.1, 0);
    const body = this._exp.physicWorld.instance.createRigidBody(bodyDesc);

    const colliderDesc = ColliderDesc.cuboid(10, 0.1, 12);
    const collider = this._exp.physicWorld.instance.createCollider(colliderDesc, body);

    return { mesh, body, collider };
  }

  public update() {}
}
