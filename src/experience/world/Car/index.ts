import ROSSystemInfo from '@/experience/ui/components/ROSSystemInfo';
import { dialog } from '@/experience/ui/UIShell';
import {
  ColliderDesc,
  JointData,
  MotorModel,
  RevoluteImpulseJoint,
  RigidBodyDesc,
} from '@dimforge/rapier3d';
import React from 'react';
import { Group, Mesh, MeshStandardMaterial, Quaternion, Vector3 } from 'three';
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

  private _steer: number = 0;

  public _velocity: number = 0;

  public car: ReturnType<typeof this._initModel>;

  private _setupPane() {
    const pane = this._exp.debug.pane.addFolder({ title: '🚗 Car' });
    return pane;
  }

  private _initModel() {
    // Model
    const model = this._exp.resources.items.carModel;
    const mesh = model.scene as Group;

    mesh.traverse((obj) => {
      if (obj instanceof Mesh && obj.material instanceof MeshStandardMaterial) {
        obj.material.fog = false;
      }
    });

    this._exp.picker.register(mesh, {
      onEnter: () => {
        this._exp.canvas.style.cursor = 'pointer';
      },
      onLeave: () => {
        this._exp.canvas.style.cursor = 'default';
      },
      onClick: () => {
        dialog.open({
          size: 'md',
          title: 'Product System Information',
          content: React.createElement(ROSSystemInfo),
          okButtonProps: {
            hidden: true,
          },
        });
      },
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

    const controls = {
      enabled: false,
    };

    // Car body
    const carBodyDesc = RigidBodyDesc.dynamic();
    carBodyDesc.setTranslation(0, 1.25, 0);
    carBodyDesc.setCanSleep(false);
    carBodyDesc.setEnabled(false);
    carBodyDesc.setLinearDamping(0.5);
    const carBody = this._exp.physicWorld.instance.createRigidBody(carBodyDesc);

    const carColliderDesc = ColliderDesc.cuboid(1.55, 1.25, 0.55);
    carColliderDesc.setTranslation(0, 1.5, 0);
    carColliderDesc.setRestitution(0);
    carColliderDesc.setEnabled(true);
    carColliderDesc.setCollisionGroups(0x00020001);
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
    wheelFLColliderDesc.setFriction(0.8);
    wheelFLColliderDesc.setMass(1.12);
    wheelFLColliderDesc.setCollisionGroups(0x00040001);
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
    wheelFRColliderDesc.setFriction(0.8);
    wheelFRColliderDesc.setMass(1.12);
    wheelFRColliderDesc.setCollisionGroups(0x00040001);
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
    wheelBLColliderDesc.setFriction(0.8);
    wheelBLColliderDesc.setMass(1.12);
    wheelBLColliderDesc.setCollisionGroups(0x00040001);
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
    wheelBRColliderDesc.setFriction(0.8);
    wheelBRColliderDesc.setMass(1.12);
    wheelBRColliderDesc.setCollisionGroups(0x00040001);
    this._exp.physicWorld.instance.createCollider(wheelBRColliderDesc, wheelBRBody);

    const wheelBodys = [wheelFLBody, wheelFRBody, wheelBLBody, wheelBRBody];

    // Create front axes for steer
    const axelFLBodyDesc = RigidBodyDesc.dynamic();
    axelFLBodyDesc.setTranslation(wheelFL.position.x, wheelFL.position.y, wheelFL.position.z);
    axelFLBodyDesc.setCanSleep(false);
    axelFLBodyDesc.setEnabled(true);
    const axelFLBody = this._exp.physicWorld.instance.createRigidBody(axelFLBodyDesc);

    const axelFLColliderDesc = ColliderDesc.cuboid(0.1, 0.1, 0.1);
    axelFLColliderDesc.setMass(1);
    axelFLColliderDesc.setCollisionGroups(0x00080000);
    this._exp.physicWorld.instance.createCollider(axelFLColliderDesc, axelFLBody);

    const axelFRBodyDesc = RigidBodyDesc.dynamic();
    axelFRBodyDesc.setTranslation(wheelFR.position.x, wheelFR.position.y, wheelFR.position.z);
    axelFRBodyDesc.setCanSleep(false);
    axelFRBodyDesc.setEnabled(true);
    const axelFRBody = this._exp.physicWorld.instance.createRigidBody(axelFRBodyDesc);

    const axelFRColliderDesc = ColliderDesc.cuboid(0.1, 0.1, 0.1);
    axelFRColliderDesc.setMass(1);
    axelFRColliderDesc.setCollisionGroups(0x00080001);
    this._exp.physicWorld.instance.createCollider(axelFRColliderDesc, axelFRBody);

    // Joint wheels to car body

    const axelFLJoint = this._exp.physicWorld.instance.createImpulseJoint(
      JointData.revolute(wheelFL.position, new Vector3(0, 0, 0), new Vector3(0, 1, 0)),
      carBody,
      axelFLBody,
      true,
    ) as RevoluteImpulseJoint;
    axelFLJoint.configureMotorModel(MotorModel.ForceBased);

    const axelFRJoint = this._exp.physicWorld.instance.createImpulseJoint(
      JointData.revolute(wheelFR.position, new Vector3(0, 0, 0), new Vector3(0, 1, 0)),
      carBody,
      axelFRBody,
      true,
    ) as RevoluteImpulseJoint;
    axelFRJoint.configureMotorModel(MotorModel.ForceBased);

    this._exp.physicWorld.instance.createImpulseJoint(
      JointData.revolute(new Vector3(0, 0, 0), new Vector3(0, 0, 0), new Vector3(0, 0, -1)),
      axelFLBody,
      wheelFLBody,
      true,
    ) as RevoluteImpulseJoint;

    this._exp.physicWorld.instance.createImpulseJoint(
      JointData.revolute(new Vector3(0, 0, 0), new Vector3(0, 0, 0), new Vector3(0, 0, -1)),
      axelFRBody,
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

    const wheelJoints = [axelFLJoint, axelFRJoint, wheelBLJoint, wheelBRJoint];

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

    this._steer = 0;

    if (this._exp.keyboardCtrl.keyMap.KeyA) {
      this._steer += 0.6;
    }
    if (this._exp.keyboardCtrl.keyMap.KeyD) {
      this._steer -= 0.6;
    }
    this.car.wheelJoints[0].configureMotorPosition(this._steer, 100, 10);
    this.car.wheelJoints[1].configureMotorPosition(this._steer, 100, 10);

    this._velocity = 0;
    let factor = 2.0;

    const forward = this._exp.keyboardCtrl.keyMap.KeyW;
    const backward = this._exp.keyboardCtrl.keyMap.KeyS;

    if (forward) {
      this._velocity = 20;
      factor = 2.0;
    } else if (backward) {
      this._velocity = -18;
      factor = 2.0;
    } else {
      this._velocity = 0.0;
      factor = 60;
    }

    this.car.wheelJoints[2].configureMotorVelocity(this._velocity, factor);
    this.car.wheelJoints[3].configureMotorVelocity(this._velocity, factor);
  }
}
