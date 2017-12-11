if (!Detector.webgl) Detector.addGetWebGLMessage();

var composer, renderer, camera, scene1, torus1, torus2;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var mouseX = 0,
    mouseY = 0,
    cubes = [];
var clock = new THREE.Clock();

init();

document.addEventListener('mousemove', onDocumentMouseMove, false);

function init() {

            camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
            camera.position.z = 200;

            scene1 = new THREE.Scene();
            }