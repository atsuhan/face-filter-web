import * as THREE from 'three';

const width = window.innerWidth;
const height = window.innerHeight;
const canvas = document.querySelector('#myCanvas');
const texLoader = new THREE.TextureLoader();

let renderer, scene, camera, planeMesh;

const init = () => {
  // renderer
  renderer = new THREE.WebGLRenderer({
    canvas
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);

  // scene
  scene = new THREE.Scene();

  // camera
  camera = new THREE.PerspectiveCamera(45, width / height);
  camera.position.set(0, 0, 3);

  // light
  const directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  // plane geometry
  const planeGeom = new THREE.PlaneGeometry(1, 1, 1);
  const planeMap = texLoader.load('/img/sample.jpg');
  const planeMaterial = new THREE.MeshLambertMaterial({
    map: planeMap,
    side: THREE.DoubleSide
  });
  planeMesh = new THREE.Mesh(planeGeom, planeMaterial);
  scene.add(planeMesh);

  tick();
};

const tick = () => {
  planeMesh.rotation.y += 0.01;
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};

window.addEventListener('load', init);
