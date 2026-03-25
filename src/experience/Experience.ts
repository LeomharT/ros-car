import { AxesHelper, Color, FogExp2, Scene } from 'three';
import Camera from './Camera';
import Renderer from './Renderer';
import { Debug } from './Ui/Debug';
import Sizes from './Utils/Sizes';
import Time from './Utils/Time';
import { World } from './World/World';

export class Experience {
  constructor() {
    this.time = new Time();
    this.debug = new Debug();
    this.sizes = new Sizes();

    const fog = new FogExp2(new Color('#000'), 0.08);
    this.scene = new Scene();
    this.scene.background = fog.color;
    this.scene.fog = fog;

    this.renderer = new Renderer(this);
    this.canvas = this.renderer.instance.domElement;
    this.camera = new Camera(this);
    this.world = new World(this);

    // Events
    this.time.addEventListener('tick', this.update);
    this.sizes.addEventListener('resize', this.resize);

    this.scene.add(new AxesHelper());
  }

  public time: Time;

  public debug: Debug;

  public sizes: Sizes;

  public scene: Scene;

  public renderer: Renderer;

  public camera: Camera;

  public canvas: HTMLCanvasElement;

  public world: World;

  public update = () => {
    this.debug.fpsGraph.begin();

    this.camera.update(this.time.delta);
    this.renderer.render();

    this.debug.fpsGraph.end();
  };

  public resize = () => {
    this.renderer.resize();
    this.camera.resize();
  };

  private static _singleInstance: Experience;

  public static getInstance(): Experience {
    if (this._singleInstance) return this._singleInstance;
    return (this._singleInstance = new Experience());
  }
}
