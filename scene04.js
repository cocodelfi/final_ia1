class Scene04 extends Scene {//ojos/personas/imagenes del espacio, AGREGAR SONIDO
    constructor() {
        super();
        this.images = [];
        this.fallingImages = [];
        this.loadImages();
        this.credits = [ //a verse
            "Constanza Delfina Schweers",
            "Espacial",
            "2024",
            "Informatica Aplicada I",
        ];
    }

    loadImages() {
        this.images.push(loadImage('assets/eye1.jpg'));
        this.images.push(loadImage('assets/eye2.jpg'));
        this.images.push(loadImage('assets/person1.jpg'));
        this.images.push(loadImage('assets/person2.jpg'));
    }

    draw() {
        super.draw();
        background(0); 

        // Añadir nuevas imágenes ocasionalmente
        if (frameCount % 30 === 0 && this.fallingImages.length < 15) { // Añade una nueva imagen cada 30 frames, hasta un máximo de 15
            this.addNewFallingImage();
        }

        // Actualizar y dibujar imágenes cayendo
        for (let i = this.fallingImages.length - 1; i >= 0; i--) {
            let img = this.fallingImages[i];
            img.update();
            img.display();

            // Eliminar imágenes que han salido de la pantalla
            if (img.y > height + img.height) {
                this.fallingImages.splice(i, 1);
            }
        }
        this.drawCredits();
    }

    addNewFallingImage() {
        let randomImg = random(this.images);
        let x = random(width);
        let y = -randomImg.height;
        let speed = random(1, 3);
        let rotation = random(TWO_PI);
        let rotationSpeed = random(-0.05, 0.05);
        this.fallingImages.push(new FallingImage(randomImg, x, y, speed, rotation, rotationSpeed));
    }

    drawCredits() {
        fill(255);
        textAlign(CENTER, BOTTOM);
        textSize(24);
        
        let y = height - 20; // Empezamos 20 píxeles desde abajo
        for (let i = this.credits.length - 1; i >= 0; i--) {
            text(this.credits[i], width / 2, y);
            y -= 25; // Movemos hacia arriba para el siguiente crédito
        }
    }

    keyTyped() {
        super.keyTyped();
    }
    windowResized() {
        super.windowResized();
    }
    mousePressed() {
        super.mousePressed();
    }
    mouseDragged() {
        super.mouseDragged();
    }
    mouseReleased() {
        super.mouseReleased();
    }
    keyTyped() {
        super.keyTyped();
    }
    windowResized() {
        super.windowResized();
    }
}
