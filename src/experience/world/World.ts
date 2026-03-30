import type { Experience } from '../Experience';
import { Car } from './Car';
import { Environment } from './Environment';
import { Floor } from './Floor';
import { Sandbox } from './Sandbox';

export class World {
  constructor(exp: Experience) {
    this._exp = exp;

    this.floor = new Floor(this._exp);

    this._exp.resources.addEventListener('ready', () => {
      this.env = new Environment(this._exp);
      this.car = new Car(this._exp);
      this.sandbox = new Sandbox(this._exp);
    });
  }

  private _exp: Experience;

  public floor: Floor;

  public env!: Environment;

  public car!: Car;

  public sandbox!: Sandbox;

  public update() {
    this.car?.update();
    this.sandbox?.update();
  }
}
