import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';
import { MeshoptDecoder } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/libs/meshopt_decoder.module.js';

const models = [
  {
    id: 'merquery',
    path: './3dmodels/mercury-v1.glb',
    scale: [1, 1, 1],
    position: [1, 1, 1],
    cameraZ: 250,
    lights: {
      ambient: [0xffffff, 0.5],
      directional: [0xffffff, 3, [100, 100, 100]]
    }
  },
  {
    id: 'mars',
    path: './3dmodels/mars-v1.glb',
    scale: [1, 1, 1],
    position: [0, 0, 0],
    cameraZ: 16,
    lights: {
      ambient: [0xffffff, 0.5],
      directional: [0xffffff, 3, [100, 100, 100]]
    }
  },
  {
    id: 'Jupiter',
    path: './3dmodels/jupiter-v1.glb',
    scale: [2.5, 2.5, 2.5],
    position: [0, 0, 0],
    cameraZ: 5,
    lights: {
      ambient: [0xffffff, 0.1],
      directional: [0xffffff, 1, [100, 100, 100]]
    }
  },
  {
    id: 'saturn',
    path: './3dmodels/saturn_planet-v1.glb',
    scale: [1.4, 1.4, 1.4],
    position: [0, 0, 0],
    rotation: [0.2, 0, 0.1],
    cameraZ: 5,
    lights: {
      ambient: [0xffffff, 0.1],
      directional: [0xffffff, 1, [100, 100, 100]]
    }
  },
  {
    id: 'venus',
    path: './3dmodels/venus_v11-v1.glb',
    scale: [2.2, 2.2, 2.2],
    position: [0, 0, 0],
    cameraZ: 5,
    lights: {
      ambient: [0xffffff, 0.9],
      directional: [0xffffff, 0.001, [500, 100, 100]]
    }
  },
  {
    id: 'urans',
    path: './3dmodels/realistic_uranus_4k-v1.glb',
    scale: [1, 1, 1],
    position: [0, 0, 0],
    cameraZ: 1500,
    lights: {
      ambient: [0xffffff, 0.9],
      directional: [0xffffff, 0.001, [500, 100, 100]]
    }
  },
  {
    id: 'pluto',
    path: './3dmodels/pluton-v1.glb',
    scale: [1.5, 1.5, 1.5],
    position: [0, 0, 0],
    cameraZ: 5,
    lights: {
      ambient: [0xffffff, 0.9],
      directional: [0xffffff, 1, [100, 100, 100]]
    }
  },
  {
    id: 'naptune',
    path: './3dmodels/Neptune-v1.glb',
    scale: [1, 1, 1],
    position: [0, -6, 0],
    cameraZ: 8,
    lights: {
      ambient: [0xffffff, 0.9],
      directional: [0xffffff, 0.001, [500, 100, 100]]
    }
  },
  {
    id: 'sun',
    path: './3dmodels/starcelestial_objectsun-v1.glb',
    scale: [4, 4, 4],
    position: [0, 0, 0],
    cameraZ: 8,
    lights: {
      ambient: [0xffffff, 5],
      directional: [0xffffff, 2, [500, 100, 100]]
    }
  }
];

const isLowEndDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

models.forEach((modelConfig) => {
  const container = document.getElementById(modelConfig.id);
  if (!container) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 10000);
  camera.position.z = modelConfig.cameraZ;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !isLowEndDevice });
  renderer.setSize(container.clientWidth, container.clientHeight);
  if (isLowEndDevice) renderer.setPixelRatio(0.8);
  container.appendChild(renderer.domElement);

  const loader = new GLTFLoader();
  loader.setMeshoptDecoder(MeshoptDecoder); 

  loader.load(
    modelConfig.path,
    (gltf) => {
      const model = gltf.scene;
      model.scale.set(...modelConfig.scale);
      model.position.set(...modelConfig.position);
      if (modelConfig.rotation) model.rotation.set(...modelConfig.rotation);
      scene.add(model);
    },
    undefined,
    (error) => console.error('Error loading model:', error)
  );

  const ambientLight = new THREE.AmbientLight(...modelConfig.lights.ambient);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(...modelConfig.lights.directional.slice(0, 2));
  directionalLight.position.set(...modelConfig.lights.directional[2]);
  scene.add(directionalLight);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = false;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1;

  const resizeObserver = new ResizeObserver(() => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });
  resizeObserver.observe(container);

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) animate();
    },
    { threshold: 0.1 }
  );
  observer.observe(container);

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
});
