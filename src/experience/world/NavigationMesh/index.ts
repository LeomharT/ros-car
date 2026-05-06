import type { Experience } from '@/experience/Experience';

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

    mesh.position.y = 5;

    this._exp.scene.add(mesh);

    return mesh;
  }
}
