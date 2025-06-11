import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';

const con=document.getElementById("three");
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
loader.load(
    './3dmodels/earth.glb?v=' + Date.now(),
    function (gltf) {
        model = gltf.scene;
        model.scale.set(1.5,1.5,1.5);
        model.position.set(140,0, 0);
        scene.add(model);
    },
    undefined,
    (error) => console.error('Error loading model:', error)
);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(con.clientWidth,con.clientHeight);
document.getElementById('three').appendChild(renderer.domElement);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const topLight = new THREE.DirectionalLight(0xffffff, 3);
topLight.position.set(500, 500, 500);
scene.add(topLight);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enableZoom = false;
controls.enableRotate = false;
const thresholdY = 750; 
function onScroll() {
    const scrollY = window.scrollY;
    camera.position.z = 300 + scrollY * 0.40;

    if (model) {
        if (scrollY < thresholdY) {
            model.position.y = scrollY * -0.29;
            model.position.x = 140 + scrollY * -0.18;
        }
    }
}
window.addEventListener('scroll', onScroll);
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    if (model) model.rotation.y += 0.002;
}
animate();
window.addEventListener('resize', () => {
    camera.aspect =con.clientWidth/con.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(con.clientWidth,con.clientHeight);
});
