import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  MeshLambertMaterial,
  PointLight,
  Mesh
} from 'three';

const SPEED = 0.1;
const ROTATION = 0.1;
const KEYS = {
  ARROW_LEFT: 37,
  ARROW_RIGHT: 39,
  ARROW_UP: 38,
  ARROW_DOWN: 40,
  Z: 90,
  X: 88,
  C: 67
};

let scene, renderer, camera, cube, lights;
let speedX = 0;
let speedY = 0;
let rotationX = 0;
let rotationY = 0;
let rotationZ = 0;

function setup() {
  setupCube();
  setupLight();
  setupScene();
  setupRenderer();
  setupCamera();
  setupListeners();
}

function setupCube() {
  const geometry = new BoxGeometry();
  const material = new MeshLambertMaterial({ color: 0x00ff00 });
  cube = new Mesh(geometry, material);
}

function setupLight() {
  const light1 = new PointLight(0xffffff, 1, 1000);
  light1.position.set(5, 5, 5);

  const light2 = new PointLight(0xffffff, 1, 1000);
  light2.position.set(-5, -5, 5);

  lights = [light1, light2];
}

function setupScene() {
  scene = new Scene();
  scene.add(cube);
  lights.forEach(light => scene.add(light));
  scene.position.z = -5;
}

function setupRenderer() {
  const { innerWidth, innerHeight } = window;

  renderer = new WebGLRenderer();
  renderer.setSize(innerWidth, innerHeight);
  document.body.append(renderer.domElement);
}

function setupCamera() {
  const { innerWidth, innerHeight } = window;

  camera = new PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
}

function setupListeners() {
  window.addEventListener('resize', onWindowResize);
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);
}

function onWindowResize() {
  const { innerWidth, innerHeight } = window;

  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
}

function onKeyDown({ keyCode }) {
  switch (keyCode) {
    case KEYS.ARROW_DOWN:
      onKeyDownArrowDown();
      break;
    case KEYS.ARROW_UP:
      onKeyDownArrowUp();
      break;
    case KEYS.ARROW_LEFT:
      onKeyDownArrowLeft();
      break;
    case KEYS.ARROW_RIGHT:
      onKeyDownArrowRight();
      break;
    case KEYS.Z:
      onKeyDownZ();
      break;
    case KEYS.X:
      onKeyDownX();
      break;
    case KEYS.C:
      onKeyDownC();
      break;
  }
}

function onKeyDownArrowDown() {
  speedY = -SPEED;
}

function onKeyDownArrowUp() {
  speedY = SPEED;
}

function onKeyDownArrowLeft() {
  speedX = -SPEED;
}

function onKeyDownArrowRight() {
  speedX = SPEED;
}

function onKeyDownZ() {
  rotationZ = ROTATION;
}

function onKeyDownX() {
  rotationX = ROTATION;
}

function onKeyDownC() {
  rotationY = ROTATION;
}

function onKeyUp({ keyCode }) {
  switch (keyCode) {
    case KEYS.ARROW_DOWN:
      onKeyUpArrowDown();
      break;
    case KEYS.ARROW_UP:
      onKeyUpArrowUp();
      break;
    case KEYS.ARROW_LEFT:
      onKeyUpArrowLeft();
      break;
    case KEYS.ARROW_RIGHT:
      onKeyUpArrowRight();
      break;
    case KEYS.Z:
      onKeyUpZ();
      break;
    case KEYS.X:
      onKeyUpX();
      break;
    case KEYS.C:
      onKeyUpC();
      break;
  }
}

function onKeyUpArrowDown() {
  if (speedY < 0) speedY = 0;
}

function onKeyUpArrowUp() {
  if (speedY > 0) speedY = 0;
}

function onKeyUpArrowLeft() {
  if (speedX < 0) speedX = 0;
}

function onKeyUpArrowRight() {
  if (speedX > 0) speedX = 0;
}

function onKeyUpZ() {
  rotationZ = 0;
}

function onKeyUpX() {
  rotationX = 0;
}

function onKeyUpC() {
  rotationY = 0;
}

function animate() {
  requestAnimationFrame(animate);
  animateCube();

  renderer.render(scene, camera);
}

function animateCube() {
  moveCube();
  rotateCube();
}

function moveCube() {
  cube.position.x += speedX;
  cube.position.y += speedY;
}

function rotateCube() {
  cube.rotateX(rotationX);
  cube.rotateY(rotationY);
  cube.rotateZ(rotationZ);
}

setup();
animate();
