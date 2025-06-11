
import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { gsap } from 'https://cdn.skypack.dev/gsap';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';


const camera = new THREE.PerspectiveCamera(
    10,
    window.innerWidth / window.innerHeight,
    0.1,
    10000
);
const material = new THREE.MeshStandardMaterial({
    color: 0x00aaff,
    emissive: 0x111111, 
    metalness: 0.1,
    roughness: 0.5
  });
  material.emissive = new THREE.Color(0x333333); 
material.emissiveIntensity = 7;
camera.position.z = 100;
const scene = new THREE.Scene();
// scene.background=new THREE.Color("white");
let bee;
let mixer;
const loader = new GLTFLoader();
loader.load('./3dmodels/fortnite_ufo_free_download_by_dawoods_world.glb',
    function (gltf) {
        bee = gltf.scene;
        bee.scale.set(1,1,1);
        bee.position.set(-25,2,0);
        scene.add(bee);

        // mixer = new THREE.AnimationMixer(bee);
        // mixer.clipAction(gltf.animations[1]).play();
        modelMove();
    },
    // function (xhr) {},
    // function (error) {}
);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const topLight = new THREE.DirectionalLight(0xffffff, 2);
topLight.position.set(500, 500, 500);
scene.add(topLight);

const controls=new OrbitControls(camera,renderer.domElement);
controls.enableDamping=true;
controls.enableZoom=true;
const reRender3D = () => {
    requestAnimationFrame(reRender3D);
    renderer.render(scene, camera);
    if(mixer) mixer.update(0.01);
};
reRender3D();

const modelMove = () => {
    let new_coordinates=[ { 
        position: { x: 30, y: -3, z:200},
        rotation: { x:0, y:-1, z: 0}
    },
    { position: { x: 10, y:-3, z: 0},
    rotation: { x: 0, y: 0, z: 0},
        },
    // {
    //     position:{x:-6,y:4,z:0},
    //     rotation:{x:1.5,y:-2,z:0}
    // },
    // {
    //     position:{x:-1.5,y:-0.5,z:0},
    //     rotation:{x:0.5,y:0,z:0}  
    // }
];
    gsap.to(bee.position, {
        x: new_coordinates[0].position.x,
        y: new_coordinates[0].position.y,
        z: new_coordinates[0].position.z,
        duration:50,
        ease: "power1.out",
        onComplete: () => {
            gsap.to(bee.position, {
                x: new_coordinates[1].position.x,
                y: new_coordinates[1].position.y,
                z: new_coordinates[1].position.z,
                duration: 20,
                ease: "power1.out",
        //           onComplete: () =>{
        //             gsap.to(bee.position,{
        //                 x: new_coordinates[2].position.x,
        //                 y: new_coordinates[2].position.y,
        //                 z: new_coordinates[2].position.z,
        //                 duration: 30,
        //                 ease: "power1.out", 
        //                 onComplete: ()=> {
        //                     gsap.to(bee.position,{
        //                         x: new_coordinates[3].position.x,
        //                         y: new_coordinates[3].position.y,
        //                         z: new_coordinates[3].position.z,
        //                         duration: 30,
        //                         ease: "power1.out", 
        //                     })
        //                     gsap.to(bee.rotation,{
        //                         x: new_coordinates[3].rotation.x,
        //                         y: new_coordinates[3].rotation.y,
        //                         z: new_coordinates[3].rotation.z,
        //                         duration: 10,
        //                         ease: "power1.out", 
        //                     })
        //                 }
        //             })
        //             gsap.to(bee.rotation,{
        //                 x: new_coordinates[2].rotation.x,
        //                 y: new_coordinates[2].rotation.y,
        //                 z: new_coordinates[2].rotation.z,
        //                 duration: 10,
        //                 ease: "power1.out", 
        //             })
        //         }

            })
            gsap.to(bee.rotation, {
                x: new_coordinates[1].rotation.x,
                y: new_coordinates[1].rotation.y,
                z: new_coordinates[1].rotation.z,
                duration: 9,
                ease: "power1.out"
            })
        }
    })
    gsap.to(bee.rotation, {
        x: new_coordinates[0].rotation.x,
        y: new_coordinates[0].rotation.y,
        z: new_coordinates[0].rotation.z,
        duration: 5,
        ease: "power1.out"
    })
}
modelMove();