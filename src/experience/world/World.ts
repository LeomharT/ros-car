import { World as RapierWorld } from '@dimforge/rapier3d';
import type { Experience } from '../Experience';
import { Environment } from './Environment';
import { Floor } from './Floor';
import { ROSCar } from './ROSCar';

export class World {
  constructor(exp: Experience) {
    this._exp = exp;

    this._setupRapierWorld();
    this.floor = new Floor(this._exp);

    this._exp.resources.addEventListener('ready', () => {
      this.env = new Environment(this._exp);
      this.rosCar = new ROSCar(this._exp);
    });
  }

  private _exp: Experience;

  private world: RapierWorld;

  public floor: Floor;

  public env!: Environment;

  public rosCar!: ROSCar;

  public update() {}

  private _setupRapierWorld() {
    console.log(RapierWorld);
  }
}
