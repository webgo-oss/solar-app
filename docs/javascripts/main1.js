import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';
import { MeshoptDecoder } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/libs/meshopt_decoder.module.js';

const merquery = document.getElementById('merquery');

const camera = new THREE.PerspectiveCamera(
  75,
  merquery.clientWidth / merquery.clientHeight,
  0.1,
  2000
);
camera.position.z = 250;

const scene = new THREE.Scene();
let merquerymodel;

const loader = new GLTFLoader();
loader.setMeshoptDecoder(MeshoptDecoder); 

loader.load(
  './3dmodels/mercury-v1.glb',
  function (gltf) {
    merquerymodel = gltf.scene;
    merquerymodel.scale.set(1, 1, 1);
    merquerymodel.position.set(1, 1, 1);
    scene.add(merquerymodel);
  },
  undefined,
  (error) => console.log('Error loading the model:', error)
);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(merquery.clientWidth, merquery.clientHeight);
merquery.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const topLight = new THREE.DirectionalLight(0xffffff, 3);
topLight.position.set(100, 100, 100);
scene.add(topLight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.enableRotate = false;

function loop() {
  requestAnimationFrame(loop);
  renderer.render(scene, camera);
  if (merquerymodel) merquerymodel.rotation.y += 0.004;
}
loop();

window.addEventListener('resize', () => {
  camera.aspect = merquery.clientWidth / merquery.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(merquery.clientWidth, merquery.clientHeight);
});
