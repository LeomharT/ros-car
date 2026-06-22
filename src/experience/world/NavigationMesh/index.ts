import type { Experience } from '@/experience/Experience';
import { createGraphHelper } from '@/experience/utils/GraphHelpers';
import { BufferGeometry, Color, Float32BufferAttribute, Mesh, MeshBasicMaterial } from 'three';
import * as YUKA from 'yuka';

export class NavigationMesh {
  constructor(exp: Experience) {
    this._exp = exp;
    this.mesh = this._initMesh();
  }

  private _exp: Experience;

  public mesh: ReturnType<typeof this._initMesh>;

  private _initMesh() {
    const model = this._exp.resources.items.navigation;

    const group = createConvexRegionHelper(model);
    group.frustumCulled = false;
    group.material.polygonOffset = true;
    group.material.polygonOffsetFactor = -2.0;
    group.material.needsUpdate = true;
    group.material.fog = false;

    const helper = createGraphHelper(model.graph, 0.2);

    this._exp.picker.register(group, {
      onClick: (_, point) => {
        this._exp.uiShell.marker.position.copy(point);
      },
      onEnter: () => {
        this._exp.canvas.style.cursor = 'default';
      },
      onLeave: () => {},
    });

    this._exp.scene.add(group);
    this._exp.scene.add(helper);

    // const mesh = model.scene;
    // mesh.visible = false;

    // this._exp.picker.register(mesh, {
    //   onEnter: () => {
    //     this._exp.canvas.style.cursor = 'default';
    //   },
    //   onClick: (_, p) => {
    //     toast(`X:${p.x.toFixed(3)}, Y:${p.y.toFixed(3)}, Z:${p.z.toFixed(3)}`);
    //   },
    // });

    // this._exp.scene.add(mesh);

    return model;
  }
}

/**
 * @author Mugen87 / https://github.com/Mugen87
 */
function createConvexRegionHelper(navMesh: YUKA.NavMesh) {
  const regions = navMesh.regions;

  const geometry = new BufferGeometry();
  const material = new MeshBasicMaterial({ vertexColors: true });

  const mesh = new Mesh(geometry, material);

  const positions = [];
  const colors = [];

  const color = new Color();

  for (let region of regions) {
    // one color for each convex region

    color.setHex(Math.random() * 0xffffff);

    // count edges

    let edge = region.edge;
    const edges = [];

    do {
      if (edge) {
        edges.push(edge);
        edge = edge.next;
      }
    } while (edge !== region.edge);

    // triangulate

    const triangleCount = edges.length - 2;

    for (let i = 1, l = triangleCount; i <= l; i++) {
      const v1 = edges[0].vertex;
      const v2 = edges[i + 0].vertex;
      const v3 = edges[i + 1].vertex;

      positions.push(v1.x, v1.y, v1.z);
      positions.push(v2.x, v2.y, v2.z);
      positions.push(v3.x, v3.y, v3.z);

      colors.push(color.r, color.g, color.b);
      colors.push(color.r, color.g, color.b);
      colors.push(color.r, color.g, color.b);
    }
  }

  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));

  return mesh;
}
