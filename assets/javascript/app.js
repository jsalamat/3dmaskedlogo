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

            torus1 = new THREE.Mesh(new THREE.TorusGeometry(120, 4, 16, 100));
            scene1.add(torus1);
            startTween(torus1, 1200);
            torus2 = new THREE.Mesh(new THREE.TorusGeometry(130, 1, 16, 100));

            scene1.add(torus2);
            startTween(torus2, 1800);

            var loader = new THREE.ColladaLoader();
            loader.options.convertUpAxis = true;

            loader.load('logo.dae', function (collada) {
	            var dae = collada.scene;

	            dae.scale.x = dae.scale.y = dae.scale.z = 0.7;
	            dae.rotation.x = -Math.PI / 2;
	            dae.rotation.y = -Math.PI / 2;
	            dae.updateMatrix();
	            scene1.add(dae);
        }