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
  constructor(experience: Experience) {
    this._experience = experience;

    this.instance = this._setupInstance();
    this._debugPane();
  }

  private _experience: Experience;

  public instance: WebGLRenderer;

  private _setupInstance(): WebGLRenderer {
    const renderer = new WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.toneMapping = CineonToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.outputColorSpace = SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;
    renderer.setClearColor('#211D20');
    renderer.setSize(this._experience.sizes.width, this._experience.sizes.height);
    renderer.setPixelRatio(this._experience.sizes.pixelRatio);

    return renderer;
  }

  private _debugPane() {
    const pane = this._experience.debug.pane.addFolder({ title: '🎨 Renderer' });
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
    this.instance.render(this._experience.scene, this._experience.camera.instance);
  }

  public resize() {
    this.instance.setSize(this._experience.sizes.width, this._experience.sizes.height);
  }
}
