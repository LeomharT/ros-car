export class KeyboardControls {
  constructor() {
    window.addEventListener('keydown', this._onDocumentKey);
    window.addEventListener('keyup', this._onDocumentKey);
  }

  public keyMap: { [key: string]: boolean } = {};

  private _onDocumentKey = (e: KeyboardEvent) => {
    this.keyMap[e.code] = e.type === 'keydown';
  };
}
