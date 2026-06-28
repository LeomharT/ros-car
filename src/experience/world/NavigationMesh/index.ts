import type { Experience } from '@/experience/Experience';
import { createGraphHelper } from '@/experience/utils/GraphHelpers';
import {
  BufferGeometry,
  CatmullRomCurve3,
  Color,
  Float32BufferAttribute,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  Vector3,
} from 'three';
import { Line2, LineGeometry, LineMaterial } from 'three/examples/jsm/Addons.js';
import * as YUKA from 'yuka';

export class NavigationMesh {
  constructor(exp: Experience) {
    this._exp = exp;
    this._pane = this._setupPane();

    this._line = this._initLine();
    this._exp.scene.add(this._line);

    this.mesh = this._initMesh();
  }

  private _exp: Experience;

  private _pane: ReturnType<typeof this._setupPane>;

  private _line: Line2;

  private _points: Vector3[] = [];

  private _pointIndex: number = 0;

  private _showLine: boolean = true;

  public curve?: CatmullRomCurve3;

  public mesh: ReturnType<typeof this._initMesh>;

  private _initMesh() {
    const model = this._exp.resources.items.navigation;

    const group = createConvexRegionHelper(model);
    group.frustumCulled = false;
    group.material.polygonOffset = true;
    group.material.polygonOffsetFactor = -2.0;
    group.material.needsUpdate = true;
    group.material.fog = false;
    // group.visible = false;

    const helper = createGraphHelper(model.graph, 0.2);
    // helper.visible = false;

    this._pane.addBinding(group, 'visible', { label: 'Region Helper' });
    this._pane.addBinding(helper, 'visible', { label: 'Graph Helper' });

    this._exp.picker.register(group, {
      onClick: (_, point) => {
        if (!this._exp.world.car.autoNav) return;
        if (!this._exp.world.mapPin.target.visible) this._exp.world.mapPin.target.visible = true;

        const p = point.clone().setY(1.5);
        this._exp.world.mapPin.target.position.copy(p);

        this._exp.world.car.navStep = 0;
        this.findPathTo(point);
      },
      onEnter: () => {
        this._exp.canvas.style.cursor = 'default';
      },
      onLeave: () => {},
    });

    this._exp.scene.add(group);
    this._exp.scene.add(helper);

    return model;
  }

  private _initLine() {
    const geometry = new LineGeometry();
    const material = new LineMaterial({
      linewidth: 10,
      depthTest: false,
    });
    return new Line2(geometry, material);
  }

  private _setupPane() {
    const pane = this._exp.debug.pane.addFolder({ title: '🧭 NavigationMesh' });
    return pane;
  }

  private _updateCurve(points: Vector3[]) {
    this._line.geometry.dispose();
    this._line.geometry = new LineGeometry().setFromPoints(points);

    this._line.updateMatrix();
    this._line.updateMatrixWorld();
    if (!this._line.visible) this._line.visible = this._showLine;
  }

  public findPathTo(point: Vector3, showLine: boolean = true) {
    const from = this._exp.world.car.mesh.position.clone();
    const to = point.clone();

    const points = this.mesh.findPath(
      new YUKA.Vector3(from.x, from.y, from.z),
      new YUKA.Vector3(to.x, to.y, to.z),
    );

    this.curve = new CatmullRomCurve3(points.map((v) => new Vector3(v.x, v.y, v.z)));
    this._pointIndex = 0;
    this._points = [];
    this._showLine = showLine;
    // this._updateCurve(this.curve.getPoints(50), showLine);
  }

  public dispose() {
    this.curve = undefined;
    this._line.visible = false;
  }

  public update() {
    if (this.curve) {
      const dt = this._exp.time.delta;

      this._pointIndex += (dt * 10) / this.curve.getLength();
      this._pointIndex = MathUtils.clamp(this._pointIndex, 0, 1);

      this._points.push(this.curve.getPointAt(this._pointIndex));
      this._updateCurve(this._points);
    }
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
