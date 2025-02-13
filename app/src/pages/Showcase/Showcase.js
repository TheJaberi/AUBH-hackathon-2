import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

// GLB file paths and labels
const modelPaths = [
  '/models/tripo_pbr_model_9e5ba12b-5f45-4ea3-93a3-89a18cc11e3a.glb',
  '/models/tripo_pbr_model_93406153-93cc-4fd0-89e7-6eeea79c51ea.glb',
  '/models/tripo_pbr_model_a1bb976b-f0d2-43f8-9db1-a3d57ec04bc8.glb',
  '/models/tripo_pbr_model_cbcf7196-6f2e-4405-bb82-5934fbe8fa14.glb'
];

const modelLabels = [
  'Privacy and security',
  'Bias',
  'Manipulation',
  'Effects on world'
];

class Showcase {
  constructor(container) {
    // Scene setup
    this.scene = new THREE.Scene();
    
    // Add sky dome with gradient
    const skyGeometry = new THREE.SphereGeometry(100, 32, 32);
    const skyMaterial = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      uniforms: {
        topColor: { value: new THREE.Color(0x222244) },
        bottomColor: { value: new THREE.Color(0x000022) }
      },
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 topColor;
        uniform vec3 bottomColor;
        varying vec3 vWorldPosition;
        void main() {
          float h = normalize(vWorldPosition).y;
          gl_FragColor = vec4(mix(bottomColor, topColor, max(h, 0.0)), 1.0);
        }
      `
    });
    const sky = new THREE.Mesh(skyGeometry, skyMaterial);
    this.scene.add(sky);
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
    this.camera.position.set(0, 2, 4);
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

    // Ground plane with grey color
    const groundGeometry = new THREE.PlaneGeometry(50, 50);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x808080,
      side: THREE.DoubleSide,
      roughness: 0.8,
      metalness: 0.2
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.scene.add(ground);

    // Create purple glow disc geometry and material
    this.glowGeometry = new THREE.CircleGeometry(1, 32);
    this.glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x800080,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide
    });

    // Setup Draco loader
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');

    // Setup GLTF loader
    this.loader = new GLTFLoader();
    this.loader.setDRACOLoader(dracoLoader);

    // Initialize models array
    this.models = [];
    this.updateModelPositions();

    // Load models
    modelPaths.forEach((path, index) => {
      this.loadModel(path, index);
    });

    // Handle window resize
    window.addEventListener('resize', this.onWindowResize.bind(this));

    // Start animation loop
    this.animate();
  }

  updateModelPositions() {
    const isMobile = window.innerWidth <= 768;
    
    this.positions = isMobile ? [
      // Mobile layout: 2x2 grid with less spread
      [-1.5, 0.4, -1],
      [1.5, 0.4, -1],
      [-1.5, 0.4, 2],
      [1.5, 0.4, 2]
    ] : [
      // Desktop layout: single row
      [-6, 0.4, 0],
      [-2, 0.4, 0],
      [2, 0.4, 0],
      [6, 0.4, 0]
    ];

    // Update existing models if they exist
    this.models.forEach((model, index) => {
      if (model) {
        const [x, y, z] = this.positions[index];
        model.position.set(x, y, z);
      }
    });

    // Update camera position based on layout
    if (isMobile) {
      this.camera.position.set(0, 4, 6);
    } else {
      this.camera.position.set(0, 2, 8);
    }
    this.camera.lookAt(0, 0.4, 0);
  }

  createTextSprite(text) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 256;
    canvas.height = 128;

    context.fillStyle = '#000000';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    context.font = 'bold 36px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    
    // Create gradient
    const gradient = context.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, '#ff00ff');
    gradient.addColorStop(1, '#00ffff');
    context.fillStyle = gradient;
    
    context.fillText(text, canvas.width / 2, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    const spriteMaterial = new THREE.SpriteMaterial({ 
      map: texture,
      transparent: true
    });
    
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(3, 1.5, 1);
    return sprite;
  }

  loadModel(url, index) {
    const [x, y, z] = this.positions[index];
    const label = modelLabels[index];
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
        
        // Add purple glow disc under the model
        const glowDisc = new THREE.Mesh(this.glowGeometry, this.glowMaterial);
        glowDisc.rotation.x = -Math.PI / 2;
        glowDisc.position.set(x, 0.01, z); // Slightly above ground
        this.scene.add(glowDisc);
        
        // Create and position text label
        const textSprite = this.createTextSprite(label);
        textSprite.position.set(x, y + 1.5, z); // Position above model
        this.scene.add(textSprite);

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
    this.updateModelPositions();
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
