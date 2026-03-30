import { Collider, ColliderDesc, RigidBodyDesc } from '@dimforge/rapier3d';
import { IcosahedronGeometry, Mesh, MeshStandardMaterial } from 'three';
import type { Experience } from '../../Experience';

export class Car {
  constructor(exp: Experience) {
    this._exp = exp;
    const { sphere, collider } = this._setupModel();
    this.test = sphere;
    this._collider = collider;
  }

  private _exp: Experience;

  private test: Mesh;

  private _collider: Collider;

  private _setupModel() {
    const model = this._exp.resources.items.carModel;
    const car = model.scene;

    car.traverse((obj) => {
      if (obj instanceof Mesh && obj.material instanceof MeshStandardMaterial) {
        obj.material.fog = false;
      }
    });
    this._exp.scene.add(car);

    const sphereGeometry = new IcosahedronGeometry(0.5, 3);
    const sphereMaterial = new MeshStandardMaterial({});
    const sphere = new Mesh(sphereGeometry, sphereMaterial);
    sphere.position.y = 8;
    this._exp.scene.add(sphere);

    const bodyDesc = RigidBodyDesc.dynamic()
      .setTranslation(0, 8, 0)
      .setAngvel({ x: 3, y: 0, z: 0 })
      .setLinvel(0, 0, 0);
    const body = this._exp.physicWorld.instance.createRigidBody(bodyDesc);

    const colliderDesc = ColliderDesc.ball(0.5);
    colliderDesc.restitution = 0.8;
    const collider = this._exp.physicWorld.instance.createCollider(colliderDesc, body);

    return { sphere, collider };
  }

  public update() {
    this.test.position.copy(this._collider.translation());
  }
}
