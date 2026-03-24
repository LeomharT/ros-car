import { AxesHelper, Scene } from 'three';
import Camera from './Camera';
import Renderer from './Renderer';
import { Debug } from './Ui/Debug';
import Sizes from './Utils/Sizes';
import Time from './Utils/Time';

export class Experience {
  constructor() {
    this.time = new Time();
    this.debug = new Debug();
    this.sizes = new Sizes();
    this.scene = new Scene();

    this.renderer = new Renderer(this);
    this.canvas = this.renderer.instance.domElement;
    this.camera = new Camera(this);

    // Event
    this.time.addEventListener('tick', this.update);

    this.scene.add(new AxesHelper());
  }

  public time: Time;

  public debug: Debug;

  public sizes: Sizes;

  public scene: Scene;

  public renderer: Renderer;

  public camera: Camera;

  public canvas: HTMLCanvasElement;

  public update = () => {
    this.debug.fpsGraph.begin();

    this.camera.update(this.time.delta);
    this.renderer.render();

    this.debug.fpsGraph.end();
  };

  private static _singleInstance: Experience;

  public static getInstance(): Experience {
    if (this._singleInstance) return this._singleInstance;
    return (this._singleInstance = new Experience());
  }
}
