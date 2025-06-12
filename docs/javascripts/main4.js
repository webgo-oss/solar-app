import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';
import { MeshoptDecoder } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/libs/meshopt_decoder.module.js';

const saturn=document.getElementById('saturn');
const camera=new THREE.PerspectiveCamera(
    75,
    saturn.clientWidth/saturn.clientHeight,
    0.1,
    2000
);
camera.position.z=5;
const scene=new THREE.Scene();
let saturnmodel;
const loader=new GLTFLoader();
loader.setMeshoptDecoder(MeshoptDecoder); 
loader.load(
    './3dmodels/saturn_planet-v1.glb',
    function(gltf){
        saturnmodel=gltf.scene;
        saturnmodel.scale.set(1.4,1.4,1.4);
        saturnmodel.position.set(0,0,0);
        saturnmodel.rotation.set(0.2,0,0.1);
        scene.add(saturnmodel);
    },
    undefined,
    (error)=> console.log('error loading the model',error)
);
const renderer=new THREE.WebGLRenderer({alpha:true});
renderer.setSize(saturn.clientWidth,saturn.clientHeight);
saturn.appendChild(renderer.domElement);
const ambientLight=new THREE.AmbientLight(0xffffff,0.1);
scene.add(ambientLight);
const topLight=new THREE.DirectionalLight(0xffffff,1);
topLight.position.set(100,100,100);
scene.add(topLight);
const controls=new OrbitControls(camera,renderer.domElement);
controls.enableDamping=true;
controls.enableZoom=false;
controls.enableRotate=false;
function loop(){
    requestAnimationFrame(loop);
    renderer.render(scene,camera);
 if(saturnmodel) saturnmodel.rotation.y+=0.004;
}
loop();
window.addEventListener('resize',function(){
    camera.aspect=saturn.clientWidth/saturn.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(saturn.clientWidth,saturn.clientHeight);
});

