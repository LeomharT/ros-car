import { EventDispatcher, Texture, TextureLoader } from 'three';
import { DRACOLoader, GLTFLoader, HDRLoader, type GLTF } from 'three/examples/jsm/Addons.js';
import { sources } from '../data/sources';

export type ResourcesLoaders = {
  gltfLoader: GLTFLoader;
  hdrLoader: HDRLoader;
  textureLoader: TextureLoader;
};

export type ResourcesItems = {
  carModel: GLTF;
  mapModel: GLTF;
  environment: Texture;
};

export default class Resources extends EventDispatcher<{
  ready: {};
}> {
  constructor() {
    super();

    this.loaders = this._setupLoaders();
    this._startLoading();
  }

  public loaders: ResourcesLoaders;

  public items: ResourcesItems = {} as ResourcesItems;

  public toLoad: number = sources.length;

  public loaded: number = 0;

  private _setupLoaders() {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/lib/draco/');
    dracoLoader.preload();

    const gltfLoader = new GLTFLoader();
    gltfLoader.dracoLoader = dracoLoader;

    const hdrLoader = new HDRLoader();
    const textureLoader = new TextureLoader();

    return {
      gltfLoader,
      hdrLoader,
      textureLoader,
    };
  }

  private _startLoading() {
    for (const source of sources) {
      switch (source.type) {
        case 'hdrTexture': {
          this.loaders.hdrLoader.load(source.path, (data) => {
            this._sourceLoaded(source, data);
          });
          break;
        }
        case 'gltfModel': {
          this.loaders.gltfLoader.load(source.path, (data) => {
            this._sourceLoaded(source, data);
          });
          break;
        }
        default:
          break;
      }
    }
  }

  private _sourceLoaded<T extends keyof ResourcesItems>(
    source: { name: T },
    data: ResourcesItems[T],
  ) {
    this.items[source.name] = data;

    this.loaded++;

    if (this.loaded === this.toLoad) {
      this.dispatchEvent({ type: 'ready' });
    }
  }
}
