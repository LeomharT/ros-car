import { ColliderDesc, JointData, RevoluteImpulseJoint, RigidBodyDesc } from '@dimforge/rapier3d';
import { Mesh, MeshStandardMaterial, Quaternion, Vector3 } from 'three';
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
    const model = this._exp.resources.items.carModel;
    const mesh = model.scene;

    mesh.traverse((obj) => {
      if (obj instanceof Mesh && obj.material instanceof MeshStandardMaterial) {
        obj.material.fog = false;
      }
    });
    this._exp.scene.add(mesh);

    // Wheels
    const wheelFL = mesh.getObjectByName('前轮1') as Mesh;
    const wheelFR = mesh.getObjectByName('前轮2') as Mesh;
    const wheelBL = mesh.getObjectByName('后轮1') as Mesh;
    const wheelBR = mesh.getObjectByName('后轮2') as Mesh;
    mesh.updateWorldMatrix(true, true);

    this._exp.scene.attach(wheelFL);
    this._exp.scene.attach(wheelFR);
    this._exp.scene.attach(wheelBL);
    this._exp.scene.attach(wheelBR);

    console.log(mesh);

    const wheels = [wheelFL, wheelFR, wheelBL, wheelBR] as const;

    // Car body
    const carBodyDesc = RigidBodyDesc.dynamic();
    carBodyDesc.setTranslation(0, 3, 0);
    carBodyDesc.setCanSleep(false);
    carBodyDesc.setEnabled(true);
    const carBody = this._exp.physicWorld.instance.createRigidBody(carBodyDesc);

    const carColliderDesc = ColliderDesc.cuboid(0.55, 1.25, 0.55);
    carColliderDesc.setTranslation(0, 1.25, 0);
    carColliderDesc.setRestitution(0.25);
    carColliderDesc.setEnabled(true);
    this._exp.physicWorld.instance.createCollider(carColliderDesc, carBody);

    const wheelFLBodyDesc = RigidBodyDesc.dynamic();
    wheelFLBodyDesc.setCanSleep(false);
    const wheelFLBody = this._exp.physicWorld.instance.createRigidBody(wheelFLBodyDesc);

    const wheelFLColliderDesc = ColliderDesc.cylinder(0.23, 0.45);
    wheelFLColliderDesc.setRotation(new Quaternion().setFromAxisAngle(new Vector3(1, 0, 0), Math.PI / 2));
    wheelFLColliderDesc.setFriction(2);
    this._exp.physicWorld.instance.createCollider(wheelFLColliderDesc, wheelFLBody);

    // Joint wheels to car body
    const m = this._exp.physicWorld.instance.createImpulseJoint(
      JointData.revolute(wheelFL.position, new Vector3(0, 0, 0), new Vector3(0, 0, -1)),
      carBody,
      wheelFLBody,
      true,
    ) as RevoluteImpulseJoint;

    m.configureMotorVelocity(20, 2);

    const wheelBodys = [wheelFLBody];

    return { mesh, wheels, carBody, wheelBodys };
  }

  public update() {
    // Update Carbody
    this.car.mesh.position.copy(this.car.carBody.translation());
    this.car.mesh.quaternion.copy(this.car.carBody.rotation());

    for (let i = 0; i < this.car.wheelBodys.length; i++) {
      this.car.wheels[i].position.copy(this.car.wheelBodys[i].translation());
      this.car.wheels[i].quaternion.copy(this.car.wheelBodys[i].rotation());
    }

    // Update wheels
    for (const w of this.car.wheels) {
    }
  }
}
