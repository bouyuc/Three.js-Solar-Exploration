/**
 * Created by ss on 2017/10/6.
 */

PinController = function (renderer) {

    var latitude = 37.3382, longitude = -121.8863;
    var radius = 0.55;
    var position = initPosition(latitude, longitude);

    var universeUtils = new UniverseUtils();
    var light = new THREE.AmbientLight(0xffffff);
    var camera = universeUtils.createDefaultCamera();
    var universeMesh = universeUtils.createDefaultUniverse();
    var earthMesh = universeUtils.createDefaultEarthMesh();
    var atmosphereMesh = universeUtils.createDefaultAtmosphere();
    var cone = initCone();
    var flag = initFlag();

    var pinRenderer = renderer;
    var pinScene = init();
    var grow = true; //Allow the cone to grow when loaded

    this.animate = pinAnimate;

    function pinAnimate() {

        requestAnimationFrame(pinAnimate);
        rotateEarth();
        rotateCone();
        growPin();
        pinRenderer.render(pinScene, camera);
    }

    function init() {

        earthMesh.add(cone);
        earthMesh.add(flag);

        var scene = new THREE.Scene();
        scene.add(light);
        scene.add(camera);
        scene.add(universeMesh);
        scene.add(initEarthAggregation());

        addEvent();

        return scene;
    }

    function initEarthAggregation() {

        var aggregation = new THREE.Object3D();
        aggregation.add(earthMesh);
        aggregation.add(atmosphereMesh);
        aggregation.rotateZ(-Math.PI * 23.5 / 180);

        return aggregation;
    }

    function initPosition(latitude, longitude) {
        var phi = (90 - latitude) * (Math.PI / 180);
        var theta = (longitude + 180) * (Math.PI / 180);

        var pointX = -((radius) * Math.sin(phi) * Math.cos(theta));
        var pointY = ((radius) * Math.cos(phi));
        var pointZ = ((radius) * Math.sin(phi) * Math.sin(theta));

        var position = new THREE.Vector3();
        position.x = pointX;
        position.y = pointY;
        position.z = pointZ;

        return position;
    }

    function initCone() {

        var coneMesh = new THREE.Mesh(
            new THREE.CylinderGeometry( 0.03, 0, 0.09, 0.12, 0.03 ),
            // new THREE.MeshBasicMaterial ({wireframe: true})
            new THREE.MeshPhongMaterial( { color: 0x085093 } )
        );

        coneMesh.position.set(position.x, position.y, position.z);

        return coneMesh;
    }

    function initFlag() {

        var flagMesh = new THREE.Mesh(
            new THREE.BoxGeometry( 0.12, 0.052, 0.012 ),
            new THREE.MeshBasicMaterial({
                    map: new THREE.TextureLoader().load(
                        '../images/californiaFlag.png'
                    ),
                    side: THREE.BackSide
                }
            )
        );

        var flagPosition = new THREE.Vector3();

        flagPosition.x = position.x + 0.02;
        flagPosition.y = position.y + 0.04;
        flagPosition.z = position.z + 0.14;

        flagMesh.position.set(flagPosition.x, flagPosition.y, flagPosition.z);

        return flagMesh;
    }

    function rotateEarth() {

        earthMesh.rotation.y += 0.003;
        atmosphereMesh.rotation.y += 0.003;
    }

    function rotateCone() {

        cone.rotation.y += 0.05;
    }

    function growPin() {

        if(cone.scale.x > 2) {
            grow = false;
        }
        if(cone.scale.x < 1) {
            grow = true;
        }
        if(grow) {
            cone.scale.x += 0.01;
            cone.scale.y += 0.01;
            cone.scale.z += 0.01;
        }else{
            cone.scale.x -= 0.01;
            cone.scale.y -= 0.01;
            cone.scale.z -= 0.01;
        }
    }

    // var raycaster = new THREE.Raycaster();
    // var mouse = new THREE.Vector2();

    // function JudgeChange() {
    //
    //     raycaster.setFromCamera(mouse, camera);
    //     var intersects = raycaster.intersectObjects(solarSystemScene.children, true);
    //
    //     if (intersects !== null && intersects.length !== 0 && intersects[0].object === cone) {
    //         changeScale();
    //     }
    // }
    //
    // function changeScale() {
    //
    //
    // }
    //
    // function addEvent() {
    //
    //     document.addEventListener('mousemove', onMouseMove, false);
    // }
    //
    // function onMouseMove() {
    //
    //     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    //     mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    // }
};