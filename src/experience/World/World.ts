import type { Experience } from '../Experience';
import { Floor } from './Floor';

export class World {
  constructor(exp: Experience) {
    this._exp = exp;

    this.floor = new Floor(this._exp);
  }

  private _exp: Experience;

  public floor: Floor;

  public update() {}
}
