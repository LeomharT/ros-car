import { EventDispatcher, Timer } from 'three';

export default class Time extends EventDispatcher<{
  tick: {};
}> {
  constructor() {
    super();

    this._timer = new Timer();

    // Wait one frame
    requestAnimationFrame(() => {
      this.tick();
    });
  }

  private _timer: Timer;

  get elapsed() {
    return this._timer.getElapsed();
  }

  get delta() {
    return this._timer.getDelta();
  }

  public tick() {
    // Update
    this._timer.update();

    this.dispatchEvent({ type: 'tick' });

    // Animation
    requestAnimationFrame(() => {
      this.tick();
    });
  }
}
