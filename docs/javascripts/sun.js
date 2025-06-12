import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';
import { MeshoptDecoder } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/libs/meshopt_decoder.module.js';

const sun=document.getElementById('sun');
const camera=new THREE.PerspectiveCamera(
    75,
    sun.clientWidth/sun.clientHeight,
    0.1,
    2000
);
camera.position.z=8;
const scene=new THREE.Scene();
let sunmodel;
const loader=new GLTFLoader();
loader.setMeshoptDecoder(MeshoptDecoder); 
loader.load(
    './3dmodels/starcelestial_objectsun-v1.glb',
    function(gltf){
        sunmodel=gltf.scene;
        sunmodel.scale.set(4,4,4);
        sunmodel.position.set(0,0,0);
        scene.add(sunmodel);
    },
    undefined,
    (error)=> console.log('error loading the model',error)
);
const renderer=new THREE.WebGLRenderer({alpha:true});
renderer.setSize(sun.clientWidth,sun.clientHeight);
sun.appendChild(renderer.domElement);
const ambientLight=new THREE.AmbientLight(0xffffff,5);
scene.add(ambientLight);
const topLight=new THREE.DirectionalLight(0xffffff,2);
topLight.position.set(500,100,100);
scene.add(topLight);
const controls=new OrbitControls(camera,renderer.domElement);
controls.enableDamping=true;
controls.enableZoom=false;
controls.enableRotate=false;
function loop(){
    requestAnimationFrame(loop);
    renderer.render(scene,camera);
 if(sunmodel) sunmodel.rotation.y+=0.001;
}
loop();
window.addEventListener('resize',function(){
    camera.aspect=sun.clientWidth/sun.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(sun.clientWidth,sun.clientHeight);
});

