import { AxesHelper, Color, Scene } from 'three';
import Camera from './Camera';
import Renderer from './Renderer';
import { AppShell } from './ui/AppShell';
import { Debug } from './ui/Debug';
import { KeyboardControls } from './utils/KeyboardControl';
import { RaycasterServer } from './utils/RaycasterServer';
import Resources from './utils/Resources';
import Sizes from './utils/Sizes';
import Time from './utils/Time';
import { PhysicWorld } from './world/PhysicWorld';
import { World } from './world/World';

export class Experience {
  private constructor() {
    this.time = new Time();
    this.debug = new Debug();
    this.sizes = new Sizes();
    this.appShell = AppShell.getInstance();
    this.resources = new Resources();
    this.keyboardCtrl = new KeyboardControls();

    this.scene = new Scene();
    this.scene.background = new Color('#000');

    this.renderer = new Renderer(this);
    this.canvas = this.renderer.instance.domElement;
    this.camera = new Camera(this);
    this.physicWorld = new PhysicWorld(this);
    this.world = new World(this);
    this.raycasterServer = new RaycasterServer(this);

    // Events
    this.time.addEventListener('tick', this.update);
    this.sizes.addEventListener('resize', this.resize);

    this.scene.add(new AxesHelper());
  }

  public time: Time;

  public debug: Debug;

  public sizes: Sizes;

  public appShell: AppShell;

  public resources: Resources;

  public keyboardCtrl: KeyboardControls;

  public scene: Scene;

  public renderer: Renderer;

  public camera: Camera;

  public canvas: HTMLCanvasElement;

  public physicWorld: PhysicWorld;

  public world: World;

  public raycasterServer: RaycasterServer;

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
