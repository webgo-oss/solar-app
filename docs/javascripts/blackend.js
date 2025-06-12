import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';
import { MeshoptDecoder } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/libs/meshopt_decoder.module.js';

const con = document.getElementById("blackhole");

const camera = new THREE.PerspectiveCamera(
  75,
  con.clientWidth / con.clientHeight,
  0.1,
  2000
);
camera.position.set(0, 0, 50);

const scene = new THREE.Scene();

let model, mixer;

const loader = new GLTFLoader();
loader.setMeshoptDecoder(MeshoptDecoder); 

loader.load(
  './3dmodels/blackhole-v2.glb',
  function (gltf) {
    model = gltf.scene;
    model.scale.set(2, 2, 2);
    model.position.set(0, -0.5, 0);
    model.rotation.set(0.02, 0, 0);
    scene.add(model);
    if (gltf.animations.length > 0) {
      mixer = new THREE.AnimationMixer(model);
      gltf.animations.forEach((clip) => {
        mixer.clipAction(clip).play();
      });
    }
  },
  undefined,
  (error) => console.error('Error loading model:', error)
);

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(con.clientWidth, con.clientHeight);
con.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight("#db904e", 5);
scene.add(ambientLight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enableRotate = false;
controls.enableZoom = false;

function onScroll() {
  const scrollY = window.scrollY;
  const minCameraZ = 0;
  const maxCameraZ = 50;
  const slowFactor = 220;
  const cameraZ = maxCameraZ - (scrollY / slowFactor);
  camera.position.z = Math.max(minCameraZ, Math.min(maxCameraZ, cameraZ));
}

window.addEventListener('scroll', onScroll);

function animate() {
  requestAnimationFrame(animate);
  if (mixer) mixer.update(0.01);
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = con.clientWidth / con.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(con.clientWidth, con.clientHeight);
});
