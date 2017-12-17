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

                for (i = 0; i < 6; i++) {
                    var cube = scene1.getObjectByName("Cube_" + i, true);

                    startTween(cube, i * 200);
                    cubes.push(cube);

                }

                animate();

            });

            renderer = new THREE.WebGLRenderer({
                antialias: true
            });
            renderer.setClearColor(0x616b75);
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.autoClear = false;
            document.body.appendChild(renderer.domElement);

            var clearPass = new THREE.ClearPass();

            var clearMaskPass = new THREE.ClearMaskPass();

            var maskPass1 = new THREE.MaskPass(scene1, camera);

            var texture1 = new THREE.TextureLoader().load('img/1.jpg');

            var texturePass1 = new THREE.TexturePass(texture1);

            var outputPass = new THREE.ShaderPass(THREE.CopyShader);
            outputPass.renderToScreen = true;

            var parameters = {
                minFilter: THREE.LinearFilter,
                magFilter: THREE.LinearFilter,
                format: THREE.RGBFormat,
                stencilBuffer: true
            };

            var renderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, parameters);

            composer = new THREE.EffectComposer(renderer, renderTarget);

            composer.addPass(clearPass);
            composer.addPass(maskPass1);
            composer.addPass(texturePass1);
            composer.addPass(clearMaskPass);
            composer.addPass(outputPass);
        }

        function startTween(object, hold) {
            object.scale.x = object.scale.y = object.scale.z = 0.001;

            new TWEEN.Tween(object.scale).to({
                x: 1,
                y: 1,
                z: 1
            }, 4000).easing(TWEEN.Easing.Elastic.Out).delay(hold).start();
        }

        function animate() {

            requestAnimationFrame(animate);

            var time = performance.now() * 0.001;

            camera.position.x += (mouseX - camera.position.x) * .02;
            camera.position.y += (-mouseY - camera.position.y) * .02;

            camera.lookAt(scene1.position);
        }
        

        function onDocumentMouseMove(event) {

            mouseX = (event.clientX - windowHalfX) * 0.4;
            mouseY = (event.clientY - windowHalfY) * 0.4;

        }