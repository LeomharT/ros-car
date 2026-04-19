import { dialog } from '@/experience/ui/UIShell';
import { ColliderDesc, RigidBodyDesc } from '@dimforge/rapier3d';
import gsap from 'gsap';
import { toast } from 'sonner';
import { Box3, Mesh, MeshStandardMaterial, Vector3, type Group } from 'three';
import type { Experience } from '../../Experience';
import { CautionTape } from '../CautionTape';

export class Sandbox {
  constructor(exp: Experience) {
    this._exp = exp;

    this.mesh = this._initModel();
    this.floor = this._initFloor();
    this.walls = this._initWall();
    this.barrier = this._initBarrier();
    this.parkingGround = this._initParkingGround();
    this.pane = this._setupPane();

    this._exp.scene.add(this.mesh);
  }

  private _exp: Experience;

  public mesh: Group;

  public floor: ReturnType<typeof this._initFloor>;

  public walls: ReturnType<typeof this._initWall>;

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

  private _initWall() {
    const buildWall = (pos: Vector3, size: Vector3) => {
      const bodyDesc = RigidBodyDesc.fixed();
      bodyDesc.setTranslation(pos.x, pos.y, pos.z);
      const body = this._exp.physicWorld.instance.createRigidBody(bodyDesc);

      const colliderDesc = ColliderDesc.cuboid(size.x, size.y, size.z);
      this._exp.physicWorld.instance.createCollider(colliderDesc, body);
    };
    // Wall A
    buildWall(new Vector3(0, 1.55, 11.88), new Vector3(10, 1.55, 0.1));
    // Wall B
    buildWall(new Vector3(9.9, 1.55, 0), new Vector3(0.1, 1.55, 11.75));
    // Wall C
    buildWall(new Vector3(0, 1.55, -11.88), new Vector3(10, 1.55, 0.1));
    // Wall D
    buildWall(new Vector3(-9.9, 1.55, 0), new Vector3(0.1, 1.55, 11.75));
  }

  private _initBarrier() {
    const open = false;

    const mesh = this.mesh.getObjectByName('杠') as Group;

    this._exp.picker.register(mesh, {
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
    this._exp.picker.register(mesh, {
      onEnter: () => {
        this._exp.canvas.style.cursor = 'pointer';
        tape.up();
      },
      onLeave: () => {
        this._exp.canvas.style.cursor = 'default';
        tape.down();
      },
      onClick: () => {
        toast('Hello World, You Click On the Board');
        dialog.open({
          title: 'Dialog Title',
          content: 'Dialog Conent',
          onOk: async () => {
            return new Promise((r) => {
              setTimeout(r, 1000);
            }).catch((e) => console.log('Oops errors!', e));
          },
        });
      },
    });

    const tape = new CautionTape(3.66, 4.72, '#f0f5ff');
    tape.mesh.position.x = mesh.position.x;
    tape.mesh.position.y = -1;
    tape.mesh.position.z = mesh.position.z / 2.7;
    tape.animation = {
      up: () => gsap.to(tape.mesh.position, { y: 1.0, ease: 'back.out', duration: 0.5 }).play(),
      down: () => gsap.to(tape.mesh.position, { y: -1.0, ease: 'back.in', duration: 0.5 }).play(),
    };

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
