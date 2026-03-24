import * as EssentialsPlugin from '@tweakpane/plugin-essentials';
import { Pane } from 'tweakpane';

export class Debug {
  constructor() {
    this.pane = this._setupInstance();
    this.fpsGraph = this._setFPSGraph();
  }

  public pane: Pane;

  public fpsGraph: any;

  private _setupInstance() {
    const pane = new Pane({ title: 'Debug Pane' });
    pane.element.parentElement!.style.width = '380px';
    pane.registerPlugin(EssentialsPlugin);

    return pane;
  }

  private _setFPSGraph() {
    const fpsGraph = this.pane.addBlade({
      view: 'fpsgraph',
      label: undefined,
      rows: 4,
    });

    return fpsGraph;
  }
}
