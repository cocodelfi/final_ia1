class Scene00 extends Scene {//pantalla inicial
    constructor() {
        super();
        //inicializar propiedades. n estrellas, centro de pantalla, radio de agujero negro, estrellas iniciales
        this.stars = [];
        this.numStars = 1000;
        this.centerX = width / 2;
        this.centerY = height / 2;
        this.blackHoleRadius = min(width, height) * 0.1;
        this.maxRadius = sqrt(width * width + height * height) / 2;
        for (let i = 0; i < this.numStars; i++) {
            this.stars.push(this.createStar());
        }

        this.menuItems = [
            //opciones nav
            { label: "00 - información", scene: 0 },
            { label: "01 - exploración", scene: 1 },
            { label: "02 - conexión", scene: 2 },
            { label: "03 - supernova", scene: 3 },
            { label: "04 - unión", scene: 4 },
        ];
        //popup invisible, sin contenido
        this.showPopup = false;
        this.popupContent = '';
    }

    draw() {
        super.draw();
        //fondo negro, agujero negro, estrellas blancas de extremos hacia centro
        background(0);
        this.drawBlackHole();
        fill(255);
        for (let star of this.stars) {
            this.updateStar(star);
            this.drawStar(star);
        }
        //titulo, menu de navegacion y popup cuando visible
        this.drawTitle();
        this.drawMenu();
        this.drawPopup();
    }

    drawMenu() {
        //nav
        push();
        textAlign(CENTER, CENTER);
        textSize(26);
        fill(255);
        //ancho de menu, de elementos, posicion en x e y, color fondo y teto
        let menuWidth = width * 0.8;
        let itemWidth = menuWidth / this.menuItems.length;
        let startX = width * 0.1;
        let y = height * 0.95;
        for (let i = 0; i < this.menuItems.length; i++) {
            let x = startX + itemWidth * (i + 0.5);
            fill(0, 100);
            rect(startX + itemWidth * i, y - 20, itemWidth, 40);
            fill(255);
            text(this.menuItems[i].label, x, y);
        }
        pop();
    }

    drawTitle() {
        //titulo centrado, color, tamaño
        push();
        textAlign(CENTER, CENTER);
        textSize(40);
        fill(255);
        text("human experience", this.centerX, height * 0.1);
        pop();
    }

    drawPopup() {
        // cuando el popup esta visible
        if (this.showPopup) {
            //fondo semitransparente, alto, ancho, posicion x e y, color, alineacion, tamaño,
            push();
            rectMode(CENTER);
            fill(0, 230);
            let popupWidth = width * 0.5;
            let popupHeight = height * 0.5;
            let popupX = width / 2;
            let popupY = height / 2;
            rect(popupX, popupY, popupWidth, popupHeight, 20);
            fill(255);
            textAlign(CENTER, CENTER);
            textSize(36);
            text("Acerca de la Obra", popupX, popupY - popupHeight / 2 + 50);
            textSize(24);
            textAlign(LEFT, TOP);
            this.displayJustifiedText(this.popupContent, popupX - popupWidth / 2 + 20, popupY - popupHeight / 2 + 100, popupWidth - 40, 24);
            textAlign(CENTER, CENTER);
            textSize(22);
            text("Haz clic para cerrar", popupX, popupY + popupHeight / 2 - 40);
            pop();
        }
    }

    displayJustifiedText(content, x, y, maxWidth, lineHeight) {
        //dibuja texto justificado
        let words = content.split(' ');//dividir contenido en palabras
        let currentLine = '';
        let lines = [];
        for (let i = 0; i < words.length; i++) {
            let testLine = currentLine + words[i] + ' ';
            let testWidth = textWidth(testLine);
            if (testWidth > maxWidth && i > 0) {
                lines.push(currentLine);
                currentLine = words[i] + ' ';
            } else {
                currentLine = testLine;
            }
        }
        lines.push(currentLine);
        for (let i = 0; i < lines.length; i++) {
            text(lines[i], x, y + (i * lineHeight));
        }
    }

    createStar() {
        // Generar posición aleatoria en toda la pantalla
        let x, y;
        do {
            x = random(width); y = random(height);
        } while (this.isInsideBlackHole(x, y));
        //tamaño y velocidad aleatoria de estrella
        return {
            x: x,
            y: y,
            size: random(1, 3),
            speed: random(0.5, 2)
        };
    }

    isInsideBlackHole(x, y) {
        //verifica si una posicion esta dentro del circulo negro
        let dx = this.centerX - x;
        let dy = this.centerY - y;
        let distance = sqrt(dx * dx + dy * dy);
        return distance <= this.blackHoleRadius;
    }

    updateStar(star) {
        //actualizo posic. de estrella
        let dx = this.centerX - star.x;//diferencia en x e y
        let dy = this.centerY - star.y; //distancia al centro
        let distance = sqrt(dx * dx + dy * dy);
        if (distance > this.blackHoleRadius) {
            //mover la estrella hacia el centro si está fuera del agujero
            star.x += (dx / distance) * star.speed;
            star.y += (dy / distance) * star.speed;
        } else {
            // Resetear posic. de estrella si fue absorbida
            Object.assign(star, this.createStar());
        }
    }

    drawStar(star) {//dibujo estrella
        ellipse(star.x, star.y, star.size);
    }

    drawBlackHole() {//dibujo agujero negro
        noStroke();
        fill(0);
        ellipse(this.centerX, this.centerY, this.blackHoleRadius * 2);
    }

    mousePressed() {
        super.mousePressed();
        if (this.showPopup) {
            //cierra el popup si esta abierto
            this.showPopup = false;
            return;
        }
        //ancho de menu, ancho de elementos, posicion en x e y de menu
        let menuWidth = width * 0.8;
        let itemWidth = menuWidth / this.menuItems.length;
        let startX = width * 0.1;
        let y = height * 0.95;
        for (let i = 0; i < this.menuItems.length; i++) {
            let x = startX + itemWidth * i;
            //limite izq y derecho de elemento de menu
            let itemX1 = x;
            let itemX2 = x + itemWidth;
            if (mouseX > itemX1 && mouseX < itemX2 && mouseY > y - 20 && mouseY < y + 20) {
                //muestra popup informacion (item00)
                if (this.menuItems[i].scene === 0) {
                    this.showPopup = true;
                    this.popupContent = "Te invito a un viaje por el cosmos interior y exterior, donde las estrellas son parte de nosotros y nosotros, universos. \n\nPara avanzar presiona 'D'.  Para retorceder presiona 'A'.\n\nConstanza Schweers,  2024,  Informatica Aplicada 1.";
                } else {
                    // Cambiar a la escena correspondiente
                    world.elegirScene(this.menuItems[i].scene);
                    console.log(`Cambiando a la escena ${this.menuItems[i].scene}`);
                }
                soundScene00.play();
                break;
            }
        }
    }

    windowResized() {
        //redimensionar ventana
        super.windowResized();
        //actualiza todos los valores
        this.centerX = width / 2;
        this.centerY = height / 2;
        this.blackHoleRadius = min(width, height) * 0.1;
        this.maxRadius = sqrt(width * width + height * height) / 2;
        for (let star of this.stars) {
            Object.assign(star, this.createStar());
        }
    }

    stopSound() {
        super.stopSound();
        //detener sonido si esta reproduciendo. Cambio de escena
        if (soundScene00.isPlaying()) {
            soundScene00.stop();
        }
    }
}