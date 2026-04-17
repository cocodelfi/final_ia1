class Scene03 extends Scene {//explosiones, incorporar colores AGREGAR SONDIO
    constructor() {
        super();
        this.balls = [];
        this.noiseAmp = 20;
        this.Noisefactor = 33;
        this.innerNoisefactor = 10;
        this.innerAlpha = 255;
        this.outerAlpha = 15;
        this.thick = 10;
        this.pointStep = 0.9;
        this.step = 0.8;
        this.colorArrays = [
            [color(247, 127, 0), color(255, 255, 255)],  // Naranja a blanco
            [color(0, 167, 225), color(255, 255, 255)],  // Azul cielo a blanco
            [color(3, 71, 72), color(20, 129, 186)],     // Verde oscuro a azul
            [color(0, 150, 199), color(10, 36, 99)],     // Azul claro a azul oscuro
            [color(165, 42, 42), color(210, 105, 30)],   // Marrón oscuro a marrón claro
            [color(255, 215, 0), color(255, 255, 224)],  // Amarillo dorado a amarillo claro
            [color(135, 206, 235), color(240, 248, 255)], // Celeste a blanco azulado
            [color(34, 139, 34), color(144, 238, 144)],  // Verde oscuro a verde claro
            [color(0, 0, 128), color(65, 105, 225)],     // Azul marino a azul real
            [color(85, 107, 47), color(154, 205, 50)],   // Verde oliva a verde amarillento
            [color(210, 180, 140), color(245, 222, 179)], // Marrón claro a beige
            [color(255, 165, 0), color(255, 215, 0)],    // Naranja a amarillo dorado
            [color(70, 130, 180), color(135, 206, 235)], // Azul acero a celeste
            [color(46, 139, 87), color(60, 179, 113)]    // Verde mar a verde primavera
        ];
        pixelDensity(4);
        angleMode(DEGREES);
    }


    draw() {//!!escena 3. definir grafico,sonido,interaccion
        super.draw();
        background(0, 50); // Slight fading effect
        for (let i = this.balls.length - 1; i >= 0; i--) {
            this.balls[i].update();
            this.balls[i].draw();
            //eliminar particulas alejadas
            if (dist(this.balls[i].p.x, this.balls[i].p.y, width / 2, height / 2) > max(width, height)) {
                this.balls.splice(i, 1);
            }
        }
    }

    mousePressed() {
        super.mousePressed();
        let numBalls = 500;
        let innerRadius = 70;
        let outerRadius = 150;
        let colorArray = random(this.colorArrays);
        let center = createVector(mouseX, mouseY);

        for (let i = 0; i < numBalls; i++) {
            let angle = random(360);
            let radius = random(innerRadius, outerRadius);
            let x = cos(angle) * radius + mouseX;
            let y = sin(angle) * radius + mouseY;
            let newBall = new Ball(
                createVector(x, y),
                createVector(0, 0),
                createVector(0, 0),
                2.5,
                colorArray,
                center,
                outerRadius
            );
            this.balls.push(newBall);
        }
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
