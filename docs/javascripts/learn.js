import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';

const threevalue=JSON.parse(localStorage.getItem('three'));
const con = document.getElementById("tar");
if(threevalue[4]==""||threevalue[4]==undefined||threevalue[4]==null){var modelsize=1;}else{modelsize=threevalue[4];}
if(threevalue[2]==""||threevalue[2]==undefined||threevalue[2]==null){var firstlight=0.5;}else{firstlight=threevalue[2];}
if(threevalue[3]==""||threevalue[3]==undefined||threevalue[3]==null){var secondlight=3;}else{secondlight=threevalue[3];}
if(threevalue[5]==""||threevalue[5]==undefined||threevalue[5]==null){var yposition=0;}else{yposition=threevalue[5];}
if (!con) {
    console.error("Container element not found!");
}
console.log(yposition,"threejs");
const camera = new THREE.PerspectiveCamera(
    75,
    con.clientWidth / con.clientHeight,
    0.1,
    2000
);
camera.position.z=threevalue[1];

const scene = new THREE.Scene();
let model;

const loader = new GLTFLoader();
loader.load(
    threevalue[0],
    function (gltf) {
        model = gltf.scene;
        model.scale.set(modelsize,modelsize,modelsize);
        model.position.x=0;
        model.position.y=yposition;
        model.position.z=0;
        scene.add(model);
    },
    undefined,
    (error) => console.error('Error loading model:', error)
);

const renderer = new THREE.WebGLRenderer({alpha:true});
renderer.setSize(con.clientWidth, con.clientHeight);
// renderer.outputEncoding = THREE.sRGBEncoding; // Improved color rendering
con.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, firstlight);
scene.add(ambientLight);

const topLight = new THREE.DirectionalLight(0xffffff, secondlight);
topLight.position.set(500, 500, 500);
scene.add(topLight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    model.rotation.y+=0.001;
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = con.clientWidth / con.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(con.clientWidth, con.clientHeight);
});
