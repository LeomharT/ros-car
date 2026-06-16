import type { Experience } from '@/experience/Experience';
import { toast } from 'sonner';

export class NavigationMesh {
  constructor(exp: Experience) {
    this._exp = exp;
    this.mesh = this._initMesh();
  }

  private _exp: Experience;

  public mesh: ReturnType<typeof this._initMesh>;

  private _initMesh() {
    const model = this._exp.resources.items.navigation;

    const mesh = model.scene;
    mesh.visible = false;

    this._exp.picker.register(mesh, {
      onEnter: () => {
        this._exp.canvas.style.cursor = 'default';
      },
      onClick: (_, p) => {
        toast(`X:${p.x.toFixed(3)}, Y:${p.y.toFixed(3)}, Z:${p.z.toFixed(3)}`);
      },
    });

    this._exp.scene.add(mesh);

    return mesh;
  }
}
