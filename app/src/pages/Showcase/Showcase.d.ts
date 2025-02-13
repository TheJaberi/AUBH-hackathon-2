import { Scene, PerspectiveCamera, WebGLRenderer, CircleGeometry, Material } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

declare class Showcase {
  constructor(container: HTMLDivElement);
  dispose(): void;
  private scene: Scene;
  private camera: PerspectiveCamera;
  private renderer: WebGLRenderer;
  private loader: GLTFLoader;
  private models: THREE.Object3D[];
  private glowGeometry: CircleGeometry;
  private glowMaterial: Material;
  private loadModel(url: string, x: number, y: number, z: number): void;
  private onWindowResize(): void;
  private animate(): void;
}

export default Showcase;
