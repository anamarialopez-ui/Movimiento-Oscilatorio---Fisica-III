# 📚 Cuaderno Interactivo Virtual • Física III: Movimiento Oscilatorio y M.A.S.

[![Universidad Tecnológica de Pereira](https://img.shields.io/badge/Institución-Universidad%20Tecnológica%20de%20Pereira-blue.svg)](https://www.utp.edu.co/)
[![Asignatura](https://img.shields.io/badge/Asignatura-Física%20III-purple.svg)](#)
[![PWA Ready](https://img.shields.io/badge/PWA-Offline%20Ready-success.svg)](#)
[![KaTeX](https://img.shields.io/badge/Math-KaTeX-00d084.svg)](https://katex.org/)
[![License](https://img.shields.io/badge/Licencia-Educativa%20%2F%20MIT-orange.svg)](#derechos-de-autor-y-licencia)

Aplicación web interactiva tipo **Single Page Application (SPA)** y **Progressive Web App (PWA)** desarrollada como cuaderno digital para el aprendizaje visual, conceptual y experimental del **Movimiento Oscilatorio** y el **Movimiento Armónico Simple (M.A.S.)**.

El proyecto integra visualizaciones cartesianas interactivas estilo **GeoGebra**, simulaciones físicas numéricas en tiempo real, renderizado matemático de alta precisión con **KaTeX**, ejercicios prácticos resueltos paso a paso y diseño ergonómico de cuaderno de notas.

---

## 🏛️ Contexto Académico

Este proyecto constituye un trabajo académico desarrollado en el marco de la asignatura **Física III** de la **Universidad Tecnológica de Pereira (UTP)**.

- **Institución:** Universidad Tecnológica de Pereira (UTP)
- **Facultad / Programa:** Ingeniería Industrial
- **Asignatura:** Física III
- **Docente Titular:** Prof. Néstor Fabio Montoya

### 👥 Integrantes / Autoras del Proyecto:
- **Ana María López Giraldo**
- **María Alejandra Ramírez Montes**
- **Daniela Alzate Jiménez**

---

## ✨ Características Principales

- 📖 **Experiencia de Cuaderno Digital:** Navegación fluida a través de 15 páginas temáticas con diseño skeumórfico moderno, efectos de sonido de cambio de página y vista previa en cuadrícula (*Overview Grid*).
- 📐 **Motor Gráfico Estilo GeoGebra:** Planos cartesianos dinámicos en HTML5 Canvas con zoom, paneo, trazado de funciones vectoriales y curvas de posición $x(t)$, velocidad $v(t)$ y aceleración $a(t)$.
- 🔬 **Simulaciones Físicas en Tiempo Real:** Modelado interactivo de sistemas oscilatorios (masa-resorte, péndulo simple) con parámetros ajustables (amplitud, masa, constante del resorte $k$, amortiguamiento y desfase inicial $\phi$).
- 🧮 **Formulación Matemática Rigurosa:** Ecuaciones, deducciones y demostraciones renderizadas nítidamente mediante el motor tipográfico **KaTeX**.
- 📝 **Resolución de Problemas Paso a Paso:** Banco interactivo de ejercicios de aplicación con desglose analítico, cálculo de parámetros y comprobación gráfica.
- 📱 **Soporte PWA (Progressive Web App):** Instalable en dispositivos móviles y de escritorio, con funcionamiento sin conexión (*offline*) gracias a su Service Worker (`sw.js`).
- 🎨 **Accesibilidad y Personalización:** Selector de tamaño de fuente para lectura cómoda, modo pantalla completa e interfaz adaptativa (*responsive design*).

---

## 📑 Contenido del Cuaderno (15 Páginas)

1. **Página 1:** Portada e Identificación Institucional (UTP).
2. **Página 2:** Introducción al Movimiento Periódico y Oscilatorio.
3. **Página 3:** Cinemática del Movimiento Armónico Simple (M.A.S.): Posición $x(t)$, Amplitud y Fase.
4. **Página 4:** Derivada de la Posición: Velocidad $v(t)$ y Aceleración $a(t)$ en el M.A.S.
5. **Página 5:** Gráficas Comparativas Interactivas ($x$, $v$, $a$) con desfases de $\pi/2$ y $\pi$.
6. **Página 6:** Dinámica del M.A.S. y Ley de Hooke ($F = -kx$).
7. **Página 7:** Energía Mecánica en el M.A.S. (Cinética, Potencial Elástica y Conservación).
8. **Página 8:** Gráficas de Energía en Función de la Posición y del Tiempo.
9. **Página 9:** El Péndulo Simple y el Péndulo Físico.
10. **Página 10:** Oscilaciones Amortiguadas y Forzadas (Resonancia).
11. **Página 11:** Ejercicio Práctico 1: Determinación de Parámetros Cinemáticos.
12. **Página 12:** Ejercicio Práctico 2: Balance Energético y Velocidad Máxima.
13. **Página 13:** Ejercicio Práctico 3: Sistema Masa-Resorte Vertical con Fricción.
14. **Página 14:** Glosario Técnico y Formulario Resumen.
15. **Página 15:** Conclusiones, Referencias Bibliográficas y Créditos.

---

## 💻 Tecnologías Utilizadas

- **Frontend Core:** HTML5 semántico, Vanilla CSS3 (diseño responsivo, Grid, Flexbox, variables CSS) y JavaScript (ES6+ modular).
- **Matemáticas:** [KaTeX](https://katex.org/) para renderizado de fórmulas TeX/LaTeX.
- **Gráficos e Iconografía:** HTML5 Canvas API (renderizadores personalizados) y [Lucide Icons](https://lucide.dev/).
- **Almacenamiento y Offline:** Service Workers Cache API & Web App Manifest.

---

## 📂 Estructura del Repositorio

```text
├── css/
│   ├── geogebra.css            # Estilos del motor cartesiano interactivo
│   ├── main.css                # Variables de diseño, reset y tipografía global
│   ├── notebook.css            # Maquetación del cuaderno, hojas y transiciones
│   └── simulation.css          # Estilos de controles y lienzos de simulación
├── imagenes/                   # Ilustraciones, diagramas y portada del cuaderno
├── js/
│   ├── data/
│   │   ├── content.js          # Estructura teórica de cada página del cuaderno
│   │   ├── exercises.js        # Banco de problemas y resoluciones paso a paso
│   │   └── glossary-ref.js     # Glosario de términos y referencias bibliográficas
│   ├── app.js                  # Inicialización de la aplicación y eventos de UI
│   ├── geogebra-engine.js      # Motor de graficación matemática y plano cartesiano
│   ├── notebook.js             # Lógica de navegación, paginación e interacción
│   ├── physics-simulation.js   # Motores de simulación física en tiempo real
│   └── timeline-mindmap.js     # Componentes visuales interactivos
├── index.html                  # Punto de entrada principal de la aplicación SPA
├── manifest.json               # Configuración de Progressive Web App (PWA)
├── sw.js                       # Service Worker para funcionamiento offline
└── README.md                   # Documentación oficial del proyecto
```

---

## 🚀 Instalación y Ejecución Local

Para visualizar y ejecutar el proyecto en tu entorno local no se requiere la instalación de gestores de paquetes pesados (como `npm`), ya que fue construido con tecnologías web estándar:

### Opción 1: Con extensión Live Server (Recomendada)
1. Clona este repositorio o descarga el código fuente:
   ```bash
   git clone https://github.com/TU-USUARIO/NOMBRE-DEL-REPOSITORIO.git
   ```
2. Abre la carpeta del proyecto en **Visual Studio Code** u otro editor.
3. Haz clic derecho sobre el archivo `index.html` y selecciona **"Open with Live Server"**.
4. La aplicación se abrirá automáticamente en `http://127.0.0.1:5500`.

### Opción 2: Servidor local simple con Python
Si tienes Python instalado, ejecuta en la terminal dentro de la carpeta del proyecto:
```bash
# Python 3
python -m http.server 8000
```
Luego abre tu navegador en `http://localhost:8000`.

---

## 🌐 Publicación en GitHub Pages

Este proyecto está 100% optimizado para ser desplegado de forma gratuita e inmediata en **GitHub Pages**:

1. Sube tu código al repositorio en GitHub.
2. Ve a la pestaña **Settings** (Configuración) de tu repositorio.
3. En el menú lateral izquierdo, haz clic en **Pages**.
4. En la sección **Build and deployment > Branch**, selecciona la rama `main` (o `master`) y la carpeta `/(root)`.
5. Haz clic en **Save**. En un par de minutos tu cuaderno interactivo estará disponible públicamente en la URL asignada.

---

## ⚖️ Derechos de Autor y Licencia

© **2026 - Universidad Tecnológica de Pereira (UTP)**

Este proyecto es un trabajo académico original desarrollado para la asignatura **Física III** bajo la tutoría y orientación del docente **Prof. Néstor Fabio Montoya**.

**Autoría y Desarrollo:**
- **Ana María López Giraldo**
- **María Alejandra Ramírez Montes**
- **Daniela Alzate Jiménez**

> **Aviso de Propiedad Intelectual:**
> Todos los derechos académicos y de autoría sobre el diseño pedagógico, código fuente y recopilación didáctica pertenecen a las autoras mencionadas y a la Universidad Tecnológica de Pereira. Se autoriza el uso del código con fines educativos, de divulgación científica y de aprendizaje, citando debidamente la fuente y la autoría original.
