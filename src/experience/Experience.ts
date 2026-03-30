import { AxesHelper, Color, Scene } from 'three';
import Camera from './Camera';
import Renderer from './Renderer';
import { Debug } from './ui/Debug';
import Resources from './utils/Resources';
import Sizes from './utils/Sizes';
import Time from './utils/Time';
import { PhysicWorld } from './world/PhysicWorld';
import { World } from './world/World';

export class Experience {
  constructor() {
    this.time = new Time();
    this.debug = new Debug();
    this.sizes = new Sizes();
    this.resources = new Resources();

    this.scene = new Scene();
    this.scene.background = new Color('#000');

    this.renderer = new Renderer(this);
    this.canvas = this.renderer.instance.domElement;
    this.camera = new Camera(this);
    this.physicWorld = new PhysicWorld(this);
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

  public resources: Resources;

  public physicWorld: PhysicWorld;

  public world: World;

  public update = () => {
    this.debug.fpsGraph.begin();

    // Phycis Update
    this.physicWorld.update();

    // Render
    this.renderer.render();

    // Update
    this.camera.update(this.time.delta);

    // World update
    this.world.update();

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
