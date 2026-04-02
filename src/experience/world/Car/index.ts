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

  private _keyMap: { [key: string]: boolean } = {};

  public car: ReturnType<typeof this._initModel>;

  private _setupPane() {
    const pane = this._exp.debug.pane.addFolder({ title: '🚗 Car' });
    return pane;
  }

  private _initModel() {
    // Model
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

    const wheels = [wheelFL, wheelFR, wheelBL, wheelBR] as const;

    for (const w of wheels) {
      w.visible = false;
    }

    const controls = {
      enabled: false,
    };

    // Car body
    const carBodyDesc = RigidBodyDesc.dynamic();
    carBodyDesc.setTranslation(0, 3, 0);
    carBodyDesc.setCanSleep(false);
    carBodyDesc.setEnabled(false);
    const carBody = this._exp.physicWorld.instance.createRigidBody(carBodyDesc);

    const carColliderDesc = ColliderDesc.cuboid(1.55, 1.25, 0.55);
    carColliderDesc.setTranslation(0, 1.5, 0);
    carColliderDesc.setRestitution(0);
    carColliderDesc.setEnabled(true);
    this._exp.physicWorld.instance.createCollider(carColliderDesc, carBody);

    this._pane.addBinding(controls, 'enabled', {}).on('change', (val) => {
      carBody.setEnabled(val.value);
    });

    //
    const wheelFLBodyDesc = RigidBodyDesc.dynamic();
    wheelFLBodyDesc.setTranslation(wheelFL.position.x, wheelFL.position.y, wheelFL.position.z);
    wheelFLBodyDesc.setCanSleep(false);
    const wheelFLBody = this._exp.physicWorld.instance.createRigidBody(wheelFLBodyDesc);

    const wheelFLColliderDesc = ColliderDesc.cylinder(0.23, 0.45);
    wheelFLColliderDesc.setRotation(
      new Quaternion().setFromAxisAngle(new Vector3(1, 0, 0), Math.PI / 2),
    );
    wheelFLColliderDesc.setFriction(0.2);
    wheelFLColliderDesc.setMass(2);
    this._exp.physicWorld.instance.createCollider(wheelFLColliderDesc, wheelFLBody);

    //
    const wheelFRBodyDesc = RigidBodyDesc.dynamic();
    wheelFRBodyDesc.setTranslation(wheelFR.position.x, wheelFR.position.y, wheelFR.position.z);
    wheelFRBodyDesc.setCanSleep(false);
    const wheelFRBody = this._exp.physicWorld.instance.createRigidBody(wheelFRBodyDesc);

    const wheelFRColliderDesc = ColliderDesc.cylinder(0.23, 0.45);
    wheelFRColliderDesc.setRotation(
      new Quaternion().setFromAxisAngle(new Vector3(1, 0, 0), Math.PI / 2),
    );
    wheelFRColliderDesc.setFriction(0.2);
    wheelFRColliderDesc.setMass(2);
    this._exp.physicWorld.instance.createCollider(wheelFRColliderDesc, wheelFRBody);

    //
    const wheelBLBodyDesc = RigidBodyDesc.dynamic();
    wheelBLBodyDesc.setTranslation(wheelBL.position.x, wheelBL.position.y, wheelBL.position.z);
    wheelBLBodyDesc.setCanSleep(false);
    const wheelBLBody = this._exp.physicWorld.instance.createRigidBody(wheelBLBodyDesc);

    const wheelBLColliderDesc = ColliderDesc.cylinder(0.23, 0.45);
    wheelBLColliderDesc.setRotation(
      new Quaternion().setFromAxisAngle(new Vector3(1, 0, 0), Math.PI / 2),
    );
    wheelBLColliderDesc.setFriction(0.2);
    wheelBLColliderDesc.setMass(2);
    this._exp.physicWorld.instance.createCollider(wheelBLColliderDesc, wheelBLBody);

    //
    const wheelBRBodyDesc = RigidBodyDesc.dynamic();
    wheelBRBodyDesc.setTranslation(wheelBR.position.x, wheelBR.position.y, wheelBR.position.z);
    wheelBRBodyDesc.setCanSleep(false);
    const wheelBRBody = this._exp.physicWorld.instance.createRigidBody(wheelBRBodyDesc);

    const wheelBRColliderDesc = ColliderDesc.cylinder(0.23, 0.45);
    wheelBRColliderDesc.setRotation(
      new Quaternion().setFromAxisAngle(new Vector3(1, 0, 0), Math.PI / 2),
    );
    wheelBRColliderDesc.setFriction(0.2);
    wheelBRColliderDesc.setMass(2);
    this._exp.physicWorld.instance.createCollider(wheelBRColliderDesc, wheelBRBody);

    const wheelBodys = [wheelFLBody, wheelFRBody, wheelBLBody];

    // Joint wheels to car body
    const wheelFLJoint = this._exp.physicWorld.instance.createImpulseJoint(
      JointData.revolute(wheelFL.position, new Vector3(0, 0, 0), new Vector3(0, 0, -1)),
      carBody,
      wheelFLBody,
      true,
    ) as RevoluteImpulseJoint;

    const wheelFRJoint = this._exp.physicWorld.instance.createImpulseJoint(
      JointData.revolute(wheelFR.position, new Vector3(0, 0, 0), new Vector3(0, 0, -1)),
      carBody,
      wheelFRBody,
      true,
    ) as RevoluteImpulseJoint;

    const wheelBLJoint = this._exp.physicWorld.instance.createImpulseJoint(
      JointData.revolute(wheelBL.position, new Vector3(0, 0, 0), new Vector3(0, 0, -1)),
      carBody,
      wheelBLBody,
      true,
    ) as RevoluteImpulseJoint;

    const wheelBRJoint = this._exp.physicWorld.instance.createImpulseJoint(
      JointData.revolute(wheelBR.position, new Vector3(0, 0, 0), new Vector3(0, 0, -1)),
      carBody,
      wheelBRBody,
      true,
    ) as RevoluteImpulseJoint;

    const wheelJoints = [wheelFLJoint, wheelFRJoint, wheelBLJoint, wheelBRJoint];

    for (const j of wheelJoints) {
      j.configureMotorVelocity(2, 1);
    }

    return { mesh, wheels, carBody, wheelBodys, wheelJoints };
  }

  public update() {
    // Update Carbody
    this.car.mesh.position.copy(this.car.carBody.translation());
    this.car.mesh.quaternion.copy(this.car.carBody.rotation());

    // Update wheels
    for (let i = 0; i < this.car.wheelBodys.length; i++) {
      this.car.wheels[i].position.copy(this.car.wheelBodys[i].translation());
      this.car.wheels[i].quaternion.copy(this.car.wheelBodys[i].rotation());
    }
  }
}
