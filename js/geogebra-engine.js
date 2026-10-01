/**
 * CUADERNO VIRTUAL INTERACTIVO - FÍSICA III
 * MOTOR DE PLANO CARTESIANO INTERACTIVO AVANZADO ESTILO GEOGEBRA
 * 
 * Ecuaciones implementadas y evaluadas en tiempo real:
 * - x(t) = A * sen(omega * t + alpha)
 * - v(t) = dx/dt = omega * A * cos(omega * t + alpha)
 * - a(t) = dv/dt = -omega^2 * A * sen(omega * t + alpha)
 * - v(x) = ± omega * sqrt(A^2 - x^2)  [Espacio de Fases / Trayectoria Elíptica]
 * - a(x) = -omega^2 * x                [Relación Lineal de Restitución de Hooke]
 * - omega = 2*pi/T = 2*pi*f            [Sincronización Bidireccional de Período y Frecuencia]
 * 
 * Características visuales e interactivas:
 * - Cuadrícula doble: mayor y menor milimetrada (estilo papel milimetrado de alta precisión)
 * - Reglas graduadas sobre ambos ejes con marcas principales, medias, milimétricas y números adaptativos
 * - Barra flotante con botones e iconos elegantes (Lucide / SVG):
 *   * Zoom in / Zoom out
 *   * Desplazar lienzo (Pan / Arrastrar)
 *   * Restablecer vista inicial
 *   * Selector inteligente de objetos
 *   * Re-escalamiento manual arrastrando sobre los ejes con mouse o gestos táctiles (pinch/drag)
 *   * Paleta interactiva de estilos: color, grosor, trazo (sólido, trazos, puntos) y vectores
 *   * Exportación instantánea a imagen PNG
 * - Modos de Gráfica:
 *   1) Cinemática Temporal: x(t), v(t), a(t) simultáneas o independientes
 *   2) Espacio de Fases: v(x) vs x
 *   3) Dinámica de Hooke: a(x) vs x
 *   4) Fasor Rotatorio Trigonométrico acoplado
 * - Panel de evaluación matemática viva en tiempo real con KaTeX
 */

class GeoGebraPlane {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.options = Object.assign({
      originX: 130,
      originY: 220,
      scaleX: 95,   // px por segundo (o por metro según el modo)
      scaleY: 105,  // px por metro (o por m/s)
      showMinorGrid: true,
      showMajorGrid: true,
      showAxes: true,
      showRules: true
    }, options);

    // Estado del plano
    this.originX = this.options.originX;
    this.originY = this.options.originY;
    this.scaleX = this.options.scaleX;
    this.scaleY = this.options.scaleY;

    // Modo de visualización: 'kinematics', 'phase-space', 'accel-pos', 'phasor'
    this.currentMode = 'kinematics';

    // Herramienta activa: 'select', 'pan', 'scale-x', 'scale-y'
    this.activeTool = 'select';

    // Parámetros físicos del M.A.S.
    this.params = {
      A: 1.0,          // Amplitud en metros
      omega: 2.0,      // Frecuencia angular en rad/s
      T: Math.PI,      // Período T = 2*pi / omega = 3.1416 s
      f: 1 / Math.PI,  // Frecuencia f = 1 / T = 0.3183 Hz
      alpha: 0.0,      // Fase inicial en rad (para sen(omega*t + alpha))
      time: 0.0,       // Tiempo actual en segundos
      isPlaying: true,
      playbackSpeed: 1.0,
      baseFunc: 'sin', // 'sin' (predeterminado según solicitud) o 'cos'
      mass: 1.0        // Masa para cálculos energéticos (kg)
    };

    // Estilos gráficos personalizados
    this.styles = {
      xColor: '#7c3aed',     // Púrpura Imperial para x(t)
      vColor: '#059669',     // Verde Esmeralda para v(t)
      aColor: '#dc2626',     // Rojo Carmesí para a(t)
      phaseColor: '#2563eb', // Azul Eléctrico para v(x)
      accelColor: '#d97706', // Ámbar para a(x)
      phasorColor: '#7c3aed',
      activeCurve: 'x',      // 'x', 'v', 'a'
      lineWidth: 2.5,
      dashStyle: 'solid',    // 'solid', 'dashed', 'dotted'
      showVectors: true,
      showPhasor: true,
      showGridMinor: true,
      curvesVisible: {
        x: true,
        v: true,
        a: false
      }
    };

