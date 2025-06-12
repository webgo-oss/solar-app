import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';
import { MeshoptDecoder } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/libs/meshopt_decoder.module.js';

const naptune=document.getElementById('naptune');
const camera=new THREE.PerspectiveCamera(
    75,
    naptune.clientWidth/naptune.clientHeight,
    0.1,
    2000
);
camera.position.z=8;
const scene=new THREE.Scene();
let naptunemodel;
const loader=new GLTFLoader();
loader.setMeshoptDecoder(MeshoptDecoder); 
loader.load(
    './3dmodels/Neptune-v1.glb',
    function(gltf){
        naptunemodel=gltf.scene;
        naptunemodel.scale.set(1,1,1);
        naptunemodel.position.set(0,-6,0);
        scene.add(naptunemodel);
    },
    undefined,
    (error)=> console.log('error loading the model',error)
);
const renderer=new THREE.WebGLRenderer({alpha:true});
renderer.setSize(naptune.clientWidth,naptune.clientHeight);
naptune.appendChild(renderer.domElement);
const ambientLight=new THREE.AmbientLight(0xffffff,0.9);
scene.add(ambientLight);
const topLight=new THREE.DirectionalLight(0xffffff,0.001);
topLight.position.set(500,100,100);
scene.add(topLight);
const controls=new OrbitControls(camera,renderer.domElement);
controls.enableDamping=true;
controls.enableZoom=false;
controls.enableRotate=false;
function loop(){
    requestAnimationFrame(loop);
    renderer.render(scene,camera);
 if(naptunemodel) naptunemodel.rotation.y+=0.004;
}
loop();
window.addEventListener('resize',function(){
    camera.aspect=naptune.clientWidth/naptune.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(naptune.clientWidth,naptune.clientHeight);
});

