// TP mitad de año CONSTANZA D.SCHWEERS
const world = new World();
let soundScene00, soundScene01, soundScene02, soundScene03, soundScene04;
let font;
let imagesScene04;

function preload() {
  soundFormats('mp3', 'wav');
  soundScene00 = loadSound('assets/audio/fx.wav');
  soundScene01 = loadSound('assets/audio/buzz.wav');
  soundScene02 = loadSound('assets/audio/chimes.wav');
  soundScene03 = [
  loadSound('assets/audio/a-3.wav'),
  loadSound('assets/audio/b-3.wav'),
  loadSound('assets/audio/c-3.wav'),
  loadSound('assets/audio/d-3.wav'),
  loadSound('assets/audio/e-3.wav'),
  loadSound('assets/audio/f-3.wav'),
  loadSound('assets/audio/g-3.wav'),
  loadSound('assets/audio/h-3.wav'),
  loadSound('assets/audio/i-3.wav')
];
  soundScene04 = loadSound('assets/audio/sonne.wav');
  font = loadFont('https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceSansPro-Light.otf');
  imagesScene04 = [
    loadImage('assets/earthrise.jpg'),
    loadImage('assets/creacion.jpg'),
    loadImage('assets/migrant.jpg'),
    loadImage('assets/afgana.jpg'),
    loadImage('assets/beso.jpg'),
    loadImage('assets/tiananmen.jpg'),
    loadImage('assets/challenger.jpg')
  ];
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(font);

  let scene = new Scene00();
  world.agregarScene(scene);
  scene = new Scene01();
  world.agregarScene(scene);
  scene = new Scene02();
  world.agregarScene(scene);
  scene = new Scene03();
  world.agregarScene(scene);
  scene = new Scene04();
  world.agregarScene(scene);

  world.elegirScene(0);
}

function draw() {
  world.draw();
}

function keyTyped() { //navegacion
  if (world && world.currentScene) {
    if (key === 'a' || key === 'A') {
      world.keyTyped();
      world.currentScene.stopSound();
      world.previaScene();
    } else if (key === 'd' || key === 'D') {
      world.keyTyped();
      world.currentScene.stopSound();
      world.proximaScene();
    }
  }
}

function mousePressed() {
  if (world && world.currentScene) {
    world.currentScene.mousePressed();
  }
}

function mouseDragged() {
  if (world && world.currentScene) {
    world.currentScene.mouseDragged();
  }
}

function mouseReleased() {
  if (world && world.currentScene) {
    world.currentScene.mouseReleased();
  }
}
function windowResized() {
  world.currentScene.windowResized();
}