import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';
import { MeshoptDecoder } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/libs/meshopt_decoder.module.js';

const con = document.getElementById("three");

const camera = new THREE.PerspectiveCamera(
  75,
  con.clientWidth / con.clientHeight,
  0.1,
  2000
);
camera.position.set(0, 0, 300);

const scene = new THREE.Scene();
let model;

const loader = new GLTFLoader();
loader.setMeshoptDecoder(MeshoptDecoder);
setTimeout(() => {
  loader.load(
    './3dmodels/earth-v1.glb?' + Date.now(),
    function (gltf) {
      model = gltf.scene;
      model.scale.set(1.5, 1.5, 1.5);
      model.position.set(140, 0, 0);
      scene.add(model);
    },
    undefined,
    (error) => console.error('Error loading model:', error)
  );
}, 100);

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(con.clientWidth, con.clientHeight);
if (/Mobi|Android/i.test(navigator.userAgent)) {
  renderer.setPixelRatio(0.8);
} else {
  renderer.setPixelRatio(window.devicePixelRatio);
}

renderer.shadowMap.enabled = false;
con.appendChild(renderer.domElement);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const topLight = new THREE.DirectionalLight(0xffffff, 2.5);
topLight.position.set(500, 500, 500);
scene.add(topLight);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enableZoom = false;
controls.enableRotate = false;

const thresholdY = 750;
let ticking = false;
function onScroll() {
  if (!ticking) {
    requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      camera.position.z = 300 + scrollY * 0.4;

      if (model && scrollY < thresholdY) {
        model.position.y = scrollY * -0.29;
        model.position.x = 140 + scrollY * -0.18;
      }

      ticking = false;
    });
    ticking = true;
  }
}
window.addEventListener('scroll', onScroll);
function animate() {
  requestAnimationFrame(animate);
  if (model) model.rotation.y += 0.002;
  controls.update();
  renderer.render(scene, camera);
}
animate();
window.addEventListener('resize', () => {
  camera.aspect = con.clientWidth / con.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(con.clientWidth, con.clientHeight);
});
