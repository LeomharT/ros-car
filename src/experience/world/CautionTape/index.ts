import {
  Color,
  DoubleSide,
  Group,
  Mesh,
  PlaneGeometry,
  ShaderMaterial,
  Uniform,
  Vector2,
  type ColorRepresentation,
} from 'three';
import fragmentShader from './shader/fragment.glsl?raw';
import vertexShader from './shader/vertex.glsl?raw';

type TapeAnimation = {
  up?: () => void;
  down?: () => void;
};

export class CautionTape {
  constructor(w: number, h: number, color: ColorRepresentation = 0xffffff) {
    this._uniforms = this._setupUniforms();
    this._uniforms.uColor.value = new Color(color).convertSRGBToLinear();

    this.mesh = this._setupMesh(w, h);
  }

  public mesh: Group;

  public animation?: TapeAnimation;

  public status: boolean = false;

  private _uniforms: ReturnType<typeof this._setupUniforms>;

  private _setupUniforms() {
    return {
      uTime: new Uniform(0),
      uColor: new Uniform(new Color()),
    };
  }

  private _setupMesh(w: number, h: number) {
    const planeGeometryW = new PlaneGeometry(w, 0.5, 32, 32);
    const planeGeometryH = new PlaneGeometry(h, 0.5, 32, 32);

    const planeMaterialW = new ShaderMaterial({
      uniforms: {
        ...this._uniforms,
        uResolution: new Uniform(new Vector2(w, 0.5)),
      },
      vertexShader,
      fragmentShader,
      side: DoubleSide,
      transparent: true,
    });

    const planeMaterialH = new ShaderMaterial({
      uniforms: {
        ...this._uniforms,
        uResolution: new Uniform(new Vector2(h, 0.5)),
      },
      vertexShader,
      fragmentShader,
      side: DoubleSide,
      transparent: true,
    });

    const group = new Group();

    const top = new Mesh(planeGeometryW, planeMaterialW);
    const bottom = top.clone();
    bottom.position.z = h;
    bottom.rotation.y = -Math.PI;

    const left = new Mesh(planeGeometryH, planeMaterialH);
    left.position.x -= w / 2;
    left.position.z += h / 2;
    left.rotation.y = Math.PI / 2;

    const right = left.clone();
    right.position.x += w;
    right.rotation.y = -Math.PI / 2;

    group.add(top, bottom, left, right);

    return group;
  }

  public up() {
    this.animation?.up?.();
    this.status = true;
  }

  public down() {
    this.animation?.down?.();
    this.status = false;
  }

  public update() {
    this._uniforms.uTime.value += 0.016;
  }
}
