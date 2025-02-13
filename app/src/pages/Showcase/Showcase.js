import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

// GLB file paths
const modelPaths = [
  '/models/tripo_pbr_model_9e5ba12b-5f45-4ea3-93a3-89a18cc11e3a.glb',
  '/models/tripo_pbr_model_93406153-93cc-4fd0-89e7-6eeea79c51ea.glb',
  '/models/tripo_pbr_model_a1bb976b-f0d2-43f8-9db1-a3d57ec04bc8.glb',
  '/models/tripo_pbr_model_cbcf7196-6f2e-4405-bb82-5934fbe8fa14.glb'
];

class Showcase {
  constructor(container) {
    // Scene setup
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(this.renderer.domElement);

    // Camera position
    this.camera.position.set(0, 3, 4);
    this.camera.lookAt(0, 0, 0);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    this.scene.add(directionalLight);

    // Add hemisphere light for better ambient lighting
    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.8);
    this.scene.add(hemisphereLight);

    // Ground plane with enhanced glow
    const groundGeometry = new THREE.PlaneGeometry(50, 50);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x222222,
      emissive: 0x0088ff,
      emissiveIntensity: 0.3,
      side: THREE.DoubleSide,
      roughness: 0.5,
      metalness: 0.8
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.scene.add(ground);

    // Setup Draco loader
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');

    // Setup GLTF loader
    this.loader = new GLTFLoader();
    this.loader.setDRACOLoader(dracoLoader);

    // Initialize models array
    this.models = [];
    
    // Load models with positions
    const positions = [
      [-3, 2, 0],
      [-1, 2, 0],
      [1, 2, 0],
      [3, 2, 0]
    ];
    
    modelPaths.forEach((path, index) => {
      this.loadModel(path, ...positions[index]);
    });

    // Handle window resize
    window.addEventListener('resize', this.onWindowResize.bind(this));

    // Start animation loop
    this.animate();
  }

  loadModel(url, x, y, z) {
    this.loader.load(
      url,
      (gltf) => {
        const model = gltf.scene;
        model.position.set(x, y, z);
        model.scale.set(0.5, 0.5, 0.5);
        
        // Enable shadows for the model
        model.traverse((node) => {
          if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;
          }
        });
        
        this.scene.add(model);
        this.models.push(model);
      },
      (progress) => {
        console.log(`Loading model: ${Math.round((progress.loaded / progress.total) * 100)}%`);
      },
      (error) => {
        console.error(`Error loading model ${url}:`, error);
      }
    );
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    // Rotate models
    this.models.forEach(model => {
      if (model) {
        model.rotation.y += 0.01;
      }
    });

    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    window.removeEventListener('resize', this.onWindowResize.bind(this));
    this.renderer.dispose();
  }
}

export default Showcase;
