import type { Experience } from '../Experience';
import { Environment } from './Environment';
import { Floor } from './Floor';
import { ROSCar } from './ROSCar';

export class World {
  constructor(exp: Experience) {
    this._exp = exp;

    this.floor = new Floor(this._exp);

    this._exp.resources.addEventListener('ready', () => {
      this.env = new Environment(this._exp);
      this.rosCar = new ROSCar(this._exp);
    });
  }

  private _exp: Experience;

  public floor: Floor;

  public env!: Environment;

  public rosCar!: ROSCar;

  public update() {
    if (this.rosCar) {
      this.rosCar.update();
    }
  }
}
