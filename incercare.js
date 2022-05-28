import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';
import { FBXLoader } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/FBXLoader.js';
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";

let scene, camera, renderer, controls,mixer1,mesh,goal;
const clock1 = new THREE.Clock();
var perete;

var newPosition = new THREE.Vector3();
var matrix = new THREE.Matrix4();
var temp = new THREE.Vector3;

function init() {

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xc8e0c8 );

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // controls = new OrbitControls(camera, renderer.domElement);
    // controls.minPolarAngle = Math.PI/2;
    // controls.maxPolarAngle = Math.PI/2-0.1;
    const light = createLights();
    scene.add(light);
    camera.lookAt(scene);
    const loader_ch = new FBXLoader();
    const loader = new GLTFLoader();

    for(let i=-9;i<10;i+=2){
        let x = i-6*i
        creareCopacTip1(0,0.4,x)
        creareCopacTip1(10,0.4,x)
        creareCopacTip1(20,0.4,x)
    }

    //perete
    loader.load('statue_capra/scene.gltf', function (gltf) {
        // gltf.scene.scale.set(4,3, 3);
        gltf.scene.position.set(0,1,0);
        perete = gltf.scene;
        scene.add(perete);
    }, undefined, function (error) {
        console.error(error);
    });


    var geometry = new THREE.BoxBufferGeometry( 0.2, 0.2, 0.2 );
    var material = new THREE.MeshNormalMaterial();

    mesh = new THREE.Mesh( geometry, material );
    
    goal = new THREE.Object3D;
    
    mesh.add( goal );
    scene.add( mesh );
    
    goal.position.set(0, 10, -2);


    //Adaugare Iarba
    var geometrya = new THREE.PlaneGeometry( 500, 500, 1, 1 );
    let textura = new THREE.TextureLoader().load('texturi/iarba.jpg');
    let materiala = new THREE.MeshStandardMaterial( { color: 0x567d46 } );
    var floor = new THREE.Mesh( geometrya, materiala );
    floor.material.side = THREE.DoubleSide;
    floor.rotation.x = 1.57;
    scene.add(floor);


    camera.position.x = 0;
    camera.position.z = -20;
    camera.position.y = 20;
    
    

    // controls.update();
}
var zSpeed =1;
var xSpeed =1;

document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 87) {
        // gsap.to(mesh.rotation,{
        //     duration: 0.5,
        //     y: 1
        // });
        gsap.to(mesh.position,{
            duration: 0.5,
            z: ++zSpeed
        });
        console.log("Am apasat tasta + "+keyCode);

    } else if (keyCode == 83) { //s
        // gsap.to(mesh.rotation,{
        //     duration: 0.5,
        //     y: 4
        // });
        gsap.to(mesh.position,{
            duration: 0.5,
            z: --zSpeed
        });
        console.log("Am apasat tasta + "+keyCode);

    } else if (keyCode == 68) { //d
        // gsap.to(mesh.rotation,{
        //     duration: 0.5,
        //     y: 5
        // });
        gsap.to(mesh.position,{
            duration: 0.5,
            x: --xSpeed
        });
        console.log("Am apasat tasta + "+keyCode);

    } else if (keyCode == 65) { //a 
        // gsap.to(mesh.rotation,{
        //     duration: 1,
        //     y: 2
        // });
        gsap.to(mesh.position,{
            duration: 0.5,
            x: ++xSpeed
        });
        console.log("Am apasat tasta + "+keyCode);

    } else if (keyCode == 32) { // space
        console.log("Am apasat tasta + "+keyCode);
        camera.position.set(0, 20, -20);

    } else if (keyCode == 37) { //stanga 
        gsap.to(camera.rotation,{
            duration: 1,
            y: 20
        });
    }else if (keyCode == 38) { //sus 
        gsap.to(camera.rotation,{
            duration: 1,
            y: 10
        });
    }else if (keyCode == 39) { //dreapta 
        gsap.to(camera.rotation,{
            duration: 1,
            y: 50
        });
    }else if (keyCode == 40) { //jos 
        gsap.to(camera.rotation,{
            duration: 1,
            y: 40
        });
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
    // if (mixer1) 
    // mixer1.update(clock1.getDelta());
      
    temp.setFromMatrixPosition(goal.matrixWorld);
      
    camera.position.lerp(temp, 0.2);
    camera.lookAt( mesh.position );
    
    // controls.update();
    renderer.render(scene, camera);
}

// se apeleaza functia onWindowResize() cand facem resize la pagina
window.addEventListener('resize', onWindowResize, false);

init();
animate();
