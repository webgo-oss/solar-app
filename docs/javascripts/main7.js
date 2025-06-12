import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';
import { MeshoptDecoder } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/libs/meshopt_decoder.module.js';

const urans=document.getElementById('pluto');
const camera=new THREE.PerspectiveCamera(
    75,
    pluto.clientWidth/pluto.clientHeight,
    0.1,
    2000
);
camera.position.z=5;
const scene=new THREE.Scene();
let plutomodel;
const loader=new GLTFLoader();
loader.setMeshoptDecoder(MeshoptDecoder); 
loader.load(
    './3dmodels/pluton-v1.glb',
    function(gltf){
        plutomodel=gltf.scene;
        plutomodel.scale.set(1.5,1.5,1.5);
        plutomodel.position.set(0,0,0);
        scene.add(plutomodel);
    },
    undefined,
    (error)=> console.log('error loading the model',error)
);
const renderer=new THREE.WebGLRenderer({alpha:true});
renderer.setSize(pluto.clientWidth,pluto.clientHeight);
pluto.appendChild(renderer.domElement);
const ambientLight=new THREE.AmbientLight(0xffffff,0.9);
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
 if(plutomodel) plutomodel.rotation.y+=0.004;
}
loop();
window.addEventListener('resize',function(){
    camera.aspect=pluto.clientWidth/pluto.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(pluto.clientWidth,pluto.clientHeight);
});

