import * as EssentialsPlugin from '@tweakpane/plugin-essentials';
import { Pane } from 'tweakpane';

export class Debug {
  constructor() {
    this.debugging = window.location.hash === '#debug';
    this.pane = this._setupInstance();
    this.fpsGraph = this._setFPSGraph();
  }

  public pane: Pane;

  public fpsGraph: any;

  public debugging: boolean;

  private _setupInstance() {
    const pane = new Pane({ title: 'Debug Pane' });
    pane.element.parentElement!.style.width = '380px';
    pane.element.parentElement!.style.userSelect = 'none';
    pane.hidden = !this.debugging;
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
