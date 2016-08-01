var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 500, 1500);

var renderer = new THREE.WebGLRenderer({alpha:true});
renderer.setSize( window.innerWidth, window.innerHeight);
renderer.setClearColor(0x0000ff, 0.6);
document.body.appendChild(renderer.domElement);
var controls = new THREE.OrbitControls(camera, render.domElement);

var material = new THREE.MeshLambertMaterial ( { color: 0xffffff, shading: THREE.SmoothShading });

var boxGeo = new THREE.BoxGeometry(1, 1, 1);
var sphereGeo = new THREE.SphereGeometry( 25, 32, 32 );

var sphereMesh = new THREE.Mesh( sphereGeo, material );
sphereMesh.position.set(0,0,0);
scene.add(sphereMesh);

var sea = createSea();
scene.add(sea.mesh);

var sky = createSky();
scene.add(sky.mesh);

camera.position.set( 0, 200, 900 );
camera.up = new THREE.Vector3(0,0,-1);
camera.lookAt(new THREE.Vector3(0,0,0));

//var pointLight = new THREE.PointLight(0xffffff, 1, 0);
//pointLight.position.set(0,900,900);
//scene.add(pointLight);

function render(){
    requestAnimationFrame(render);
    sea.moveWaves();
    sky.mesh.rotation.z += 0.00125;
    renderer.render(scene, camera);
}
render();
