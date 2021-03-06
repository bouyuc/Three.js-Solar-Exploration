/**
 * Created by ss on 2017/10/1.
 */

var SolarEPUtils = {

    getDefaultRenderer: function () {

        var renderer = new THREE.WebGLRenderer({canvas: document.getElementById('sceneArea'), antialias: true});
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        return renderer;
    },

    raycaster: new THREE.Raycaster(),

    mouse: new THREE.Vector2(),

    animationFrame: null,

    listener: new THREE.AudioListener()
};