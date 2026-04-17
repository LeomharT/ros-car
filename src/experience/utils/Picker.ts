import { Object3D, Raycaster, Vector2, type Intersection } from 'three';
import type { Experience } from '../Experience';

type RaycasterHandlers = {
  onEnter?: () => void;
  onLeave?: () => void;
  onHover?: () => void;
  onClick?: () => void;
};

export class Picker {
  constructor(exp: Experience) {
    this._exp = exp;
    this._raycaster = new Raycaster();
    this._cursro = new Vector2();
    this._enabled = true;
    this._intersects = [];
    this._lastInteractive = null;
    this._handles = new Map();

    this._exp.canvas.addEventListener('pointermove', (e) => {
      if (!this._enabled) return;

      this._cursro.x = (e.clientX / window.innerWidth) * 2 - 1;
      this._cursro.y = -(e.clientY / window.innerHeight) * 2 + 1;

      this._intersects = this.pick(Array.from(this._handles.keys()));

      if (this._intersects.length) {
        const target = this._resolveRegisteredTarget(this._intersects[0].object);

        if (target) {
          if (target !== this._lastInteractive) {
            this._handles.get(target)?.onEnter?.();
            this._lastInteractive = target;
          }
          if (target === this._lastInteractive) {
            this._handles.get(target)?.onHover?.();
          }
        }

        if (!target && this._lastInteractive) {
          this._handles.get(this._lastInteractive)?.onLeave?.();
          this._lastInteractive = null;
        }
      } else {
        if (this._lastInteractive) {
          this._handles.get(this._lastInteractive)?.onLeave?.();
          this._lastInteractive = null;
        }
      }
    });

    this._exp.canvas.addEventListener('pointerdown', (e) => {
      this._enabled = false;
      this._exp.canvas.setPointerCapture(e.pointerId);

      if (this._intersects.length) {
        const target = this._resolveRegisteredTarget(this._intersects[0].object);
        target && this._handles.get(target)?.onClick?.();
      }
    });

    this._exp.canvas.addEventListener('pointerup', () => {
      this._enabled = true;
    });
  }

  private _exp: Experience;

  private _raycaster: Raycaster;

  private _cursro: Vector2;

  private _enabled: boolean;

  private _intersects: Array<Intersection<Object3D>>;

  private _lastInteractive: Object3D | null;

  private _handles: Map<Object3D, RaycasterHandlers>;

  public register(target: Object3D, handles: RaycasterHandlers) {
    this._handles.set(target, handles);
  }

  public unregister(target: Object3D) {
    this._handles.delete(target);
  }

  public pick(target: Object3D[]) {
    this._raycaster.setFromCamera(this._cursro, this._exp.camera.instance);
    return this._raycaster.intersectObjects(target, true);
  }

  private _resolveRegisteredTarget(target: Object3D | null): Object3D | null {
    if (!target) return null;
    if (this._handles.has(target)) return target;

    return this._resolveRegisteredTarget(target.parent);
  }
}
