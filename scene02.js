
class Scene02 extends Scene {
  constructor() {
    super();
    this.stars = [];
    this.numStars = 800; // Número de estrellas
    this.maxDistance = 100; // Distancia máxima para conectar estrellas
    this.speed = 0.5;
    this.soundPlaying = false; // Bandera para controlar el sonido
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
    this.playSound();
    this.drawInstructionText();
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

  playSound() {
    //reproducir sonido en loop
    if (!this.soundPlayed) {
      soundScene02.loop();
      soundScene02.amp(0);//amplitud inicial
      this.soundPlayed = true;
    }
  }

  stopSound() {//detener al cambiar de escena
    super.stopSound();
    if (soundScene02.isPlaying()) {
      soundScene02.stop();
    }
    this.soundPlayed = false;
  }

  drawInstructionText() {
    push();
    translate(-width / 2, -height / 2);  // Deshacer la traslación
    textAlign(LEFT, BOTTOM);
    textSize(22);
    fill(255);
    text("Presione y arrastre", 10, height - 10);
    pop();
  }

  mousePressed() {
    super.mousePressed();
    let mousePos = createVector(mouseX - width / 2, mouseY - height / 2);
    for (let star of this.stars) {
      star.startDrag(mousePos.x, mousePos.y);
    }
  }

  mouseDragged() {//en arrastre suena musica
    super.mouseDragged();
    let mousePos = createVector(mouseX - width / 2, mouseY - height / 2);
    for (let star of this.stars) {
      star.drag(mousePos.x, mousePos.y);
    }
    if (!this.soundPlaying) {
      soundScene02.amp(0.5, 0.1);
      this.soundPlaying = true;
    }
  }

  mouseReleased() {
    super.mouseReleased();
    for (let star of this.stars) {
      star.stopDrag();
    }
    soundScene02.amp(0, 0.5); //bajar amp
    this.soundPlaying = false;
  }

}