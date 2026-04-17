const world = new World();
let soundScene00, soundScene01, soundScene02;
let font;

function preload() {
  soundFormats('mp3', 'wav', 'ogg');
  soundScene00 = loadSound('assets/objetivo-glissando.wav');
  //soundScene01 = loadSound('');
  soundScene02 = loadSound('assets/sonne.wav');
  //soundScene03; soundScene04;
  font = loadFont('https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceSansPro-Light.otf');
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

function mousePressed() {
  world.currentScene.mousePressed();
}
function mouseDragged() {
  world.currentScene.mouseDragged();
}
function mouseReleased() {
  world.currentScene.mouseReleased();
}
function windowResized() {
  world.currentScene.windowResized();
}