
class Scene02 extends Scene {
  //!!AGREGAR algun tipo de sonido (SONNE)
  constructor() {
    super();
    this.stars = [];
    this.numStars = 1000; // Número de estrellas
    this.maxDistance = 100; // Distancia máxima para conectar estrellas
    this.speed = 0.5;

    for (let i = 0; i < this.numStars; i++) {
      this.stars[i] = new DraggableStar();
    }
  }

  draw() {
    super.draw();

    background(0);
    translate(width / 2, height / 2);
    this.updateAndShowStars(this.speed);
    this.drawConstellations();
  }

  updateAndShowStars(speed) {
    for (let i = 0; i < this.stars.length; i++) {
      this.stars[i].update(speed);
      this.stars[i].show();
    }
  }

  drawConstellations() {
    stroke(255, 100); // Color blanco con transparencia
    noFill();
    for (let i = 0; i < this.stars.length; i++) {
      for (let j = i + 1; j < this.stars.length; j++) {
        let d = dist(this.stars[i].sx, this.stars[i].sy, this.stars[j].sx, this.stars[j].sy);
        if (d < this.maxDistance) {
          line(this.stars[i].sx, this.stars[i].sy, this.stars[j].sx, this.stars[j].sy);
        }
      }
    }
  }

  mousePressed() { 
    super.mousePressed();
    let mousePos = createVector(mouseX - width/2, mouseY - height/2);
    for (let star of this.stars) {
      star.startDrag(mousePos.x, mousePos.y);
    }
  }

  mouseDragged() {
    super.mouseDragged();
    let mousePos = createVector(mouseX - width / 2, mouseY - height / 2);
    for (let star of this.stars) {
      star.drag(mousePos.x, mousePos.y);
    }
  }

  mouseReleased() {
    super.mouseReleased();
    for (let star of this.stars) {
      star.stopDrag();
    }
  }

  keyTyped() {
    super.keyTyped();
  }

  windowResized() {
    super.windowResized();
  }
}