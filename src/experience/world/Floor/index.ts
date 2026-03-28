import { ColliderDesc, RigidBodyDesc } from '@dimforge/rapier3d';
import {
  Color,
  Mesh,
  PlaneGeometry,
  ShaderMaterial,
  Uniform,
  UniformsLib,
  UniformsUtils,
  Vector2,
} from 'three';
import type { Experience } from '../../Experience';
import floorFragmentShader from './shader/floor/fragment.glsl?raw';
import floorVertexShader from './shader/floor/vertex.glsl?raw';

export class Floor {
  constructor(exp: Experience) {
    this._exp = exp;
    this._uniform = this._createUniform();
    this._mesh = this._setupMesh();
    this._exp.scene.add(this._mesh);
    this._debugPane();
  }

  private _exp: Experience;

  private _mesh: Mesh;

  private _uniform: ReturnType<typeof this._createUniform>;

  private _createUniform() {
    return UniformsUtils.merge([
      UniformsLib['fog'],
      {
        uScale: new Uniform(95.0),
        uThickness: new Uniform(0.03),
        uCross: new Uniform(0.11),
        uOffset: new Uniform(new Vector2(0.5, 0)),
        uColor: new Uniform(new Color(0.125, 0.785, 0.128)),
      },
    ]);
  }

  private _setupMesh() {
    const floorGeometry = new PlaneGeometry(200, 200, 128, 128);
    const floorMaterial = new ShaderMaterial({
      vertexShader: floorVertexShader,
      fragmentShader: floorFragmentShader,
      uniforms: this._uniform,
      transparent: true,
      fog: true,
    });

    const mesh = new Mesh(floorGeometry, floorMaterial);
    mesh.position.y = -0.001;
    mesh.rotation.x = -Math.PI / 2;

    const floorBody = this._exp.physicWorld.instance.createRigidBody(
      RigidBodyDesc.fixed().setTranslation(0, -0.5, 0),
    );
    const floorShape = ColliderDesc.cuboid(100, 0.5, 100);
    this._exp.physicWorld.instance.createCollider(floorShape, floorBody);

    return mesh;
  }

  private _debugPane() {
    const pane = this._exp.debug.pane.addFolder({ title: '🪟 Grid' });

    // Corss
    pane.addBinding(this._uniform.uScale, 'value', {
      label: 'scale',
      min: 1,
      max: 100,
      strp: 1,
    });
    pane.addBinding(this._uniform.uThickness, 'value', {
      label: 'thickness',
      min: 0,
      max: 0.5,
      strp: 0.001,
    });
    pane.addBinding(this._uniform.uCross, 'value', {
      label: 'cross',
      min: 0,
      max: 0.5,
      strp: 0.001,
    });
    pane.addBinding(this._uniform.uOffset, 'value', {
      label: 'offset',
      x: { step: 0.001, max: 1 },
      y: { step: 0.001, max: 1 },
    });
    pane.addBinding(this._uniform.uColor, 'value', {
      label: 'color',
      color: { type: 'float' },
    });
  }
}
