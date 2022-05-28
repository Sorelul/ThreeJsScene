import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';
import { FBXLoader } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/FBXLoader.js';
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";

let scene, camera, renderer, controls,mixer1,mixer2,mixer3,mixer4,mixer5;
const clock1 = new THREE.Clock();
const clock2 = new THREE.Clock();
const clock3 = new THREE.Clock();
const clock4 = new THREE.Clock();
const clock5 = new THREE.Clock();

function press() {
    console.log("merge")
    var a = Math.random() * (10 - 0.1) + 0.1;
    var b = Math.random() * (10 - 0.1) + 0.1;
    var c = Math.random() * (10 - 0.1) + 0.1;
    camera.position.x = a;
    camera.position.y = b;
    camera.position.z = c;
    controls.update();
}

function init() {

    var x = document.getElementById("myBtn");
    x.addEventListener("click", press);

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xc8e0c8 );
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    controls = new OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI/2-0.1;
    const light = createLights();
    scene.add(light);
    const loader_ch = new FBXLoader();

    //fantana
    // loader_ch.load("fantana/source/Fountain.fbx", function (obj) {
    //     obj.scale.set(0.005, 0.005, 0.005);
    //     obj.position.set(0,0,0);
    //     // obj.rotation.set(0, 2.5, 0);
    //     mixer1 = new THREE.AnimationMixer(obj);
    //     const texture = new THREE.TextureLoader().load('fantana/textures/prima.png');
    //     const action = mixer1.clipAction(obj.animations[0]);
    //     action.play();
    //     obj.traverse(function (c) {
    //         if (c.isMesh) {
    //             c.material.map = texture;
    //             c.castShadow = true;
    //             c.receiveShadow = true;
    //         }
    //     });
    //     scene.add(obj);
    // });
    // loader_ch.load("fantana/source/Fountain.fbx", function (obj) {
    //     obj.scale.set(0.005, 0.005, 0.005);
    //     obj.position.set(-6,3.85,59);
    //     // obj.rotation.set(0, 2.5, 0);

    //     mixer2 = new THREE.AnimationMixer(obj);
    //     const texture = new THREE.TextureLoader().load('fantana/textures/prima.png');
    //     const action = mixer2.clipAction(obj.animations[0]);
    //     action.play();
    //     obj.traverse(function (c) {
    //         if (c.isMesh) {
    //             c.material.map = texture;
    //             c.castShadow = true;
    //             c.receiveShadow = true;
    //         }
    //     });
    //     scene.add(obj);
    // });
   

    //testoasa
    loader_ch.load("testoasa/source/Loggerhead 18.fbx", function (obj) {
        obj.scale.set(0.1, 0.1, 0.1);
        obj.position.set(-57,0.3,0);
        obj.rotation.set(0, -0.07, 0);

        mixer4 = new THREE.AnimationMixer(obj);
        const texture = new THREE.TextureLoader().load('testoasa/textures/skin.png');
        const action = mixer4.clipAction(obj.animations[0]);
        action.play();
        obj.traverse(function (c) {
            if (c.isMesh) {
                c.material.map = texture;
                c.castShadow = true;
                c.receiveShadow = true;
            }
        });
        scene.add(obj,light);
    });

    loader_ch.load("apa/source/Water_Animation.fbx", function (obj) {
        // obj.scale.set(0.005, 0.005, 0.005);
        obj.position.set(-57,0.5,0);
        obj.rotation.set(0, -0.07, 0);

        mixer3 = new THREE.AnimationMixer(obj);
        const texture = new THREE.TextureLoader().load('apa/textures/Water_Diffuse.png');
        const action = mixer3.clipAction(obj.animations[0]);
        action.play();
        obj.traverse(function (c) {
            if (c.isMesh) {
                c.material.map = texture;
                c.castShadow = true;
                c.receiveShadow = true;
            }
        });
        scene.add(obj);
    });

    const loader = new GLTFLoader();

    // //perete
    // loader.load('perete/scene.gltf', function (gltf) {
    //     gltf.scene.scale.set(40,3, 3);
    //     gltf.scene.position.set(-20,1,53);
    //     scene.add(gltf.scene);
    // }, undefined, function (error) {
    //     console.error(error);
    // });



    //drum
    loader.load('drum2/scene.gltf', function (gltf) {
        gltf.scene.scale.set(10.2,3, 4.5);
        gltf.scene.position.set(0,-1.8,-40);
        gltf.scene.rotation.set(0,1.5,0);
        scene.add(gltf.scene);
    }, undefined, function (error) {
        console.error(error);
    });
    loader.load('drum2/scene.gltf', function (gltf) {
        gltf.scene.scale.set(11,3, 4.5);
        gltf.scene.position.set(-15.7,-1.8,57.5);
        gltf.scene.rotation.set(0,6.2,0);
        scene.add(gltf.scene);
    }, undefined, function (error) {
        console.error(error);
    });
    //coltar
    loader.load('coltar/scene.gltf', function (gltf) {
        gltf.scene.scale.set(0.5,0.5,0.5);
        gltf.scene.position.set(-6,3.85,59);
        gltf.scene.rotation.set(0,-0.1,0);
        scene.add(gltf.scene);
    }, undefined, function (error) {
        console.error(error);
    });
   

    //model adaugare copac
    for(let i=-9;i<10;i+=2){
        let x = i-6*i
        creareCopacTip1(3+((i*10)%100/25),0.4,x)
        // creareCopacTip1(-5.5+((i*10)%100/25),0.4,x)
    }
    for(let i=-9;i<5;i+=4){
        let x = i-6*i
        let y = 2+((i*10)%100/25)
        creareBanca(y,0.4,x);
    }


    
    //Adaugare Iarba
    // var geometrya = new THREE.PlaneGeometry( 500, 500, 1, 1 );
    // let textura = new THREE.TextureLoader().load('texturi/iarba.jpg');
    // let materiala = new THREE.MeshStandardMaterial( { color: 0x567d46 } );
    // var floor = new THREE.Mesh( geometrya, materiala );
    // floor.material.side = THREE.DoubleSide;
    // floor.rotation.x = 1.57;
    // scene.add(floor);

    camera.position.x = -15;
    camera.position.z = -15;
    camera.position.y = 10;
    
    

    controls.update();
}
var zSpeed =1;
var xSpeed =1;
document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 87) {
        camera.position.z += zSpeed;
        // perete.position.z += zSpeed;
        console.log("Am apasat tasta + "+keyCode);
    } else if (keyCode == 83) { //s
        camera.position.z -= zSpeed;
        // perete.position.z -= zSpeed;
        console.log("Am apasat tasta + "+keyCode);
    } else if (keyCode == 68) { //a
        camera.position.x -= xSpeed;
        // perete.position.x -= xSpeed;
        console.log("Am apasat tasta + "+keyCode);
    } else if (keyCode == 65) { //d 
        camera.position.x += xSpeed;
        // perete.position.x += xSpeed;
        console.log("Am apasat tasta + "+keyCode);
    } else if (keyCode == 32) { // space
        console.log("Am apasat tasta + "+keyCode);
        camera.position.set(0, 0, 0);
        // perete.position.set(0, 0, 0);
    }
};


