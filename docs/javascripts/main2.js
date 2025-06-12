import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';
import { MeshoptDecoder } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/libs/meshopt_decoder.module.js';

const mars = document.getElementById('mars');

const camera = new THREE.PerspectiveCamera(
  75,
  mars.clientWidth / mars.clientHeight,
  0.1,
  2000
);
camera.position.z = 16;

const scene = new THREE.Scene();
let marsmodel;

const loader = new GLTFLoader();
loader.setMeshoptDecoder(MeshoptDecoder); 

loader.load(
  './3dmodels/mars-v1.glb', 
  function (gltf) {
    marsmodel = gltf.scene;
    marsmodel.scale.set(1, 1, 1);
    marsmodel.position.set(0, 0, 0);
    scene.add(marsmodel);
  },
  undefined,
  (error) => console.log('Error loading the model:', error)
);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(mars.clientWidth, mars.clientHeight);
mars.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const topLight = new THREE.DirectionalLight(0xffffff, 3);
topLight.position.set(100, 100, 100);
scene.add(topLight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.enableRotate = false;
controls.autoRotate = true;

function loop() {
  requestAnimationFrame(loop);
  controls.update();
  renderer.render(scene, camera);
}
loop();

window.addEventListener('resize', function () {
  camera.aspect = mars.clientWidth / mars.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(mars.clientWidth, mars.clientHeight);
});
