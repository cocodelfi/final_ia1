# Human Experience

> *"Te invito a un viaje por el cosmos interior y exterior, donde las estrellas son parte de nosotros y nosotros, universos."*

**Human Experience** es una obra interactiva audiovisual desarrollada con **p5.js** y **p5.sound**. El proyecto propone un recorrido por cinco escenas que exploran la relación entre el cosmos y la experiencia humana a través de sistemas de partículas, sonido reactivo e imágenes históricas.

---

## 🎮 Controles y Navegación

Las escenas **no avanzan automáticamente**. Puedes recorrer la experiencia de dos maneras:

* **Teclado (en cualquier momento):**
  * Presiona **`D`** para avanzar a la siguiente escena.
  * Presiona **`A`** para retroceder a la escena anterior.
  * *(La navegación es circular: al avanzar desde la última escena volverás al menú principal).*
* **Mouse (en la pantalla inicial `00`):**
  * Utiliza la barra de navegación inferior para abrir la ventana de información o saltar directamente a cualquiera de las escenas (`01` a `04`).

> **Nota sobre el audio:** Por políticas de los navegadores web modernos, es recomendable hacer al menos un clic con el mouse en la pantalla inicial para habilitar la reproducción de sonido antes de navegar con el teclado.

---

## ✨ Recorrido por las Escenas

| Escena | Nombre | Interacción | Descripción |
| :--- | :--- | :--- | :--- |
| **00** | **Información** | **Clic** en el menú inferior | Pantalla de inicio con un agujero negro que atrae partículas estelares. El botón `00 - información` despliega los créditos y las instrucciones de la obra. |
| **01** | **Exploración** | **Deslizar el mouse** | Viaje espacial a través de un campo de estrellas. La velocidad del recorrido y la intensidad del sonido varían según la distancia del cursor respecto al centro de la pantalla. |
| **02** | **Conexión** | **Presionar y arrastrar** | Red de constelaciones dinámicas. Al arrastrar las estrellas con el mouse se modifican sus conexiones espaciales y se activa el paisaje sonoro. |
| **03** | **Supernova** | **Clic en cualquier punto** | Cada clic genera una explosión de partículas en espiral con paletas de colores aleatorias y dispara una nota musical al azar. |
| **04** | **Unión** | **Contemplativa** | Lluvia de fotografías icónicas de la humanidad y el universo acompañada de música ambiental y una reflexión final. |

---

## 🚀 Cómo ejecutar el proyecto localmente

Dado que el proyecto carga archivos externos de audio, imágenes y tipografías mediante `preload()`, **no debe abrirse haciendo doble clic directamente sobre el archivo `index.html`** (el navegador bloqueará los recursos por políticas de seguridad CORS). Debe ejecutarse mediante un servidor local:

### Opción 1: Usando Visual Studio Code (Recomendado)
1. Clona o descarga este repositorio:
   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   ```
2. Abre la carpeta del proyecto en **Visual Studio Code**.
3. Instala la extensión **Live Server** (o **p5.vscode**).
4. Haz clic derecho sobre el archivo `index.html` y selecciona **"Open with Live Server"** (o presiona el botón **Go Live** en la esquina inferior derecha de VS Code).

### Opción 2: Usando GitHub Pages (Online)
Si habilitas **GitHub Pages** en la configuración de este repositorio (`Settings > Pages > Deploy from a branch > main`), cualquier persona podrá experimentar la obra directamente desde el enlace web sin necesidad de instalar nada.

---

## 🛠️ Tecnologías utilizadas

* [p5.js](https://p5js.org/) (v1.9.0)
* [p5.sound](https://p5js.org/reference/#/libraries/p5.sound) (v1.0.1)
* HTML5 / CSS3 / JavaScript (ES6)

---

## ✒️ Autoría

* **Autora:** Constanza D. Schweers
* **Materia:** Informática Aplicada I (2024)