function creareCopacTip1(x,y,z){
    const loader = new GLTFLoader();
    loader.load('copac/scene.gltf', function (gltf) {
        gltf.scene.position.set(x,y,z);
        scene.add(gltf.scene);
    }, undefined, function (error) {
        console.error(error);
    });
}
function creareCopacTip2(x,y,z){
    const loader = new GLTFLoader();
    loader.load('spruce/scene.gltf', function (gltf) {
        gltf.scene.position.set(x,y,z);
        scene.add(gltf.scene);
    }, undefined, function (error) {
        console.error(error);
    });
}
function creareBanca(x,y,z){
    const loader = new GLTFLoader();
    loader.load('banca/scene.gltf', function (gltf) {
        gltf.scene.position.set(x,0.6,z);
        gltf.scene.rotation.set(0,4.7,0);
        scene.add(gltf.scene);
    }, undefined, function (error) {
        console.error(error);
    });
}

function createLights() {
    // Crearea unei lumini directionale
    const light = new THREE.DirectionalLight('white', 3);

    // Pozitionarea luminii
    light.position.set(-13, 30, -30);

    return light;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    if (mixer1) 
    mixer1.update(clock1.getDelta());
    if (mixer2) 
    mixer2.update(clock2.getDelta());
    if (mixer3) 
    mixer3.update(clock3.getDelta());
    if (mixer4) 
    mixer4.update(clock4.getDelta());
    if (mixer5) 
    mixer5.update(clock5.getDelta());

    controls.update();
    renderer.render(scene, camera);
}

// se apeleaza functia onWindowResize() cand facem resize la pagina
window.addEventListener('resize', onWindowResize, false);

init();
animate();
