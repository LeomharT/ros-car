import { ColliderDesc, RigidBodyDesc } from '@dimforge/rapier3d';
import gsap from 'gsap';
import { Box3, Mesh, MeshStandardMaterial, Vector3, type Group } from 'three';
import type { Experience } from '../../Experience';
import { CautionTape } from '../CautionTape';

export class Sandbox {
  constructor(exp: Experience) {
    this._exp = exp;

    this.mesh = this._initModel();
    this.floor = this._initFloor();
    this.barrier = this._initBarrier();
    this.parkingGround = this._initParkingGround();
    this.pane = this._setupPane();

    this._exp.scene.add(this.mesh);
  }

  private _exp: Experience;

  public mesh: Group;

  public floor: ReturnType<typeof this._initFloor>;

  public barrier: ReturnType<typeof this._initBarrier>;

  public parkingGround: ReturnType<typeof this._initParkingGround>;

  public pane: ReturnType<typeof this._setupPane>;

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

  private _setupPane() {
    const pane = this._exp.debug.pane.addFolder({ title: '📦 Sandbox' });

    const barrier_f = pane.addFolder({ title: '🚧 Barrier' });
    const button = barrier_f
      .addButton({ label: 'Toggle Barrier', title: 'Toggle' })
      .on('click', () => this._toggleBarrier());

    return { pane, button };
  }

  private _initFloor() {
    const mesh = this.mesh.getObjectByName('大地面') as Mesh;

    const bodyDesc = RigidBodyDesc.fixed().setTranslation(0, -0.1, 0);
    const body = this._exp.physicWorld.instance.createRigidBody(bodyDesc);

    const colliderDesc = ColliderDesc.cuboid(10, 0.1, 12);
    const collider = this._exp.physicWorld.instance.createCollider(colliderDesc, body);

    return { mesh, body, collider };
  }

  private _initBarrier() {
    const open = false;

    const mesh = this.mesh.getObjectByName('杠') as Group;

    this._exp.raycasterServer.register(mesh, {
      onClick: () => {
        this._toggleBarrier();
      },
      onEnter: () => {
        this._exp.canvas.style.cursor = 'pointer';
      },
      onLeave: () => {
        this._exp.canvas.style.cursor = 'default';
      },
    });

    const box = new Box3();
    box.setFromObject(mesh);

    const size = new Vector3();
    box.getSize(size);

    const bodyDesc = RigidBodyDesc.fixed().setTranslation(
      mesh.position.x,
      mesh.position.y,
      mesh.position.z + size.z / 2,
    );

    const body = this._exp.physicWorld.instance.createRigidBody(bodyDesc);

    const colliderDesc = ColliderDesc.cuboid(0.1, 0.1, 2);
    const collider = this._exp.physicWorld.instance.createCollider(colliderDesc, body);

    return { mesh, body, collider, open };
  }

  private _initParkingGround() {
    const mesh = this.mesh.getObjectByName('p地面') as Mesh;
    this._exp.raycasterServer.register(mesh, {
      onEnter: () => {
        this._exp.canvas.style.cursor = 'pointer';
        gsap
          .to(tape.mesh.position, {
            y: 1.0,
            ease: 'back.out',
            duration: 0.5,
          })
          .play();
      },
      onLeave: () => {
        this._exp.canvas.style.cursor = 'default';
        gsap
          .to(tape.mesh.position, {
            y: -1.0,
            ease: 'back.in',
            duration: 0.5,
          })
          .play();
      },
      onClick: () => {
        console.log('Click on P ground');
      },
    });

    const tape = new CautionTape(3.66, 4.72, '#f0f5ff');
    tape.mesh.position.x = mesh.position.x;
    tape.mesh.position.y = -1;
    tape.mesh.position.z = mesh.position.z / 2.7;

    this._exp.scene.add(tape.mesh);

    return { tape };
  }

  private _toggleBarrier() {
    this.barrier.open = !this.barrier.open;
    const target = this.barrier.open ? -Math.PI * 1.25 : -Math.PI * 0.75;

    gsap
      .to(this.barrier.mesh.rotation, {
        x: target,
        ease: 'back.inOut',
        duration: 1.25,
        onStart: () => {
          this.pane.button.disabled = true;
        },
        onComplete: () => {
          this.pane.button.disabled = false;
          this.barrier.collider.setEnabled(!this.barrier.open);
        },
      })
      .play();
  }

  public update() {
    this.parkingGround.tape.update();
  }
}
