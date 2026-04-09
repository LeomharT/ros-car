import { ColliderDesc, RigidBodyDesc } from '@dimforge/rapier3d';
import gsap from 'gsap';
import { Box3, Mesh, MeshStandardMaterial, Object3D, Vector3, type Group } from 'three';
import type { Experience } from '../../Experience';

export class Sandbox {
  constructor(exp: Experience) {
    this._exp = exp;

    this.mesh = this._initModel();
    this.floor = this._initFloor();
    this.barrier = this._initBarrier();
    this._exp.scene.add(this.mesh);

    this.pane = this._setupPane();
  }

  private _exp: Experience;

  private _handlers = new Map<
    Object3D,
    {
      onEnter?: () => void;
      onLeave?: () => void;
      onHover?: () => void;
      onClick?: () => void;
    }
  >();

  public mesh: Group;

  public floor: ReturnType<typeof this._initFloor>;

  public barrier: ReturnType<typeof this._initBarrier>;

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
      .on('click', () => this._toggleBarrier(this.barrier.open));

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

  private _toggleBarrier(open: boolean) {
    this.barrier.open = !open;
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

  private _updateBarrierPick() {
    const isPicked = !!this._exp.raycasterServer.pick([this.barrier.mesh]).length;

    if (isPicked) {
      this._exp.canvas.style.cursor = 'pointer';
      this._exp.canvas.onclick = () => {
        this._toggleBarrier(this.barrier.open);
      };
    } else {
      this._exp.canvas.style.cursor = 'default';
      if (this._exp.canvas.onclick) this._exp.canvas.onclick = null;
    }
  }

  public update() {
    this._updateBarrierPick();
  }
}