    this.initDOM();
    this.bindEvents();
    this.resize();
    this.updateMathCard();
    this.startLoop();
  }

  initDOM() {
    this.container.classList.add('geogebra-container');
    this.container.innerHTML = `
      <!-- Pestañas de Modos de Visualización del Plano -->
      <div class="ggb-mode-tabs">
        <button class="btn-ggb-mode active" data-mode="kinematics" id="tab-mode-kinematics">
          <i data-lucide="activity"></i> Cinemática: x(t), v(t), a(t)
        </button>
        <button class="btn-ggb-mode" data-mode="phase-space" id="tab-mode-phase">
          <i data-lucide="orbit"></i> Espacio de Fases: v(x)
        </button>
        <button class="btn-ggb-mode" data-mode="accel-pos" id="tab-mode-accel">
          <i data-lucide="trending-down"></i> Dinámica: a(x) = -ω²x
        </button>
        <button class="btn-ggb-mode" data-mode="phasor" id="tab-mode-phasor">
          <i data-lucide="compass"></i> Fasor Rotatorio & Onda
        </button>
      </div>

      <!-- Barra de Herramientas Flotante Estilo GeoGebra (Island Toolbar) -->
      <div class="geogebra-floating-toolbar">
        <button class="btn-ggb-tool ${this.activeTool === 'select' ? 'active' : ''}" data-tool="select" data-tooltip="Puntero / Seleccionar objeto">
          <i data-lucide="mouse-pointer"></i>
        </button>
        <button class="btn-ggb-tool ${this.activeTool === 'pan' ? 'active' : ''}" data-tool="pan" data-tooltip="Desplazar lienzo (Arrastrar)">
          <i data-lucide="hand"></i>
        </button>
        <div class="ggb-tool-divider"></div>
        <button class="btn-ggb-tool" data-action="zoom-in" data-tooltip="Acercar (Zoom In)">
          <i data-lucide="zoom-in"></i>
        </button>
        <button class="btn-ggb-tool" data-action="zoom-out" data-tooltip="Alejar (Zoom Out)">
          <i data-lucide="zoom-out"></i>
        </button>
        <button class="btn-ggb-tool" data-action="reset-view" data-tooltip="Restablecer Vista Original">
          <i data-lucide="rotate-ccw"></i>
        </button>
        <div class="ggb-tool-divider"></div>
        <button class="btn-ggb-tool" data-action="toggle-palette" data-tooltip="Paleta de Estilos Gráficos">
          <i data-lucide="palette"></i>
        </button>
        <button class="btn-ggb-tool" data-action="toggle-play" data-tooltip="Pausar / Reanudar Animación">
          <i data-lucide="pause" id="ggb-play-icon"></i>
        </button>
        <button class="btn-ggb-tool" data-action="export-image" data-tooltip="Exportar Gráfica PNG">
          <i data-lucide="camera"></i>
        </button>
      </div>

      <!-- Leyenda de Curvas y Modos -->
      <div class="geogebra-plot-legend" id="ggb-legend-box">
        <div id="legend-kinematics-items">
          <label class="legend-checkbox-item">
            <input type="checkbox" id="chk-plot-x" checked>
            <span class="legend-color-dot" style="background: ${this.styles.xColor};" id="dot-color-x"></span>
            <span>$x(t) = A\\operatorname{sen}(\\omega t + \\alpha)$</span>
          </label>
          <label class="legend-checkbox-item">
            <input type="checkbox" id="chk-plot-v" checked>
            <span class="legend-color-dot" style="background: ${this.styles.vColor};" id="dot-color-v"></span>
            <span>$v(t) = \\omega A\\cos(\\omega t + \\alpha)$</span>
          </label>
          <label class="legend-checkbox-item">
            <input type="checkbox" id="chk-plot-a">
            <span class="legend-color-dot" style="background: ${this.styles.aColor};" id="dot-color-a"></span>
            <span>$a(t) = -\\omega^2 A\\operatorname{sen}(\\omega t + \\alpha)$</span>
          </label>
        </div>
        <div id="legend-phase-items" style="display: none;">
          <span style="font-size: 0.8rem; font-weight: 700; color: #2563eb;">
            $v(x) = \\pm \\omega \\sqrt{A^2 - x^2}$
          </span>
          <span style="font-size: 0.72rem; color: #5b21b6;">Elipse de Fase de Conservación de Energía</span>
        </div>
        <div id="legend-accel-items" style="display: none;">
          <span style="font-size: 0.8rem; font-weight: 700; color: #d97706;">
            $a(x) = -\\omega^2 \\cdot x$
          </span>
          <span style="font-size: 0.72rem; color: #5b21b6;">Relación de Restitución Lineal de Hooke</span>
        </div>
      </div>

      <!-- Popup Flotante de Paleta de Estilos -->
      <div class="geogebra-palette-popup" id="ggb-palette-modal">
        <div class="palette-section-title">Elemento a Personalizar</div>
        <div style="display: flex; gap: 4px; margin-bottom: 8px;">
          <button class="btn-stroke-opt active" data-target-curve="x" id="btn-target-x">x(t)</button>
          <button class="btn-stroke-opt" data-target-curve="v" id="btn-target-v">v(t)</button>
          <button class="btn-stroke-opt" data-target-curve="a" id="btn-target-a">a(t)</button>
        </div>

        <div class="palette-section-title">Color de Trazo</div>
        <div class="palette-colors-row">
          <div class="palette-color-chip active" data-color="#7c3aed" style="background: #7c3aed;" title="Púrpura"></div>
          <div class="palette-color-chip" data-color="#2563eb" style="background: #2563eb;" title="Azul Eléctrico"></div>
          <div class="palette-color-chip" data-color="#059669" style="background: #059669;" title="Verde Esmeralda"></div>
          <div class="palette-color-chip" data-color="#dc2626" style="background: #dc2626;" title="Rojo Carmesí"></div>
          <div class="palette-color-chip" data-color="#d97706" style="background: #d97706;" title="Ámbar"></div>
          <div class="palette-color-chip" data-color="#db2777" style="background: #db2777;" title="Rosa Neón"></div>
          <div class="palette-color-chip" data-color="#1e293b" style="background: #1e293b;" title="Grafito"></div>
        </div>

        <div class="palette-section-title" style="margin-top: 8px;">Grosor de Línea</div>
        <div class="palette-stroke-row">
          <button class="btn-stroke-opt" data-width="1.5">Fino (1.5)</button>
          <button class="btn-stroke-opt active" data-width="2.5">Medio (2.5)</button>
          <button class="btn-stroke-opt" data-width="4.0">Grueso (4.0)</button>
        </div>

        <div class="palette-section-title" style="margin-top: 8px;">Estilo de Trazo</div>
        <div class="palette-dash-row">
          <button class="btn-dash-opt active" data-dash="solid">Sólido</button>
          <button class="btn-dash-opt" data-dash="dashed">Trazos</button>
          <button class="btn-dash-opt" data-dash="dotted">Punteado</button>
        </div>

        <div class="palette-section-title" style="margin-top: 8px;">Opciones Avanzadas</div>
        <label class="legend-checkbox-item" style="font-size: 0.74rem;">
          <input type="checkbox" id="chk-toggle-vectors" checked>
          <span>Mostrar Vectores en el punto activo</span>
        </label>
        <label class="legend-checkbox-item" style="font-size: 0.74rem;">
          <input type="checkbox" id="chk-toggle-minor-grid" checked>
          <span>Cuadrícula menor (papel milimetrado)</span>
        </label>
      </div>

      <!-- Badge de Escalado de Ejes Activo -->
      <div class="ggb-scaling-badge" id="ggb-scale-badge">
        Re-escalando eje con el mouse/dedo
      </div>

      <!-- Barra de Estado con Coordenadas y Escala -->
      <div class="geogebra-status-bar" id="ggb-status-text">
        Escala: [X: 1s = ${Math.round(this.scaleX)}px] [Y: 1m = ${Math.round(this.scaleY)}px]
      </div>

      <!-- Canvas de Dibujo GeoGebra -->
      <div class="geogebra-canvas-wrapper" id="ggb-canvas-wrap">
        <canvas class="geogebra-canvas" id="ggb-canvas"></canvas>
      </div>

      <!-- Barra Inferior de Control de Parámetros Físicos -->
      <div class="geogebra-params-bar">
        <!-- Amplitud A -->
        <div class="param-slider-item">
          <span>Amplitud ($A$):</span>
          <input type="range" id="param-A" min="0.2" max="3.0" step="0.1" value="1.0">
          <span class="param-slider-val" id="val-A">1.0 m</span>
        </div>

        <!-- Frecuencia angular Omega -->
        <div class="param-slider-item">
          <span>Pulsación ($\\omega$):</span>
          <input type="range" id="param-omega" min="0.5" max="8.0" step="0.1" value="2.0">
          <span class="param-slider-val" id="val-omega">2.0 rad/s</span>
        </div>

        <!-- Período T (Bidireccional) -->
        <div class="param-slider-item">
          <span>Período ($T = \\frac{2\\pi}{\\omega}$):</span>
          <input type="range" id="param-T" min="0.78" max="12.56" step="0.05" value="3.14">
          <span class="param-slider-val" id="val-T">3.14 s</span>
        </div>

        <!-- Fase Inicial Alpha -->
        <div class="param-slider-item">
          <span>Fase ($\\alpha$):</span>
          <input type="range" id="param-alpha" min="-3.14" max="3.14" step="0.05" value="0.0">
          <span class="param-slider-val" id="val-alpha">0.00 rad</span>
          <div class="phase-presets-row">
            <button class="btn-phase-preset" data-phase="0">0</button>
            <button class="btn-phase-preset" data-phase="0.785">π/4</button>
            <button class="btn-phase-preset" data-phase="1.571">π/2</button>
            <button class="btn-phase-preset" data-phase="3.142">π</button>
          </div>
        </div>

        <!-- Tiempo Actual t -->
        <div class="param-slider-item">
          <span>Tiempo ($t$):</span>
          <input type="range" id="param-t" min="0.0" max="6.28" step="0.02" value="0.0">
          <span class="param-slider-val" id="val-t">0.00 s</span>
        </div>

        <!-- Base Función: Seno vs Coseno -->
        <div class="param-slider-item">
          <span style="font-size: 0.76rem;">Base:</span>
          <button class="btn-stroke-opt active" id="btn-base-sin" style="padding: 3px 8px; font-size: 0.74rem;">sen</button>
          <button class="btn-stroke-opt" id="btn-base-cos" style="padding: 3px 8px; font-size: 0.74rem;">cos</button>
        </div>
      </div>

      <!-- Tarjeta de Evaluación Matemática Viva con KaTeX -->
      <div class="geogebra-math-card" id="ggb-live-math-card">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap;">
          <div style="font-weight: 700; color: #4c1d95; font-size: 0.88rem; display: flex; align-items: center; gap: 6px;">
            <i data-lucide="calculator" style="color: #7c3aed; width: 16px; height: 16px;"></i> 
            Valores Instantáneos y Relaciones Cinemáticas en Vivo
          </div>
          <div style="font-size: 0.75rem; color: #6d28d9; font-weight: 600;" id="math-mode-badge">
            Modo: Cinemática Temporal
          </div>
        </div>

        <div class="ggb-math-grid">
          <!-- Elongación x(t) -->
          <div class="ggb-math-metric" style="border-left: 3px solid var(--color-primary);">
            <div class="ggb-math-metric-label">
              <span>Elongación Instantánea</span>
              <span>$x(t)$</span>
            </div>
            <div class="ggb-math-metric-value" id="live-val-x" style="color: #7c3aed;">+0.00 m</div>
            <div class="ggb-math-metric-sub" id="live-expr-x">$x(t) = A\\operatorname{sen}(\\omega t + \\alpha)$</div>
          </div>

          <!-- Velocidad v(t) / v(x) -->
          <div class="ggb-math-metric" style="border-left: 3px solid #059669;">
            <div class="ggb-math-metric-label">
              <span>Velocidad Instantánea</span>
              <span>$v(t)$ ó $v(x)$</span>
            </div>
            <div class="ggb-math-metric-value" id="live-val-v" style="color: #059669;">+2.00 m/s</div>
            <div class="ggb-math-metric-sub" id="live-expr-v">$v(x) = \\pm \\omega \\sqrt{A^2 - x^2}$</div>
          </div>

          <!-- Aceleración a(t) / a(x) -->
          <div class="ggb-math-metric" style="border-left: 3px solid #dc2626;">
            <div class="ggb-math-metric-label">
              <span>Aceleración Instantánea</span>
              <span>$a(t)$ ó $a(x)$</span>
            </div>
            <div class="ggb-math-metric-value" id="live-val-a" style="color: #dc2626;">-0.00 m/s²</div>
            <div class="ggb-math-metric-sub" id="live-expr-a">$a(x) = -\\omega^2 \\cdot x$</div>
          </div>

          <!-- Parámetros Frecuenciales y Energéticos -->
          <div class="ggb-math-metric" style="border-left: 3px solid #2563eb;">
            <div class="ggb-math-metric-label">
              <span>Frecuencia y Período</span>
              <span>$\\omega, f, T$</span>
            </div>
            <div class="ggb-math-metric-value" id="live-val-frec" style="font-size: 0.85rem; color: #2563eb;">
              f = 0.32 Hz | T = 3.14 s
            </div>
            <div class="ggb-math-metric-sub">$\\omega = \\frac{2\\pi}{T} = 2\\pi f$</div>
          </div>
        </div>
      </div>
    `;

    this.canvasWrapper = this.container.querySelector('#ggb-canvas-wrap');
    this.canvas = this.container.querySelector('#ggb-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.statusText = this.container.querySelector('#ggb-status-text');
    this.paletteModal = this.container.querySelector('#ggb-palette-modal');
    this.scaleBadge = this.container.querySelector('#ggb-scale-badge');

    // Inicializar iconos de Lucide
    if (window.lucide) {
      window.lucide.createIcons({ root: this.container });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => this.resize());

    // Pestañas de modo
    this.container.querySelectorAll('.btn-ggb-mode').forEach(btn => {
      btn.addEventListener('click', () => {
        this.container.querySelectorAll('.btn-ggb-mode').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.setMode(btn.dataset.mode);
      });
    });

    // Herramientas de la barra flotante
    this.container.querySelectorAll('.btn-ggb-tool[data-tool]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.container.querySelectorAll('.btn-ggb-tool[data-tool]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeTool = btn.dataset.tool;
        this.updateCursor();
      });
    });

    // Acciones de zoom y reset
    this.container.querySelector('[data-action="zoom-in"]').addEventListener('click', () => this.zoom(1.25));
    this.container.querySelector('[data-action="zoom-out"]').addEventListener('click', () => this.zoom(0.8));
    this.container.querySelector('[data-action="reset-view"]').addEventListener('click', () => this.resetView());
    
    // Toggle paleta de estilos
    this.container.querySelector('[data-action="toggle-palette"]').addEventListener('click', () => {
      this.paletteModal.classList.toggle('open');
    });

    // Exportar Imagen PNG
    this.container.querySelector('[data-action="export-image"]').addEventListener('click', () => this.exportPNG());

    // Play / Pause animación
    const playBtn = this.container.querySelector('[data-action="toggle-play"]');
    playBtn.addEventListener('click', () => {
      this.params.isPlaying = !this.params.isPlaying;
      const icon = playBtn.querySelector('i');
      if (icon) {
        icon.setAttribute('data-lucide', this.params.isPlaying ? 'pause' : 'play');
        if (window.lucide) window.lucide.createIcons({ root: playBtn });
      }
    });

    // Checkboxes de curvas
    this.container.querySelector('#chk-plot-x').addEventListener('change', (e) => {
      this.styles.curvesVisible.x = e.target.checked;
    });
    this.container.querySelector('#chk-plot-v').addEventListener('change', (e) => {
      this.styles.curvesVisible.v = e.target.checked;
    });
    this.container.querySelector('#chk-plot-a').addEventListener('change', (e) => {
      this.styles.curvesVisible.a = e.target.checked;
    });

    // Opciones avanzadas de paleta
    this.container.querySelector('#chk-toggle-vectors').addEventListener('change', (e) => {
      this.styles.showVectors = e.target.checked;
    });
    this.container.querySelector('#chk-toggle-minor-grid').addEventListener('change', (e) => {
      this.styles.showGridMinor = e.target.checked;
    });

    // Selección de curva activa para estilizar
    this.paletteModal.querySelectorAll('[data-target-curve]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.paletteModal.querySelectorAll('[data-target-curve]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.styles.activeCurve = btn.dataset.targetCurve;
      });
    });

    // Paleta de colores
    this.paletteModal.querySelectorAll('.palette-color-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        this.paletteModal.querySelectorAll('.palette-color-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const color = chip.dataset.color;
        if (this.styles.activeCurve === 'x') {
          this.styles.xColor = color;
          const dot = this.container.querySelector('#dot-color-x');
          if (dot) dot.style.background = color;
        } else if (this.styles.activeCurve === 'v') {
          this.styles.vColor = color;
          const dot = this.container.querySelector('#dot-color-v');
          if (dot) dot.style.background = color;
        } else if (this.styles.activeCurve === 'a') {
          this.styles.aColor = color;
          const dot = this.container.querySelector('#dot-color-a');
          if (dot) dot.style.background = color;
        }
      });
    });

    // Paleta de grosor
    this.paletteModal.querySelectorAll('.btn-stroke-opt[data-width]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.paletteModal.querySelectorAll('.btn-stroke-opt[data-width]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.styles.lineWidth = parseFloat(btn.dataset.width);
      });
    });

    // Paleta de estilo punteado
    this.paletteModal.querySelectorAll('.btn-dash-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        this.paletteModal.querySelectorAll('.btn-dash-opt').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.styles.dashStyle = btn.dataset.dash;
      });
    });

    // Sliders de Parámetros Físicos con Sincronización Bidireccional
    const inputA = this.container.querySelector('#param-A');
    const valA = this.container.querySelector('#val-A');
    inputA.addEventListener('input', (e) => {
      this.params.A = parseFloat(e.target.value);
      valA.textContent = `${this.params.A.toFixed(1)} m`;
      this.updateMathCard();
    });

    const inputOmega = this.container.querySelector('#param-omega');
    const valOmega = this.container.querySelector('#val-omega');
    const inputT = this.container.querySelector('#param-T');
    const valT = this.container.querySelector('#val-T');

    inputOmega.addEventListener('input', (e) => {
      const omega = parseFloat(e.target.value);
      this.params.omega = omega;
      this.params.T = (2 * Math.PI) / omega;
      this.params.f = omega / (2 * Math.PI);
      valOmega.textContent = `${omega.toFixed(1)} rad/s`;
      inputT.value = this.params.T.toFixed(2);
      valT.textContent = `${this.params.T.toFixed(2)} s`;
      this.updateMathCard();
    });

    inputT.addEventListener('input', (e) => {
      const T = parseFloat(e.target.value);
      this.params.T = T;
      this.params.omega = (2 * Math.PI) / T;
      this.params.f = 1 / T;
      valT.textContent = `${T.toFixed(2)} s`;
      inputOmega.value = this.params.omega.toFixed(1);
      valOmega.textContent = `${this.params.omega.toFixed(1)} rad/s`;
      this.updateMathCard();
    });

    const inputAlpha = this.container.querySelector('#param-alpha');
    const valAlpha = this.container.querySelector('#val-alpha');
    inputAlpha.addEventListener('input', (e) => {
      this.params.alpha = parseFloat(e.target.value);
      valAlpha.textContent = `${this.params.alpha.toFixed(2)} rad`;
      this.updateMathCard();
    });

    // Botones de presets de fase (0, π/4, π/2, π)
    this.container.querySelectorAll('.btn-phase-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        const val = parseFloat(btn.dataset.phase);
        this.params.alpha = val;
        inputAlpha.value = val;
        valAlpha.textContent = `${val.toFixed(2)} rad`;
        this.updateMathCard();
      });
    });

    // Slider de tiempo t
    const inputTime = this.container.querySelector('#param-t');
    const valTime = this.container.querySelector('#val-t');
    inputTime.addEventListener('input', (e) => {
      this.params.time = parseFloat(e.target.value);
      this.params.isPlaying = false;
      valTime.textContent = `${this.params.time.toFixed(2)} s`;
      const playIcon = this.container.querySelector('#ggb-play-icon');
      if (playIcon) playIcon.setAttribute('data-lucide', 'play');
      if (window.lucide) window.lucide.createIcons({ root: this.container });
      this.updateMathCard();
    });

    // Selector Base Seno vs Coseno
    const btnBaseSin = this.container.querySelector('#btn-base-sin');
    const btnBaseCos = this.container.querySelector('#btn-base-cos');
    btnBaseSin.addEventListener('click', () => {
      btnBaseSin.classList.add('active');
      btnBaseCos.classList.remove('active');
      this.params.baseFunc = 'sin';
      this.updateMathCard();
    });
    btnBaseCos.addEventListener('click', () => {
      btnBaseCos.classList.add('active');
      btnBaseSin.classList.remove('active');
      this.params.baseFunc = 'cos';
      this.updateMathCard();
    });

    // Interacciones del Canvas: Panning, Zoom y Re-escalamiento Manual de Ejes Estilo GeoGebra
    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let initialOriginX = 0;
    let initialOriginY = 0;
    let dragMode = 'pan'; // 'pan', 'scale-x', 'scale-y'
    let initialScaleX = 0;
    let initialScaleY = 0;

    const onPointerDown = (clientX, clientY) => {
      const rect = this.canvas.getBoundingClientRect();
      const px = clientX - rect.left;
      const py = clientY - rect.top;

      dragStartX = clientX;
      dragStartY = clientY;
      initialOriginX = this.originX;
      initialOriginY = this.originY;
      initialScaleX = this.scaleX;
      initialScaleY = this.scaleY;
      isDragging = true;

      const distToYAxis = Math.abs(px - this.originX);
      const distToXAxis = Math.abs(py - this.originY);

      if (distToYAxis < 22 && this.activeTool !== 'pan') {
        dragMode = 'scale-y';
        this.canvasWrapper.className = 'geogebra-canvas-wrapper scaling-y';
        this.scaleBadge.textContent = 'Re-escalando Eje Y (Amplitud/Velocidad)';
        this.scaleBadge.classList.add('show');
      } else if (distToXAxis < 22 && this.activeTool !== 'pan') {
        dragMode = 'scale-x';
        this.canvasWrapper.className = 'geogebra-canvas-wrapper scaling-x';
        this.scaleBadge.textContent = 'Re-escalando Eje X (Tiempo/Posición)';
        this.scaleBadge.classList.add('show');
      } else {
        dragMode = 'pan';
        this.canvasWrapper.className = 'geogebra-canvas-wrapper panning';
      }
    };

    const onPointerMove = (clientX, clientY) => {
      if (!isDragging) {
        const rect = this.canvas.getBoundingClientRect();
        const px = clientX - rect.left;
        const py = clientY - rect.top;
        const distToYAxis = Math.abs(px - this.originX);
        const distToXAxis = Math.abs(py - this.originY);

        if (distToYAxis < 22 && this.activeTool === 'select') {
          this.canvasWrapper.className = 'geogebra-canvas-wrapper scaling-y';
        } else if (distToXAxis < 22 && this.activeTool === 'select') {
          this.canvasWrapper.className = 'geogebra-canvas-wrapper scaling-x';
        } else {
          this.updateCursor();
        }
        return;
      }

      const dx = clientX - dragStartX;
      const dy = clientY - dragStartY;

      if (dragMode === 'pan') {
        this.originX = initialOriginX + dx;
        this.originY = initialOriginY + dy;
      } else if (dragMode === 'scale-x') {
        const factor = 1 + dx * 0.005;
        this.scaleX = Math.max(25, Math.min(450, initialScaleX * factor));
      } else if (dragMode === 'scale-y') {
        const factor = 1 - dy * 0.005;
        this.scaleY = Math.max(25, Math.min(450, initialScaleY * factor));
      }

      this.updateStatusBar();
    };

    const onPointerUp = () => {
      isDragging = false;
      this.scaleBadge.classList.remove('show');
      this.updateCursor();
    };

    this.canvas.addEventListener('mousedown', (e) => onPointerDown(e.clientX, e.clientY));
    window.addEventListener('mousemove', (e) => onPointerMove(e.clientX, e.clientY));
    window.addEventListener('mouseup', onPointerUp);

    // Gestos táctiles
    this.canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        onPointerDown(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: false });

    window.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1 && isDragging) {
        onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: false });

    window.addEventListener('touchend', onPointerUp);

    // Zoom con rueda del mouse
    this.canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const factor = e.deltaY < 0 ? 1.12 : 0.89;
      this.zoomAt(mouseX, mouseY, factor);
    }, { passive: false });
  }

  setMode(mode) {
    this.currentMode = mode;
    const legendKin = this.container.querySelector('#legend-kinematics-items');
    const legendPhase = this.container.querySelector('#legend-phase-items');
    const legendAccel = this.container.querySelector('#legend-accel-items');
    const modeBadge = this.container.querySelector('#math-mode-badge');

    if (legendKin) legendKin.style.display = (mode === 'kinematics' || mode === 'phasor') ? 'block' : 'none';
    if (legendPhase) legendPhase.style.display = (mode === 'phase-space') ? 'block' : 'none';
    if (legendAccel) legendAccel.style.display = (mode === 'accel-pos') ? 'block' : 'none';

    if (mode === 'kinematics') {
      this.originX = 130;
      this.originY = this.height / 2;
      modeBadge.textContent = 'Modo: Cinemática Temporal x(t), v(t), a(t)';
    } else if (mode === 'phase-space') {
      this.originX = this.width / 2;
      this.originY = this.height / 2;
      modeBadge.textContent = 'Modo: Espacio de Fases v(x)';
    } else if (mode === 'accel-pos') {
      this.originX = this.width / 2;
      this.originY = this.height / 2;
      modeBadge.textContent = 'Modo: Dinámica de Hooke a(x) = -ω²x';
    } else if (mode === 'phasor') {
      this.originX = Math.max(160, this.width * 0.32);
      this.originY = this.height / 2;
      modeBadge.textContent = 'Modo: Fasor Rotatorio & Onda Armónica';
    }

    this.updateStatusBar();
    this.updateMathCard();
  }

  updateCursor() {
    if (this.activeTool === 'pan') {
      this.canvasWrapper.className = 'geogebra-canvas-wrapper panning';
    } else {
      this.canvasWrapper.className = 'geogebra-canvas-wrapper';
    }
  }

  resize() {
    const rect = this.canvasWrapper.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.width = rect.width;
    this.height = rect.height || 420;

    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.ctx.resetTransform();
    this.ctx.scale(dpr, dpr);

    if (this.currentMode === 'phase-space' || this.currentMode === 'accel-pos') {
      this.originX = this.width / 2;
      this.originY = this.height / 2;
    } else if (this.currentMode === 'phasor') {
      this.originX = Math.max(160, this.width * 0.32);
      this.originY = this.height / 2;
    }

    this.updateStatusBar();
  }

  zoom(factor) {
    this.zoomAt(this.width / 2, this.height / 2, factor);
  }

  zoomAt(px, py, factor) {
    const mathX = (px - this.originX) / this.scaleX;
    const mathY = (this.originY - py) / this.scaleY;

    this.scaleX = Math.max(25, Math.min(500, this.scaleX * factor));
    this.scaleY = Math.max(25, Math.min(500, this.scaleY * factor));

    this.originX = px - mathX * this.scaleX;
    this.originY = py + mathY * this.scaleY;

    this.updateStatusBar();
  }

  resetView() {
    if (this.currentMode === 'phase-space' || this.currentMode === 'accel-pos') {
      this.originX = this.width / 2;
      this.originY = this.height / 2;
    } else if (this.currentMode === 'phasor') {
      this.originX = Math.max(160, this.width * 0.32);
      this.originY = this.height / 2;
    } else {
      this.originX = 130;
      this.originY = this.height / 2;
    }
    this.scaleX = 95;
    this.scaleY = 105;
    this.updateStatusBar();
  }

  updateStatusBar() {
    if (this.statusText) {
      if (this.currentMode === 'kinematics' || this.currentMode === 'phasor') {
        this.statusText.textContent = `Escala GeoGebra: [Eje t: 1s = ${Math.round(this.scaleX)}px] [Eje x/v/a: 1u = ${Math.round(this.scaleY)}px]`;
      } else {
        this.statusText.textContent = `Escala GeoGebra: [Eje x: 1m = ${Math.round(this.scaleX)}px] [Eje vertical: 1u = ${Math.round(this.scaleY)}px]`;
      }
    }
  }

  exportPNG() {
    const link = document.createElement('a');
    link.download = `grafica_geogebra_mas_${this.currentMode}.png`;
    link.href = this.canvas.toDataURL('image/png');
    link.click();
  }

  // Bucle de animación suave a 60 FPS
  startLoop() {
    let lastTime = performance.now();

    const frame = (now) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      if (this.params.isPlaying) {
        this.params.time += dt * 0.9 * this.params.playbackSpeed;
        const maxCycleTime = 2 * this.params.T;
        if (this.params.time > maxCycleTime) {
          this.params.time = 0;
        }
        const timeInput = this.container.querySelector('#param-t');
        const timeDisplay = this.container.querySelector('#val-t');
        if (timeInput) {
          timeInput.max = maxCycleTime.toFixed(2);
          timeInput.value = this.params.time;
        }
        if (timeDisplay) timeDisplay.textContent = `${this.params.time.toFixed(2)} s`;
        this.updateMathCard();
      }

      this.render();
      requestAnimationFrame(frame);
    };

    requestAnimationFrame(frame);
  }

  // Actualización en tiempo real de los valores matemáticos de las fórmulas
  updateMathCard() {
    const { A, omega, alpha, time, baseFunc } = this.params;

    let curX, curV, curA;

    if (baseFunc === 'sin') {
      // Ecuaciones solicitadas por el usuario:
      // x(t) = A * sen(omega*t + alpha)
      // v(t) = omega * A * cos(omega*t + alpha)
      // a(t) = -omega^2 * A * sen(omega*t + alpha)
      const angle = omega * time + alpha;
      curX = A * Math.sin(angle);
      curV = omega * A * Math.cos(angle);
      curA = -Math.pow(omega, 2) * A * Math.sin(angle);
    } else {
      const angle = omega * time + alpha;
      curX = A * Math.cos(angle);
      curV = -omega * A * Math.sin(angle);
      curA = -Math.pow(omega, 2) * A * Math.cos(angle);
    }

    const valXEl = this.container.querySelector('#live-val-x');
    const valVEl = this.container.querySelector('#live-val-v');
    const valAEl = this.container.querySelector('#live-val-a');
    const valFrecEl = this.container.querySelector('#live-val-frec');

    if (valXEl) valXEl.textContent = `${curX >= 0 ? '+' : ''}${curX.toFixed(3)} m`;
    if (valVEl) valVEl.textContent = `${curV >= 0 ? '+' : ''}${curV.toFixed(3)} m/s`;
    if (valAEl) valAEl.textContent = `${curA >= 0 ? '+' : ''}${curA.toFixed(3)} m/s²`;
    if (valFrecEl) valFrecEl.textContent = `f = ${this.params.f.toFixed(2)} Hz | T = ${this.params.T.toFixed(2)} s`;
  }

  // Renderizado gráfico completo
  render() {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    ctx.clearRect(0, 0, w, h);

    // Fondo blanco del papel GeoGebra
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, w, h);

    // 1. Cuadrícula milimetrada dual
    this.drawMillimeterGrid(ctx, w, h);

    // 2. Ejes cartesianos con reglas, marcas (ticks) y números
    this.drawAxesWithRulers(ctx, w, h);

    // 3. Renderizado según el modo activo
    if (this.currentMode === 'kinematics') {
      this.drawKinematicsCurves(ctx, w, h);
      this.drawTimeTracker(ctx);
    } else if (this.currentMode === 'phase-space') {
      this.drawPhaseSpace(ctx, w, h);
    } else if (this.currentMode === 'accel-pos') {
      this.drawAccelPos(ctx, w, h);
    } else if (this.currentMode === 'phasor') {
      this.drawPhasorCoupled(ctx, w, h);
      this.drawTimeTracker(ctx);
    }
  }

  // 1. Cuadrícula milimetrada dual
  drawMillimeterGrid(ctx, w, h) {
    const stepX = this.calculateSmartStep(this.scaleX);
    const stepY = this.calculateSmartStep(this.scaleY);

    const pxStepX = stepX * this.scaleX;
    const pxStepY = stepY * this.scaleY;

    // Sub-cuadrícula menor (papel milimetrado)
    if (this.styles.showGridMinor) {
      ctx.beginPath();
      ctx.strokeStyle = '#f5f0fd'; // Lavanda tenue
      ctx.lineWidth = 0.75;

      const subStepX = pxStepX / 5;
      const subStepY = pxStepY / 5;

      let startX = (this.originX % subStepX);
      for (let x = startX; x < w; x += subStepX) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }

      let startY = (this.originY % subStepY);
      for (let y = startY; y < h; y += subStepY) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();
    }

    // Cuadrícula mayor
    ctx.beginPath();
    ctx.strokeStyle = '#e6dcfa'; // Púrpura suave elegante
    ctx.lineWidth = 1.25;

    let startX = (this.originX % pxStepX);
    for (let x = startX; x < w; x += pxStepX) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
    }

    let startY = (this.originY % pxStepY);
    for (let y = startY; y < h; y += pxStepY) {
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
    }
    ctx.stroke();
  }

  // 2. Ejes cartesianos con flechas, reglas graduadas y números adaptativos
  drawAxesWithRulers(ctx, w, h) {
    const ox = this.originX;
    const oy = this.originY;

    const stepX = this.calculateSmartStep(this.scaleX);
    const stepY = this.calculateSmartStep(this.scaleY);

    const pxStepX = stepX * this.scaleX;
    const pxStepY = stepY * this.scaleY;

    ctx.strokeStyle = '#4c1d95'; // Púrpura profundo GeoGebra
    ctx.lineWidth = 2.0;

    // Eje X
    ctx.beginPath();
    ctx.moveTo(0, oy);
    ctx.lineTo(w - 8, oy);
    ctx.stroke();
    this.drawArrowhead(ctx, w - 8, oy, 0, '#4c1d95');

    // Eje Y
    ctx.beginPath();
    ctx.moveTo(ox, h);
    ctx.lineTo(ox, 8);
    ctx.stroke();
    this.drawArrowhead(ctx, ox, 8, -Math.PI / 2, '#4c1d95');

    // Ticks y números en Eje X
    ctx.fillStyle = '#4c1d95';
    ctx.font = '600 11px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    const minMathX = -ox / this.scaleX;
    const maxMathX = (w - ox) / this.scaleX;
    const firstTickX = Math.ceil(minMathX / stepX) * stepX;

    for (let tx = firstTickX; tx <= maxMathX; tx += stepX) {
      if (Math.abs(tx) < 1e-6) continue;
      const screenX = ox + tx * this.scaleX;

      // Marca mayor
      ctx.beginPath();
      ctx.moveTo(screenX, oy - 6);
      ctx.lineTo(screenX, oy + 6);
      ctx.stroke();

      // Sub-ticks
      for (let s = 1; s < 5; s++) {
        const subX = screenX + (s * pxStepX) / 5;
        if (subX < w) {
          ctx.beginPath();
          ctx.moveTo(subX, oy - 3);
          ctx.lineTo(subX, oy + 3);
          ctx.stroke();
        }
      }

      ctx.fillText(this.formatTick(tx), screenX, oy + 8);
    }

    // Ticks y números en Eje Y
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';

    const minMathY = (oy - h) / this.scaleY;
    const maxMathY = oy / this.scaleY;
    const firstTickY = Math.ceil(minMathY / stepY) * stepY;

    for (let ty = firstTickY; ty <= maxMathY; ty += stepY) {
      if (Math.abs(ty) < 1e-6) continue;
      const screenY = oy - ty * this.scaleY;

      ctx.beginPath();
      ctx.moveTo(ox - 6, screenY);
      ctx.lineTo(ox + 6, screenY);
      ctx.stroke();

      for (let s = 1; s < 5; s++) {
        const subY = screenY - (s * pxStepY) / 5;
        if (subY > 0) {
          ctx.beginPath();
          ctx.moveTo(ox - 3, subY);
          ctx.lineTo(ox + 3, subY);
          ctx.stroke();
        }
      }

      ctx.fillText(this.formatTick(ty), ox - 9, screenY);
    }

    // Origen (0,0)
    ctx.textAlign = 'right';
    ctx.textBaseline = 'top';
    ctx.fillText('0', ox - 6, oy + 6);

    // Rótulos de ejes según el modo
    ctx.font = 'bold 12px "Outfit", sans-serif';
    ctx.fillStyle = '#6d28d9';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';

    if (this.currentMode === 'kinematics' || this.currentMode === 'phasor') {
      ctx.fillText('t (s)', w - 38, oy - 16);
      ctx.textAlign = 'center';
      ctx.fillText('x, v, a', ox, 8);
    } else if (this.currentMode === 'phase-space') {
      ctx.fillText('x (m)', w - 38, oy - 16);
      ctx.textAlign = 'center';
      ctx.fillText('v (m/s)', ox, 8);
    } else if (this.currentMode === 'accel-pos') {
      ctx.fillText('x (m)', w - 38, oy - 16);
      ctx.textAlign = 'center';
      ctx.fillText('a (m/s²)', ox, 8);
    }
  }

  drawArrowhead(ctx, x, y, angle, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-9, -5);
    ctx.lineTo(-9, 5);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  // Trazado de Curvas Cinemáticas Temporales x(t), v(t), a(t)
  drawKinematicsCurves(ctx, w, h) {
    const { A, omega, alpha, baseFunc } = this.params;

    let dashArray = [];
    if (this.styles.dashStyle === 'dashed') dashArray = [8, 5];
    if (this.styles.dashStyle === 'dotted') dashArray = [3, 3];

    // 1. Elongación x(t)
    if (this.styles.curvesVisible.x) {
      this.plotFunction(ctx, w, this.styles.xColor, this.styles.lineWidth, dashArray, (t) => {
        return baseFunc === 'sin'
          ? A * Math.sin(omega * t + alpha)
          : A * Math.cos(omega * t + alpha);
      });
    }

    // 2. Velocidad v(t) = dx/dt
    if (this.styles.curvesVisible.v) {
      this.plotFunction(ctx, w, this.styles.vColor, 2.2, [6, 4], (t) => {
        return baseFunc === 'sin'
          ? omega * A * Math.cos(omega * t + alpha)
          : -omega * A * Math.sin(omega * t + alpha);
      });
    }

    // 3. Aceleración a(t) = dv/dt
    if (this.styles.curvesVisible.a) {
      this.plotFunction(ctx, w, this.styles.aColor, 1.8, [3, 3], (t) => {
        return baseFunc === 'sin'
          ? -Math.pow(omega, 2) * A * Math.sin(omega * t + alpha)
          : -Math.pow(omega, 2) * A * Math.cos(omega * t + alpha);
      });
    }
  }

  plotFunction(ctx, w, color, lineWidth, dash, fn) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.setLineDash(dash);

    ctx.beginPath();
    let isFirst = true;

    for (let px = 0; px <= w; px += 2) {
      const mathX = (px - this.originX) / this.scaleX;
      const mathY = fn(mathX);
      const py = this.originY - mathY * this.scaleY;

      if (isFirst) {
        ctx.moveTo(px, py);
        isFirst = false;
      } else {
        ctx.lineTo(px, py);
      }
    }

    ctx.stroke();
    ctx.restore();
  }

  // Cursor Temporal y Proyecciones en Vivo
  drawTimeTracker(ctx) {
    const t = this.params.time;
    const screenT = this.originX + t * this.scaleX;

    if (screenT < 0 || screenT > this.width) return;

    ctx.save();
    // Línea de barrido vertical del tiempo
    ctx.strokeStyle = 'rgba(124, 58, 237, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(screenT, 0);
    ctx.lineTo(screenT, this.height);
    ctx.stroke();

    const { A, omega, alpha, baseFunc } = this.params;
    const angle = omega * t + alpha;

    // Punto sobre la curva x(t)
    if (this.styles.curvesVisible.x) {
      const curX = baseFunc === 'sin' ? A * Math.sin(angle) : A * Math.cos(angle);
      const screenY = this.originY - curX * this.scaleY;

      // Proyección al eje vertical
      ctx.strokeStyle = 'rgba(124, 58, 237, 0.5)';
      ctx.beginPath();
      ctx.moveTo(this.originX, screenY);
      ctx.lineTo(screenT, screenY);
      ctx.stroke();

      // Halo brillante y punto
      ctx.fillStyle = 'rgba(124, 58, 237, 0.25)';
      ctx.beginPath();
      ctx.arc(screenT, screenY, 8, 0, 2 * Math.PI);
      ctx.fill();

      ctx.fillStyle = this.styles.xColor;
      ctx.beginPath();
      ctx.arc(screenT, screenY, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // Tooltip flotante con coordenadas
      ctx.font = '600 10.5px "JetBrains Mono", monospace';
      ctx.fillStyle = '#2e1065';
      ctx.fillText(`x(${t.toFixed(2)}s) = ${curX.toFixed(2)}m`, screenT + 8, screenY - 8);

      // Vector tangente si está habilitado
      if (this.styles.showVectors) {
        const curV = baseFunc === 'sin' ? omega * A * Math.cos(angle) : -omega * A * Math.sin(angle);
        const vLength = Math.max(-40, Math.min(40, curV * 12));
        ctx.strokeStyle = this.styles.vColor;
        ctx.lineWidth = 2.0;
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(screenT, screenY);
        ctx.lineTo(screenT, screenY - vLength);
        ctx.stroke();
        this.drawArrowhead(ctx, screenT, screenY - vLength, vLength >= 0 ? -Math.PI/2 : Math.PI/2, this.styles.vColor);
      }
    }

    // Punto sobre la curva v(t)
    if (this.styles.curvesVisible.v) {
      const curV = baseFunc === 'sin' ? omega * A * Math.cos(angle) : -omega * A * Math.sin(angle);
      const screenY = this.originY - curV * this.scaleY;

      ctx.fillStyle = this.styles.vColor;
      ctx.beginPath();
      ctx.arc(screenT, screenY, 4.5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // Punto sobre la curva a(t)
    if (this.styles.curvesVisible.a) {
      const curA = baseFunc === 'sin' ? -Math.pow(omega, 2) * A * Math.sin(angle) : -Math.pow(omega, 2) * A * Math.cos(angle);
      const screenY = this.originY - curA * this.scaleY;

      ctx.fillStyle = this.styles.aColor;
      ctx.beginPath();
      ctx.arc(screenT, screenY, 4.5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    ctx.restore();
  }

  // Modo 2: Espacio de Fases: v(x) = ± omega * sqrt(A^2 - x^2)
  drawPhaseSpace(ctx, w, h) {
    const { A, omega, alpha, time, baseFunc } = this.params;
    const ox = this.originX;
    const oy = this.originY;

    const radiusX = A * this.scaleX;
    const radiusY = (omega * A) * this.scaleY;

    // Trazar la Elipse de Fase
    ctx.save();
    ctx.strokeStyle = this.styles.phaseColor;
    ctx.lineWidth = this.styles.lineWidth || 2.5;
    ctx.beginPath();
    ctx.ellipse(ox, oy, radiusX, radiusY, 0, 0, 2 * Math.PI);
    ctx.stroke();

    // Relleno degradado sutil
    ctx.fillStyle = 'rgba(37, 99, 235, 0.05)';
    ctx.fill();

    // Líneas de cota en los extremos: x = ±A y v = ±omega*A
    ctx.strokeStyle = 'rgba(76, 29, 149, 0.25)';
    ctx.setLineDash([4, 4]);

    // +A y -A
    ctx.beginPath();
    ctx.moveTo(ox + radiusX, oy - radiusY - 15);
    ctx.lineTo(ox + radiusX, oy + radiusY + 15);
    ctx.moveTo(ox - radiusX, oy - radiusY - 15);
    ctx.lineTo(ox - radiusX, oy + radiusY + 15);
    // +v_max y -v_max
    ctx.moveTo(ox - radiusX - 15, oy - radiusY);
    ctx.lineTo(ox + radiusX + 15, oy - radiusY);
    ctx.moveTo(ox - radiusX - 15, oy + radiusY);
    ctx.lineTo(ox + radiusX + 15, oy + radiusY);
    ctx.stroke();

    // Etiquetas de extremos
    ctx.font = '600 11px "JetBrains Mono", monospace';
    ctx.fillStyle = '#1e1b4b';
    ctx.fillText(`+A = +${A.toFixed(1)}m`, ox + radiusX + 4, oy + 14);
    ctx.fillText(`-A = -${A.toFixed(1)}m`, ox - radiusX - 4, oy + 14);
    ctx.fillText(`+v_max = +${(omega * A).toFixed(2)}m/s`, ox + 8, oy - radiusY - 6);
    ctx.fillText(`-v_max = -${(omega * A).toFixed(2)}m/s`, ox + 8, oy + radiusY + 14);

    // Punto activo en el espacio de fases: (x(t), v(t))
    const angle = omega * time + alpha;
    const curX = baseFunc === 'sin' ? A * Math.sin(angle) : A * Math.cos(angle);
    const curV = baseFunc === 'sin' ? omega * A * Math.cos(angle) : -omega * A * Math.sin(angle);

    const px = ox + curX * this.scaleX;
    const py = oy - curV * this.scaleY;

    // Proyecciones a los ejes
    ctx.strokeStyle = 'rgba(37, 99, 235, 0.45)';
    ctx.beginPath();
    ctx.moveTo(ox, py);
    ctx.lineTo(px, py);
    ctx.lineTo(px, oy);
    ctx.stroke();

    // Punto con halo
    ctx.fillStyle = 'rgba(37, 99, 235, 0.25)';
    ctx.beginPath();
    ctx.arc(px, py, 9, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = '#2563eb';
    ctx.beginPath();
    ctx.arc(px, py, 5.5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.0;
    ctx.stroke();

    // Flecha de sentido de circulación horaria
    const tangentAngle = Math.atan2(-curV * this.scaleY, -Math.pow(omega, 2) * curX * this.scaleX);
    this.drawArrowhead(ctx, px, py, tangentAngle, '#2563eb');

    // Etiqueta flotante
    ctx.fillStyle = '#1e1b4b';
    ctx.fillText(`(x: ${curX.toFixed(2)}m, v: ${curV.toFixed(2)}m/s)`, px + 10, py - 10);

    ctx.restore();
  }

  // Modo 3: Dinámica de Restitución: a(x) = -omega^2 * x
  drawAccelPos(ctx, w, h) {
    const { A, omega, alpha, time, baseFunc } = this.params;
    const ox = this.originX;
    const oy = this.originY;

    const maxA = Math.pow(omega, 2) * A;

    // Trazar la recta a(x) = -omega^2 * x desde x = -A hasta x = +A
    const px1 = ox - A * this.scaleX;
    const py1 = oy - (+maxA) * this.scaleY; // en x = -A, a = +omega^2 * A (arriba)

    const px2 = ox + A * this.scaleX;
    const py2 = oy - (-maxA) * this.scaleY; // en x = +A, a = -omega^2 * A (abajo)

    ctx.save();
    ctx.strokeStyle = this.styles.accelColor;
    ctx.lineWidth = this.styles.lineWidth || 2.8;
    ctx.beginPath();
    ctx.moveTo(px1, py1);
    ctx.lineTo(px2, py2);
    ctx.stroke();

    // Puntos límite en los extremos
    ctx.fillStyle = this.styles.accelColor;
    ctx.beginPath();
    ctx.arc(px1, py1, 5, 0, 2 * Math.PI);
    ctx.arc(px2, py2, 5, 0, 2 * Math.PI);
    ctx.fill();

    // Rótulos de extremos
    ctx.font = '600 11px "JetBrains Mono", monospace';
    ctx.fillStyle = '#1e1b4b';
    ctx.fillText(`(-A, +ω²A)`, px1 - 10, py1 - 8);
    ctx.fillText(`(+A, -ω²A)`, px2 - 10, py2 + 18);

    // Indicador de pendiente negativa: m = -omega^2
    ctx.fillStyle = '#d97706';
    ctx.font = 'bold 12px "JetBrains Mono", monospace';
    ctx.fillText(`Pendiente: m = -ω² = -${Math.pow(omega, 2).toFixed(1)} s⁻²`, ox + 14, oy - 24);

    // Punto oscilante sobre la recta
    const angle = omega * time + alpha;
    const curX = baseFunc === 'sin' ? A * Math.sin(angle) : A * Math.cos(angle);
    const curA = -Math.pow(omega, 2) * curX;

    const px = ox + curX * this.scaleX;
    const py = oy - curA * this.scaleY;

    // Proyecciones
    ctx.strokeStyle = 'rgba(217, 119, 6, 0.45)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(ox, py);
    ctx.lineTo(px, py);
    ctx.lineTo(px, oy);
    ctx.stroke();

    // Punto activo
    ctx.fillStyle = 'rgba(217, 119, 6, 0.25)';
    ctx.beginPath();
    ctx.arc(px, py, 9, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = '#d97706';
    ctx.beginPath();
    ctx.arc(px, py, 5.5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.0;
    ctx.stroke();

    ctx.fillStyle = '#1e1b4b';
    ctx.fillText(`(x: ${curX.toFixed(2)}m, a: ${curA.toFixed(2)}m/s²)`, px + 10, py - 10);

    ctx.restore();
  }

  // Modo 4: Fasor Rotatorio y Onda Acoplada
  drawPhasorCoupled(ctx, w, h) {
    const { A, omega, alpha, time, baseFunc } = this.params;
    const ox = this.originX;
    const oy = this.originY;

    // Centro del círculo fasorial a la izquierda
    const cx = Math.max(75, ox - 110);
    const cy = oy;
    const radius = A * this.scaleY;

    ctx.save();
    // Circunferencia fasorial
    ctx.strokeStyle = '#d8b4fe';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
    ctx.stroke();

    // Ángulo instantáneo de fase
    const angle = omega * time + alpha;
    const px = cx + radius * Math.cos(angle);
    const py = cy - radius * Math.sin(angle);

    // Vector de Amplitud (Fasor)
    ctx.setLineDash([]);
    ctx.strokeStyle = this.styles.xColor;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(px, py);
    ctx.stroke();
    this.drawArrowhead(ctx, px, py, -angle + Math.PI / 2, this.styles.xColor);

    // Centro
    ctx.fillStyle = '#4c1d95';
    ctx.beginPath();
    ctx.arc(cx, cy, 3.5, 0, 2 * Math.PI);
    ctx.fill();

    // Línea de proyección horizontal hacia la onda en el plano
    const curVal = baseFunc === 'sin' ? A * Math.sin(angle) : A * Math.cos(angle);
    const screenT = ox + time * this.scaleX;
    const waveY = oy - curVal * this.scaleY;

    ctx.strokeStyle = 'rgba(124, 58, 237, 0.45)';
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.lineTo(screenT, waveY);
    ctx.stroke();

    // Trazar la curva en la sección derecha
    this.drawKinematicsCurves(ctx, w, h);

    ctx.restore();
  }

  // Cálculo de paso inteligente GeoGebra (1, 2, 5 * 10^k)
  calculateSmartStep(scale) {
    const minPixelDistance = 60;
    const rawStep = minPixelDistance / scale;
    const magnitude = Math.pow(10, Math.floor(Math.log10(rawStep)));
    const normalized = rawStep / magnitude;

    let step;
    if (normalized < 1.5) step = 1;
    else if (normalized < 3.5) step = 2;
    else if (normalized < 7.5) step = 5;
    else step = 10;

    return step * magnitude;
  }

  formatTick(val) {
    if (Math.abs(val) >= 1000 || (Math.abs(val) < 0.01 && val !== 0)) {
      return val.toExponential(1);
    }
    return parseFloat(val.toFixed(2)).toString();
  }
}

window.GeoGebraPlane = GeoGebraPlane;
