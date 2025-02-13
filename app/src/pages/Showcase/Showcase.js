import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

// GLB file paths and labels
const modelPaths = [
  '/src/assets/privacy.glb',
  '/src/assets/bias.glb',
  '/src/assets/manipulation.glb',
  '/src/assets/earth.glb'
];

const modelLabels = [
  'Privacy and security',
  'Bias',
  'Manipulation',
  'Effects on world'
];

class Showcase {
  constructor(container) {
    this.container = container;
    this.selectedModel = null;
    this.defaultCameraPosition = new THREE.Vector3(0, 2, 8);
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

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
    this.container.appendChild(this.renderer.domElement);

    // Camera position
    this.updateCameraPosition();

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

    // Handle window resize and clicks
    window.addEventListener('resize', this.onWindowResize.bind(this));
    this.renderer.domElement.addEventListener('click', this.onClick.bind(this));

    // Start animation loop
    this.animate();
  }

  updateCameraPosition(target) {
    const isMobile = window.innerWidth <= 768;
    const currentPos = this.camera.position.clone();
    const currentTarget = new THREE.Vector3(0, 0.4, 0);
    
    if (target) {
      // Zoom to model
      const offset = new THREE.Vector3(0, 0.8, 2);
      const newPos = target.position.clone().add(offset);
      this.animateCamera(currentPos, newPos, target.position);
    } else {
      // Reset to default view
      const defaultPos = isMobile ? 
        new THREE.Vector3(0, 4, 6) : 
        this.defaultCameraPosition.clone();
      this.animateCamera(currentPos, defaultPos, currentTarget);
    }
  }

  animateCamera(startPos, endPos, lookAt) {
    const duration = 1000; // 1 second
    const startTime = Date.now();
    
    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease in-out function
      const eased = progress < 0.5 ? 
        2 * progress * progress : 
        -1 + (4 - 2 * progress) * progress;
      
      // Interpolate position
      this.camera.position.lerpVectors(startPos, endPos, eased);
      this.camera.lookAt(lookAt);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    animate();
  }

  onClick(event) {
    console.log('Canvas clicked', event);
    // Calculate mouse position in normalized device coordinates
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    // Update the picking ray with the camera and mouse position
    this.raycaster.setFromCamera(this.mouse, this.camera);

    // Get all meshes from models for intersection testing
    const meshes = [];
    this.models.forEach(model => {
      model.traverse(child => {
        if (child.isMesh) {
          meshes.push(child);
        }
      });
    });

    // Calculate objects intersecting the picking ray
    const intersects = this.raycaster.intersectObjects(meshes, false);

    if (intersects.length > 0 && !this.selectedModel) {
      // Find the root model object
      let modelRoot = intersects[0].object;
      while (modelRoot.parent && !this.models.includes(modelRoot)) {
        modelRoot = modelRoot.parent;
      }
      if (this.models.includes(modelRoot)) {
        console.log('Model clicked:', modelRoot);
        this.selectedModel = modelRoot;
        this.updateCameraPosition(modelRoot);
      }
    } else {
      // Reset view
      this.selectedModel = null;
      this.updateCameraPosition(null);
    }
  }

  updateModelPositions() {
    const isMobile = window.innerWidth <= 768;
    
    this.positions = isMobile ? [
      [-1.5, 0.4, -1],
      [1.5, 0.4, -1],
      [-1.5, 0.4, 1],
      [1.5, 0.4, 1]
    ] : [
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
  }

  createTextSprite(text) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 256;
    canvas.height = 128;
    
    context.font = 'bold 24px Arial';
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
    sprite.scale.set(2, 1, 1);
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
    // Only update positions if not zoomed into a model
    if (!this.selectedModel) {
      this.updateModelPositions();
      this.updateCameraPosition(null);
    }
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    // Rotate models
    this.models.forEach(model => {
      if (model && (!this.selectedModel || model === this.selectedModel)) {
        model.rotation.y += 0.01;
      }
    });

    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    window.removeEventListener('resize', this.onWindowResize.bind(this));
    this.container.removeEventListener('click', this.onClick.bind(this));
    this.renderer.domElement.removeEventListener('click', this.onClick.bind(this));
    this.renderer.dispose();
  }
}

export default Showcase;
