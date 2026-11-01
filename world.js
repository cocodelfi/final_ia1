
class World {
    constructor() {
        this.scenes = [];
        this.currentScene = null;
        this.currentIndex = 0;
    }

    agregarScene(scene) {
        this.scenes.push(scene);
        if (!this.currentScene) { this.currentScene = scene; }
    }

    proximaScene() {
        let i = (this.currentIndex + 1) % this.scenes.length;
        this.currentScene = this.scenes[i];
        this.currentIndex = i;
        this.elegirScene(i);
    }

    previaScene() {
        let i = (this.currentIndex - 1);
        if (i < 0) { i = this.scenes.length - 1; }
        this.currentScene = this.scenes[i];
        this.currentIndex = i;
        this.elegirScene(i);
    }

    elegirScene(i) {
        if (this.scenes.length == 0) {
            print('Error, no hay escenas en la lista de escenas');
            return
        }

        if (i >= this.scenes.length || i < 0) {
            print(`Error, la escena ${i} no existe`);
            return
        }

        this.currentScene = this.scenes[i];
        this.currentIndex = i;
    }

    draw() {
        if (this.currentScene) {
            this.currentScene.draw();
        } else {
            console.error('Error, no hay pantalla actual definida');
        }
    }

    keyTyped() {
        if (this.currentScene) {
            this.currentScene.keyTyped();
        } else {
            console.error('Error, no hay pantalla actual definida');
        }
    }

    windowResized() {
        if (this.currentScene) {
            this.currentScene.windowResized();
        }
    }
}