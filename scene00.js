class Scene00 extends Scene {
    //!!!EMPROLIJAR PORFA. clase con estrellas y agujero para meter como objeto?
    constructor() {
        super();
        //inicializar propiedades
        this.stars = [];
        this.numStars = 1000;//n estrellas
        this.centerX = width / 2;
        this.centerY = height / 2;
        this.blackHoleRadius = min(width, height) * 0.1;
        this.maxRadius = sqrt(width * width + height * height) / 2;

        for (let i = 0; i < this.numStars; i++) {//estrellas iniciales
            this.stars.push(this.createStar());
        }

        this.menuItems = [
            { label: "Información", scene: 0 },
            { label: "Exploración", scene: 1 },
            { label: "Conexiones", scene: 2 },
            { label: "Explosiones", scene: 3 },
            { label: "Unión", scene: 4 },
        ];
        this.showPopup = false;
        this.popupContent = '';
    }

    draw() {
        super.draw();
        background(0);//fondo negro
        this.drawBlackHole();//dibujo agujero negro
        fill(255); //blanco para estrellas
        for (let star of this.stars) {//dibujo y actualizo
            this.updateStar(star);
            this.drawStar(star);
        }
        this.drawTitle();
        this.drawMenu();
        this.drawPopup();
    }

    drawMenu() {
        push();
        textAlign(CENTER, CENTER);
        textSize(26);
        fill(255);
        let menuWidth = width * 0.8;
        let itemWidth = menuWidth / this.menuItems.length;
        let startX = width * 0.1;
        let y = height * 0.95;

        for (let i = 0; i < this.menuItems.length; i++) {
            let x = startX + itemWidth * (i + 0.5);

            // Dibuja un rectángulo semitransparente detrás del texto
            fill(0, 100);
            rect(startX + itemWidth * i, y - 20, itemWidth, 40);

            fill(255);
            text(this.menuItems[i].label, x, y);
        }
        pop();
    }

    drawTitle() {
        push();
        textAlign(CENTER, CENTER);
        textSize(40);
        fill(255);
        text("Nuestros átomos", this.centerX, height * 0.1);
        pop();
    }

    drawPopup() {
        if (this.showPopup) {
            push();
            fill(0, 230);
            rect(width * 0.15, height * 0.15, width * 0.7, height * 0.7, 20); // Reducir tamaño del popup
            fill(255);
            textAlign(CENTER, CENTER);
            textSize(36);
            text("Acerca de la Obra", width * 0.5, height * 0.2);
            textSize(24);
            textAlign(LEFT, TOP);
            text(this.formatPopupContent(this.popupContent), width * 0.175, height * 0.25, width * 0.65, height * 0.5);
            textAlign(CENTER, CENTER);
            textSize(22);
            text("Haz clic para cerrar", width * 0.5, height * 0.8);
            pop();
        }
    }

    formatPopupContent(content) {
        // Función para agregar saltos de línea al contenido del popup
        let formattedContent = "";
        let maxLineLength = 60; // Longitud máxima de línea
        let words = content.split(" ");
        let line = "";

        for (let word of words) {
            if (line.length + word.length + 1 <= maxLineLength) {
                line += word + " ";
            } else {
                formattedContent += line + "\n";
                line = word + " ";
            }
        }
        formattedContent += line;
        return formattedContent;
    }


    createStar() {
        // Generar posición aleatoria en toda la pantalla
        let x, y;
        do {
            x = random(width); y = random(height);
        } while (this.isInsideBlackHole(x, y));

        return {
            x: x,
            y: y,
            size: random(1, 3),
            speed: random(0.5, 2)
        };
    }

    isInsideBlackHole(x, y) {
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
        //!! cambiar sonido. no definitivo

        super.mousePressed();
        if (this.showPopup) {
            this.showPopup = false;
            return;
        }

        let menuWidth = width * 0.8;
        let itemWidth = menuWidth / this.menuItems.length;
        let startX = width * 0.1;
        let y = height * 0.95;

        for (let i = 0; i < this.menuItems.length; i++) {
            let x = startX + itemWidth * (i + 0.5);
            if (mouseX > startX + itemWidth * i && mouseX < startX + itemWidth * (i + 1) &&
                mouseY > y - 20 && mouseY < y + 20) {
                if (this.menuItems[i].scene === 0) {
                    this.showPopup = true;
                    this.popupContent = "Bienvenido a 'Exploración Espacial'.\n\nEsta obra interactiva te llevará a través de un viaje cósmico, explorando las conexiones entre el universo y la humanidad. Cada escena representa un aspecto diferente de nuestra relación con el cosmos, desde la exploración hasta las conexiones que compartimos como seres humanos en este vasto universo.\n\nPara avanzar presiona 'D'. Para retorceder presiona 'A'.";
                    soundScene00.play();
                } else {
                    // Cambiar a la escena correspondiente
                    world.elegirScene(this.menuItems[i].scene);
                    soundScene00.play();
                    console.log(`Cambiando a la escena ${this.menuItems[i].scene}`);
                }
                break;
            }
        }
    }

    windowResized() {
        super.windowResized();
        this.centerX = width / 2;
        this.centerY = height / 2;
        this.blackHoleRadius = min(width, height) * 0.1;
        this.maxRadius = sqrt(width * width + height * height) / 2;

        // Reposicionar las estrellas existentes
        for (let star of this.stars) {
            Object.assign(star, this.createStar());
        }
    }

    keyTyped() {
        super.keyTyped();
    }
    mouseDragged() {
        super.mouseDragged();
    }
    mouseReleased() {
        super.mouseReleased();
    }

    stopSound() {
        super.stopSound();
        //detener sonido si esta reproduciendo. Cambio de escena
        if (soundScene00.isPlaying()) {
            soundScene00.stop();
        }
    }
}