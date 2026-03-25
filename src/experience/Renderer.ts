import {
  ACESFilmicToneMapping,
  AgXToneMapping,
  CineonToneMapping,
  CustomToneMapping,
  LinearToneMapping,
  NeutralToneMapping,
  NoToneMapping,
  PCFSoftShadowMap,
  ReinhardToneMapping,
  SRGBColorSpace,
  WebGLRenderer,
} from 'three';
import type { Experience } from './Experience';

export default class Renderer {
  constructor(exp: Experience) {
    this._exp = exp;

    this.instance = this._setupInstance();
    this._debugPane();
  }

  private _exp: Experience;

  public instance: WebGLRenderer;

  private _setupInstance(): WebGLRenderer {
    const renderer = new WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.outputColorSpace = SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;
    renderer.setSize(this._exp.sizes.width, this._exp.sizes.height);
    renderer.setPixelRatio(this._exp.sizes.pixelRatio);

    return renderer;
  }

  private _debugPane() {
    const pane = this._exp.debug.pane.addFolder({ title: '🎨 Renderer' });
    pane.addBinding(this.instance.info.render, 'triangles', {
      readonly: true,
    });
    pane.addBinding(this.instance, 'toneMapping', {
      options: {
        NoToneMapping: NoToneMapping,
        LinearToneMapping: LinearToneMapping,
        ReinhardToneMapping: ReinhardToneMapping,
        CineonToneMapping: CineonToneMapping,
        ACESFilmicToneMapping: ACESFilmicToneMapping,
        CustomToneMapping: CustomToneMapping,
        AgXToneMapping: AgXToneMapping,
        NeutralToneMapping: NeutralToneMapping,
      },
    });
    pane.addBinding(this.instance, 'toneMappingExposure', {
      step: 0.001,
      max: 5.0,
      min: 1.0,
    });
  }

  public render() {
    this.instance.render(this._exp.scene, this._exp.camera.instance);
  }

  public resize() {
    this.instance.setSize(this._exp.sizes.width, this._exp.sizes.height);
  }
}
