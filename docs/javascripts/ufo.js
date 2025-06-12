import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';
import { MeshoptDecoder } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/libs/meshopt_decoder.module.js';
import { gsap } from 'https://cdn.skypack.dev/gsap';

const camera = new THREE.PerspectiveCamera(
    10,
    window.innerWidth / window.innerHeight,
    0.1,
    10000
);
camera.position.z = 100;

const scene = new THREE.Scene();

const material = new THREE.MeshStandardMaterial({
    color: 0x00aaff,
    emissive: new THREE.Color(0x333333),
    metalness: 0.1,
    roughness: 0.5,
    emissiveIntensity: 7
});

let bee;
let mixer;

const loader = new GLTFLoader();
loader.setMeshoptDecoder(MeshoptDecoder); 

loader.load(
    './3dmodels/fortnite_ufo_free_download_by_dawoods_world-v1.glb',
    function (gltf) {
        bee = gltf.scene;
        bee.scale.set(1, 1, 1);
        bee.position.set(-25, 2, 0);
        scene.add(bee);
        modelMove();
    },
    undefined,
    (error) => console.error('Error loading model:', error)
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const topLight = new THREE.DirectionalLight(0xffffff, 2);
topLight.position.set(500, 500, 500);
scene.add(topLight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enableZoom = true;

function reRender3D() {
    requestAnimationFrame(reRender3D);
    renderer.render(scene, camera);
    if (mixer) mixer.update(0.01);
}
reRender3D();

function modelMove() {
    const new_coordinates = [
        {
            position: { x: 30, y: -3, z: 200 },
            rotation: { x: 0, y: -1, z: 0 }
        },
        {
            position: { x: 10, y: -3, z: 0 },
            rotation: { x: 0, y: 0, z: 0 }
        }
    ];

    gsap.to(bee.position, {
        ...new_coordinates[0].position,
        duration: 50,
        ease: "power1.out",
        onComplete: () => {
            gsap.to(bee.position, {
                ...new_coordinates[1].position,
                duration: 20,
                ease: "power1.out"
            });
            gsap.to(bee.rotation, {
                ...new_coordinates[1].rotation,
                duration: 9,
                ease: "power1.out"
            });
        }
    });

    gsap.to(bee.rotation, {
        ...new_coordinates[0].rotation,
        duration: 5,
        ease: "power1.out"
    });
}
modelMove()