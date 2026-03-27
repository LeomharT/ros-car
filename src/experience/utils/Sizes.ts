import { EventDispatcher } from 'three';

export default class Sizes extends EventDispatcher<{
  /**
   * Window Resize Trigger
   */
  resize: {};
}> {
  constructor() {
    super();

    // Setup
    this._state = this._updateState();

    // Resize events
    window.addEventListener('resize', () => {
      this._state = this._updateState();
      this.dispatchEvent({ type: 'resize' });
    });
  }

  private _state: ReturnType<typeof this._updateState>;

  get width() {
    return this._state.width;
  }

  get height() {
    return this._state.height;
  }

  get pixelRatio() {
    return this._state.pixelRatio;
  }

  private _updateState() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      pixelRatio: Math.min(window.devicePixelRatio, 2),
    };
  }
}
