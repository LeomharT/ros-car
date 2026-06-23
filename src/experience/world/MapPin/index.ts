import type { Experience } from '@/experience/Experience';
import Marker, { type MarkerRef } from '@/experience/ui/components/Marker';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { MathUtils, Object3D, Vector2, type Object3DEventMap } from 'three';
import { CSS3DObject } from 'three/examples/jsm/Addons.js';

const lambda = 5.0;

export class MapPin {
  constructor(exp: Experience) {
    this._exp = exp;
    this.target = this._initTarget();
    this.project = new Vector2();

    this._exp.scene.add(this.target);

    const excluded = new Set(['大地面', '人行道右边', '人行道左边', '减速', '向上', '向下']);
    this._sandboxIntersect = this._exp.world.sandbox.mesh.children.filter(
      (obj) => !excluded.has(obj.name),
    );
  }

  private _exp: Experience;

  private _sandboxIntersect: Object3D<Object3DEventMap>[];

  public target: CSS3DObject;

  public project: Vector2;

  private _initTarget() {
    const root = document.createElement('div');
    root.id = 'css-object3d';
    root.style.background = 'rgb(0, 20, 10, 0)';

    const ref = React.createRef<MarkerRef>();
    createRoot(root).render(React.createElement(Marker, { ref }));

    const obj = new CSS3DObject(root);
    obj.position.set(0, 3, 0);
    obj.scale.setScalar(1.2);
    obj.userData.ref = ref;

    return obj;
  }

  public update() {
    const dt = this._exp.time.delta;
    const t = 1.0 - Math.exp(lambda * -dt);

    this.target.position.y = MathUtils.lerp(this.target.position.y, 0.5, t);

    const p = this.target.position.clone().project(this._exp.camera.instance);
    this.project.set(p.x, p.y);

    const angle = Math.atan2(
      this._exp.camera.instance.position.x - this.target.position.x,
      this._exp.camera.instance.position.z - this.target.position.z,
    );

    this.target.rotation.y = angle;

    const intersects = this._exp.picker.castFromCamera(this.project, this._sandboxIntersect);

    if (intersects.length === 0) {
      this.target.userData.ref.current?.setVisiable(true);
    } else {
      const intersectionDistance = intersects[0].distance;
      const pointDistance = p.distanceTo(this._exp.camera.instance.position);

      if (intersectionDistance < pointDistance) {
        this.target.userData.ref.current?.setVisiable(false);
      } else {
        this.target.userData.ref.current?.setVisiable(true);
      }
    }
  }
}
