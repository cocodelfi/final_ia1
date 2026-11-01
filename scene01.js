
class Scene01 extends Scene {
    constructor() {
        super();
        this.soundPlayed = false;
        this.stars = [];
        this.numStars = 1500; //número de estrellas
        for (let i = 0; i < this.numStars; i++) { //inicializar array, crear objetos star
            this.stars[i] = new Star();
        }
    }

    draw() {
        super.draw();
        background(0);
        // dibujar el texto de instrucción
        this.drawInstructionText();
        //calcular y aplicar la velocidad basada en la posición del mouse
        let speed = this.calculateSpeed();
        translate(width / 2, height / 2); //centrar el sistema de coordenadas
        //actualizar y mostrar las estrellas
        this.updateAndShowStars(speed);
        //reproducir sonido
        this.playSound();
        
    }

    calculateSpeed() {
        //calcular la velocidad basada en la distancia del mouse al centro
        let distCentro = dist(mouseX, mouseY, width / 2, height / 2);
        let maxDist = dist(0, 0, width / 2, height / 2);
        return map(distCentro, 0, maxDist, 50, 0); //velocidad varía de 50 a 0
    }

    updateAndShowStars(speed) {
        //actualizar y mostrar cada estrella
        for (let star of this.stars) {
            star.update(speed);
            star.show();
        }
    }

    playSound() {
        //reproducir sonido en loop
        if (!this.soundPlayed) {
            soundScene01.loop();
            this.soundPlayed = true;
        }
        //ajustar la amplitud del sonido en función de la posición del mouse
        let distCentro = dist(mouseX, mouseY, width / 2, height / 2);
        let maxDist = dist(0, 0, width / 2, height / 2);
        let volume = map(distCentro, 0, maxDist, 1, 0); //amplitud varía de 1 a 0
        soundScene01.amp(volume); //aplicar amplitud
    }
    drawInstructionText() {
        push();
        textAlign(LEFT, BOTTOM);
        textSize(22);
        fill(255);
        text("Deslice el mouse", 10, height - 10); // Dibujar el texto en la esquina inferior izquierda
        pop();
    }

    stopSound() {//detener al cambiar de escena
        super.stopSound();
        if (soundScene01.isPlaying()) {
            soundScene01.stop();
        }
        this.soundPlayed = false;
    }

}