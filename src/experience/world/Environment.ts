import { Color, EquirectangularReflectionMapping, FogExp2 } from 'three';
import type { Experience } from '../Experience';

export class Environment {
  constructor(exp: Experience) {
    this._exp = exp;
    this._setupFog();
    this._setupEnvironmentMap();
    this._debugPane();
  }

  private _exp: Experience;

  private _setupEnvironmentMap() {
    const env = this._exp.resources.items.environment;
    env.mapping = EquirectangularReflectionMapping;

    this._exp.scene.environment = env;
  }

  private _setupFog() {
    const fog = new FogExp2(new Color('#000'), 0.02);
    this._exp.scene.fog = fog;
  }

  public _debugPane() {
    const pane = this._exp.debug.pane.addFolder({ title: '🏞️ Environment' });
    if (this._exp.scene.fog instanceof FogExp2) {
      pane.addBinding(this._exp.scene.fog, 'density', {
        min: 0,
        max: 0.5,
        step: 0.001,
      });
    }
  }
}
