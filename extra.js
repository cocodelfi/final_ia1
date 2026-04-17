
class Star { //scene01
    constructor() {
        this.x = random(-width, width);
        this.y = random(-height, height);
        this.z = random(width);
        this.pz = this.z; //posicion z anterior
    }

    update(speed) {
        this.pz = this.z; // Actualiza la posición z anterior
        this.z = this.z - speed;
        //reaparecer la estrella si pasa el borde
        if (this.z < 1) {
            this.z = width;
            this.pz = this.z;
            this.x = random(-width, width);
            this.y = random(-height, height);
        }
    }

    show() {
        fill(255);
        noStroke();

        //calcular posiciones actuales
        this.sx = map(this.x / this.z, 0, 1, 0, width);
        this.sy = map(this.y / this.z, 0, 1, 0, height);

        //dibujar estrella
        let r = map(this.z, 0, width, 8, 0);
        ellipse(this.sx, this.sy, r, r);

        //calcular posiciones anteriores
        let px = map(this.x / this.pz, 0, 1, 0, width);
        let py = map(this.y / this.pz, 0, 1, 0, height);

        stroke(255); //dibujar estela
        line(px, py, this.sx, this.sy);
    }
}

class DraggableStar extends Star { //scene02
    constructor() {
        super(); // Llama al constructor de la clase star
        this.dragging = false;
        this.offsetX = 0;
        this.offsetY = 0;
        this.dragRadius = 80;
    }

    // Actualiza la posición de la estrella solo si no está siendo arrastrada
    update(speed) {
        if (!this.dragging) {
            super.update(speed);
        }
    }

    // Maneja el inicio del arrastre
    startDrag(mx, my) { //NO FUNCIONA
        let d = dist(mx, my, this.sx, this.sy);
        if (d < this.dragRadius) {
            this.dragging = true;
            this.offsetX = this.sx - mx;
            this.offsetY = this.sy - my;
        }
    }

    // Maneja el arrastre continuo
    drag(mx, my) {
        if (this.dragging) {
            this.x = (mx + this.offsetX) * this.z / width;
            this.y = (my + this.offsetY) * this.z / height;
        }
    }

    // Maneja el final del arrastre
    stopDrag() {
        this.dragging = false;
    }
}

class Ball { //scene03
    constructor(p, v, a, r, colorArray, center, outerRadius) {
        this.p = p;
        this.v = v;
        this.a = a;
        this.r = r;
        this.colorArray = colorArray;
        this.center = center;
        this.outerRadius = outerRadius;
        this.angle = atan2(this.p.y - this.center.y, this.p.x - this.center.x);
        this.radius = dist(this.p.x, this.p.y, this.center.x, this.center.y);
    }

    update() {
        this.angle += 0.02;
        this.p.x = this.center.x + cos(this.angle) * this.radius;
        this.p.y = this.center.y + sin(this.angle) * this.radius;

        //un poco de ruido. mas organico
        let noiseValue = noise(this.p.x * 0.01, this.p.y * 0.01, frameCount * 0.01);
        this.radius += map(noiseValue, 0, 1, -0.5, 0.5);
    }

    draw() {
        let alpha = map(this.radius, 70, this.outerRadius, 100, 0);
        let mix = map(this.radius, 70, this.outerRadius, 0, 1);
        let c1 = this.colorArray[0];
        let c2 = this.colorArray[1];
        let ci = lerpColor(c2, c1, mix);
        fill(red(ci), green(ci), blue(ci), alpha);
        noStroke();
        circle(this.p.x, this.p.y, this.r);
    }
}

class FallingImage { //scene04
    constructor(img, x, y, speed, rotation, rotationSpeed) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.rotation = rotation;
        this.rotationSpeed = rotationSpeed;
        this.width = 100; // Ajusta estos valores según necesites
        this.height = 100;
    }

    update() {
        this.y += this.speed;
        this.rotation += this.rotationSpeed;
    }

    display() {
        push();
        translate(this.x, this.y);
        rotate(this.rotation);
        image(this.img, -this.width/2, -this.height/2, this.width, this.height);
        pop();
    }
}