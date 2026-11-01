class Scene04 extends Scene {
    constructor() {
        super();
        this.images = [];
        this.fallingImages = [];
        this.verse = [
            "En la danza cósmica de la existencia, somos uno con el universo.",
            "Cada átomo en nosotros fue una vez parte de una estrella.",
        ];
        this.maxImages = 15;
        this.initializeFallingImages();
    }

    initializeFallingImages() {
        for (let i = 0; i < this.maxImages; i++) {
            let randomImg = random(imagesScene04);
            let x = random(width);
            let y = random(-randomImg.height, height);
            let speed = random(0.5, 1.5);
            this.fallingImages.push(new FallingImage(randomImg, x, y, speed, 200));
        }
    }

    draw() {
        background(0);
        for (let i = this.fallingImages.length - 1; i >= 0; i--) {
            let img = this.fallingImages[i];
            img.update();
            img.display();
            if (img.y > height + img.img.height / 2) {
                this.fallingImages.splice(i, 1);
                this.addNewFallingImage();
            }
        }
        this.drawVerse();
        this.playSound();
    }

    addNewFallingImage() {
        let randomImg = random(imagesScene04);
        let x = random(width);
        let y = -randomImg.height / 2;
        let speed = random(0.5, 1.5);
        this.fallingImages.push(new FallingImage(randomImg, x, y, speed, 200));
    }

    drawVerse() {
        fill(0, 150);
        noStroke();
        rectMode(CENTER);
        rect(width / 2, height / 2, width * 0.8, 100);
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(24);
        text(this.verse.join('\n'), width / 2, height / 2);
    }
    playSound() {
        //reproducir sonido en loop
        if (!this.soundPlayed) {
            soundScene04.loop();
            this.soundPlayed = true;
        }
    }
    stopSound() {//detener al cambiar de escena
        super.stopSound();
        if (soundScene04.isPlaying()) {
            soundScene04.stop();
        }
        this.soundPlayed = false;
    }
}
