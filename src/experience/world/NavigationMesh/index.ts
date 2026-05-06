import type { Experience } from '@/experience/Experience';
import { alert } from '@/experience/ui/UIShell';

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
      onClick(e) {
        alert.open({
          title: 'Click on the navigation mesh',
          description: `X ${e.clientX} Y ${e.clientY}`,
        });
      },
    });

    this._exp.scene.add(mesh);

    return mesh;
  }
}
