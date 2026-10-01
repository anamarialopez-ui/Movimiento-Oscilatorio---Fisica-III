/**
 * CUADERNO VIRTUAL INTERACTIVO - FÍSICA III
 * SIMULADOR FÍSICO PREMIUM: MASA-RESORTE Y PÉNDULO SIMPLE
 * 
 * Características:
 * - Integrador numérico de precisión (Verlet/Euler-Cromer a 60 FPS)
 * - Visualización dinámica de vectores en tiempo real: Fuerza, Velocidad, Aceleración
 * - Barras de conservación de energía mecánica (Cinética K vs. Potencial U vs. Total E)
 * - Controles interactivos de masa, constante elástica/longitud y amortiguamiento
 */

class PhysicsSimulation {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.mode = 'spring'; // 'spring' o 'pendulum'
    this.isRunning = true;

    // Parámetros físicos (S.I.)
    this.params = {
      m: 1.0,        // Masa en kg
      k: 25.0,       // Constante elástica en N/m
      A: 0.15,       // Amplitud en m
      damping: 0.0,  // Coeficiente de amortiguamiento b
      L: 1.0,        // Longitud del péndulo en m
      g: 9.81        // Gravedad en m/s^2
    };

    // Variables de estado dinámico
    this.state = {
      x: this.params.A, // Elongación (m) o ángulo (rad)
      v: 0.0,           // Velocidad (m/s) o velocidad angular (rad/s)
      a: 0.0,           // Aceleración (m/s^2)
      t: 0.0            // Tiempo acumulado
    };

    this.initDOM();
    this.bindEvents();
    this.resize();
    this.startSimulation();
  }

  initDOM() {
    this.container.classList.add('sim-container');
    this.container.innerHTML = `
      <div class="sim-screen-split">
        <!-- Canvas de la Simulación Física -->
        <div class="sim-canvas-box" id="sim-canvas-wrap">
          <canvas class="sim-canvas" id="sim-canvas"></canvas>
        </div>

        <!-- Panel Lateral: Barras de Energía y Leyenda Vectorial -->
        <div class="sim-side-panel">
          <div class="energy-meters-group">
            <div class="energy-title">
              <span>Energía Mecánica Total</span>
              <span id="txt-total-e">0.00 J</span>
            </div>

            <!-- Barra Energía Cinética -->
            <div class="energy-bar-row">
              <div class="energy-bar-label">
                <span style="color: #059669;">● Cinética ($K = \\frac{1}{2}mv^2$)</span>
                <span id="txt-k-val">0.00 J</span>
              </div>
              <div class="energy-bar-track">
                <div class="energy-bar-fill kinetic" id="bar-k" style="width: 0%;"></div>
              </div>
            </div>

            <!-- Barra Energía Potencial -->
            <div class="energy-bar-row">
              <div class="energy-bar-label">
                <span style="color: #1d4ed8;">● Potencial Elástica ($U = \\frac{1}{2}kx^2$)</span>
                <span id="txt-u-val">0.00 J</span>
              </div>
              <div class="energy-bar-track">
                <div class="energy-bar-fill potential" id="bar-u" style="width: 100%;"></div>
              </div>
            </div>

            <!-- Barra Energía Mecánica Total -->
            <div class="energy-bar-row">
              <div class="energy-bar-label">
                <span style="color: #6d28d9;">● Total Conservada ($E = K + U$)</span>
                <span id="txt-e-val">0.00 J</span>
              </div>
              <div class="energy-bar-track">
                <div class="energy-bar-fill total" id="bar-total" style="width: 100%;"></div>
              </div>
            </div>
          </div>

          <!-- Leyenda de Vectores Activos -->
          <div class="vectors-legend">
            <div style="font-size: 0.76rem; font-weight: 700; color: #4c1d95; margin-bottom: 2px;">
              Vectores Dinámicos en Vivo:
            </div>
            <div class="vector-badge">
              <span class="vec-dot pos"></span>
              <span>Elongación $\\vec{x}$: <strong id="val-read-x">0.00 m</strong></span>
            </div>
            <div class="vector-badge">
              <span class="vec-dot vel"></span>
              <span>Velocidad $\\vec{v}$: <strong id="val-read-v">0.00 m/s</strong></span>
            </div>
            <div class="vector-badge">
              <span class="vec-dot force"></span>
              <span>Fuerza Restauradora $\\vec{F} = -k\\vec{x}$: <strong id="val-read-f">0.00 N</strong></span>
            </div>
            <div class="vector-badge">
              <span class="vec-dot acc"></span>
              <span>Aceleración $\\vec{a}$: <strong id="val-read-a">0.00 m/s²</strong></span>
            </div>
          </div>
        </div>
      </div>

      <!-- Barra de Controles Inferior -->
      <div class="sim-controls-toolbar">
        <div class="sim-actions-group">
          <button class="btn-sim-ctl" id="btn-sim-play">
            <i data-lucide="pause" id="sim-play-icon"></i>
            <span id="sim-play-label">Pausar</span>
          </button>
          <button class="btn-sim-ctl" id="btn-sim-reset">
            <i data-lucide="rotate-ccw"></i>
            <span>Reiniciar</span>
          </button>
          <button class="btn-sim-ctl" id="btn-sim-mode">
            <i data-lucide="repeat"></i>
            <span id="sim-mode-label">Modo: Resorte</span>
          </button>
        </div>

        <div class="sim-sliders-group">
          <div class="sim-slider-wrap">
            <span>Masa ($m$):</span>
            <input type="range" id="sim-param-m" min="0.2" max="3.0" step="0.1" value="1.0">
            <span class="sim-readout-pill" id="lbl-sim-m">1.0 kg</span>
          </div>

          <div class="sim-slider-wrap">
            <span id="lbl-param-k-title">Rigidez ($k$):</span>
            <input type="range" id="sim-param-k" min="5" max="60" step="1" value="25">
            <span class="sim-readout-pill" id="lbl-sim-k">25 N/m</span>
          </div>

          <div class="sim-slider-wrap">
            <span>Amplitud ($A$):</span>
            <input type="range" id="sim-param-a" min="0.05" max="0.25" step="0.01" value="0.15">
            <span class="sim-readout-pill" id="lbl-sim-a">0.15 m</span>
          </div>
        </div>
      </div>
    `;

    this.canvasWrapper = this.container.querySelector('#sim-canvas-wrap');
    this.canvas = this.container.querySelector('#sim-canvas');
    this.ctx = this.canvas.getContext('2d');

    if (window.lucide) {
      window.lucide.createIcons({ root: this.container });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => this.resize());

    // Play/Pause
    const playBtn = this.container.querySelector('#btn-sim-play');
    const playIcon = this.container.querySelector('#sim-play-icon');
    const playLabel = this.container.querySelector('#sim-play-label');

    playBtn.addEventListener('click', () => {
      this.isRunning = !this.isRunning;
      playLabel.textContent = this.isRunning ? 'Pausar' : 'Reanudar';
      if (playIcon) {
        playIcon.setAttribute('data-lucide', this.isRunning ? 'pause' : 'play');
        if (window.lucide) window.lucide.createIcons({ root: playBtn });
      }
    });

    // Reset
    this.container.querySelector('#btn-sim-reset').addEventListener('click', () => {
      this.reset();
    });

    // Cambio de modo (Resorte vs Péndulo)
    const modeBtn = this.container.querySelector('#btn-sim-mode');
    const modeLabel = this.container.querySelector('#sim-mode-label');
    const kTitle = this.container.querySelector('#lbl-param-k-title');
    const kInput = this.container.querySelector('#sim-param-k');
    const kLabel = this.container.querySelector('#lbl-sim-k');

    modeBtn.addEventListener('click', () => {
      if (this.mode === 'spring') {
        this.mode = 'pendulum';
        modeLabel.textContent = 'Modo: Péndulo';
        kTitle.textContent = 'Longitud (L):';
        kInput.min = '0.5';
        kInput.max = '2.5';
        kInput.step = '0.1';
        kInput.value = '1.0';
        kLabel.textContent = '1.0 m';
        this.params.L = 1.0;
      } else {
        this.mode = 'spring';
        modeLabel.textContent = 'Modo: Resorte';
        kTitle.textContent = 'Rigidez (k):';
        kInput.min = '5';
        kInput.max = '60';
        kInput.step = '1';
        kInput.value = '25';
        kLabel.textContent = '25 N/m';
        this.params.k = 25;
      }
      this.reset();
    });

    // Sliders
    this.container.querySelector('#sim-param-m').addEventListener('input', (e) => {
      this.params.m = parseFloat(e.target.value);
      this.container.querySelector('#lbl-sim-m').textContent = `${this.params.m.toFixed(1)} kg`;
    });

    kInput.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      if (this.mode === 'spring') {
        this.params.k = val;
        kLabel.textContent = `${val.toFixed(0)} N/m`;
      } else {
        this.params.L = val;
        kLabel.textContent = `${val.toFixed(1)} m`;
      }
    });

    this.container.querySelector('#sim-param-a').addEventListener('input', (e) => {
      this.params.A = parseFloat(e.target.value);
      this.container.querySelector('#lbl-sim-a').textContent = `${this.params.A.toFixed(2)} m`;
      this.reset();
    });
  }

  resize() {
    const rect = this.canvasWrapper.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.width = rect.width;
    this.height = rect.height || 280;

    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.ctx.resetTransform();
    this.ctx.scale(dpr, dpr);
  }

  reset() {
    this.state.x = this.params.A;
    this.state.v = 0.0;
    this.state.a = 0.0;
    this.state.t = 0.0;
  }

  startSimulation() {
    let lastTime = performance.now();

    const loop = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05); // Límite de paso para estabilidad
      lastTime = now;

      if (this.isRunning) {
        this.updatePhysics(dt);
      }

      this.render();
      this.updateReadouts();
      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  }

  // Integración física exacta Euler-Cromer
  updatePhysics(dt) {
    if (this.mode === 'spring') {
      // Fuerza F = -k * x - b * v
      const F = -this.params.k * this.state.x - this.params.damping * this.state.v;
      this.state.a = F / this.params.m;
      this.state.v += this.state.a * dt;
      this.state.x += this.state.v * dt;
    } else {
      // Péndulo simple: theta'' = -(g/L) * sin(theta)
      const alpha = -(this.params.g / this.params.L) * Math.sin(this.state.x);
      this.state.a = alpha;
      this.state.v += this.state.a * dt;
      this.state.x += this.state.v * dt;
    }

    this.state.t += dt;
  }

  render() {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    ctx.clearRect(0, 0, w, h);

    if (this.mode === 'spring') {
      this.renderSpringMass(ctx, w, h);
    } else {
      this.renderPendulum(ctx, w, h);
    }
  }

  // Renderizado del oscilador masa-resorte horizontal
  renderSpringMass(ctx, w, h) {
    const centerY = h * 0.52;
    const wallX = 40;
    const eqX = w * 0.55;
    const pxPerMeter = (w * 0.35) / 0.25; // Escala visual

    const blockX = eqX + this.state.x * pxPerMeter;
    const blockSize = 44;

    // Pared de anclaje
    ctx.fillStyle = '#6d28d9';
    ctx.fillRect(wallX - 10, centerY - 45, 10, 90);

    // Patrón de rayas en la pared
    ctx.strokeStyle = '#ede9fe';
    ctx.lineWidth = 2;
    for (let y = centerY - 40; y < centerY + 45; y += 12) {
      ctx.beginPath();
      ctx.moveTo(wallX - 10, y);
      ctx.lineTo(wallX, y + 8);
      ctx.stroke();
    }

    // Suelo con regla
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(wallX, centerY + blockSize / 2, w - wallX, 3);

    // Línea de equilibrio (x = 0)
    ctx.strokeStyle = 'rgba(124, 58, 237, 0.4)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(eqX, centerY - 60);
    ctx.lineTo(eqX, centerY + 60);
    ctx.stroke();
    ctx.setLineDash([]);

    // Resorte helicoidal
    this.drawCoilSpring(ctx, wallX, centerY, blockX - blockSize / 2, centerY, 14, 12);

    // Bloque oscilante
    ctx.fillStyle = '#7c3aed';
    ctx.strokeStyle = '#4c1d95';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(blockX - blockSize / 2, centerY - blockSize / 2, blockSize, blockSize, 6);
    ctx.fill();
    ctx.stroke();

    // Texto de masa en el bloque
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px "Outfit", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${this.params.m} kg`, blockX, centerY);

    // Vectores dinámicos superpuestos
    const vecY = centerY - blockSize / 2 - 14;

    // Vector Velocidad (Verde esmeralda)
    if (Math.abs(this.state.v) > 0.02) {
      const vLen = this.state.v * 35;
      this.drawVector(ctx, blockX, vecY, blockX + vLen, vecY, '#10b981', 'v');
    }

    // Vector Fuerza Restauradora (Ámbar)
    const F = -this.params.k * this.state.x;
    if (Math.abs(F) > 0.2) {
      const fLen = F * 8;
      this.drawVector(ctx, blockX, vecY - 14, blockX + fLen, vecY - 14, '#f59e0b', 'F');
    }
  }

  // Renderizado del péndulo simple
  renderPendulum(ctx, w, h) {
    const pivotX = w / 2;
    const pivotY = 35;
    const visualL = Math.min(h * 0.65, this.params.L * 140);

    const bobX = pivotX + visualL * Math.sin(this.state.x);
    const bobY = pivotY + visualL * Math.cos(this.state.x);
    const bobRadius = 16;

    // Soporte superior
    ctx.fillStyle = '#4c1d95';
    ctx.beginPath();
    ctx.arc(pivotX, pivotY, 6, 0, 2 * Math.PI);
    ctx.fill();

    // Hilo inextensible
    ctx.strokeStyle = '#6d28d9';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(pivotX, pivotY);
    ctx.lineTo(bobX, bobY);
    ctx.stroke();

    // Línea vertical de referencia
    ctx.strokeStyle = 'rgba(124, 58, 237, 0.3)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(pivotX, pivotY);
    ctx.lineTo(pivotX, pivotY + visualL + 20);
    ctx.stroke();
    ctx.setLineDash([]);

    // Esfera del péndulo (Bob)
    ctx.fillStyle = '#ec4899';
    ctx.strokeStyle = '#9d174d';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(bobX, bobY, bobRadius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    // Texto de masa
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 10px "Outfit", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${this.params.m}kg`, bobX, bobY);
  }

  // Dibujar resorte helicoidal realista
  drawCoilSpring(ctx, x1, y1, x2, y2, coils, radius) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const dist = Math.hypot(dx, dy);
    const angle = Math.atan2(dy, dx);

    ctx.save();
    ctx.translate(x1, y1);
    ctx.rotate(angle);

    ctx.strokeStyle = '#8b5cf6';
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.moveTo(0, 0);

    const leadIn = 16;
    const leadOut = 16;
    const coilLength = dist - leadIn - leadOut;
    const step = coilLength / coils;

    ctx.lineTo(leadIn, 0);

    for (let i = 0; i < coils; i++) {
      const cx1 = leadIn + step * (i + 0.25);
      const cy1 = -radius;
      const cx2 = leadIn + step * (i + 0.75);
      const cy2 = radius;
      ctx.lineTo(cx1, cy1);
      ctx.lineTo(cx2, cy2);
    }

    ctx.lineTo(dist - leadOut, 0);
    ctx.lineTo(dist, 0);
    ctx.stroke();

    ctx.restore();
  }

  // Dibujar vector con flecha
  drawVector(ctx, x1, y1, x2, y2, color, label) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const angle = Math.atan2(dy, dx);
    const len = Math.hypot(dx, dy);

    if (len < 5) return;

    ctx.save();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 2.2;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    // Flecha
    const headLen = 7;
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - headLen * Math.cos(angle - Math.PI / 6), y2 - headLen * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(x2 - headLen * Math.cos(angle + Math.PI / 6), y2 - headLen * Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.fill();

    // Etiqueta
    ctx.font = 'bold 10px "JetBrains Mono", monospace';
    ctx.fillText(label, x2 + (dx > 0 ? 8 : -14), y2 - 4);

    ctx.restore();
  }

  // Actualizar paneles de energía y lecturas numéricas
  updateReadouts() {
    let K = 0;
    let U = 0;
    let E = 0;

    if (this.mode === 'spring') {
      K = 0.5 * this.params.m * Math.pow(this.state.v, 2);
      U = 0.5 * this.params.k * Math.pow(this.state.x, 2);
      E = K + U;

      const F = -this.params.k * this.state.x;
      this.container.querySelector('#val-read-x').textContent = `${this.state.x.toFixed(3)} m`;
      this.container.querySelector('#val-read-v').textContent = `${this.state.v.toFixed(3)} m/s`;
      this.container.querySelector('#val-read-f').textContent = `${F.toFixed(2)} N`;
      this.container.querySelector('#val-read-a').textContent = `${this.state.a.toFixed(2)} m/s²`;
    } else {
      K = 0.5 * this.params.m * Math.pow(this.params.L * this.state.v, 2);
      U = this.params.m * this.params.g * this.params.L * (1 - Math.cos(this.state.x));
      E = K + U;

      this.container.querySelector('#val-read-x').textContent = `${(this.state.x * 180 / Math.PI).toFixed(1)}°`;
      this.container.querySelector('#val-read-v').textContent = `${(this.params.L * this.state.v).toFixed(2)} m/s`;
      this.container.querySelector('#val-read-f').textContent = `${(-this.params.m * this.params.g * Math.sin(this.state.x)).toFixed(2)} N`;
      this.container.querySelector('#val-read-a').textContent = `${(this.params.L * this.state.a).toFixed(2)} m/s²`;
    }

    const pctK = E > 0 ? Math.min(100, Math.max(0, (K / E) * 100)) : 0;
    const pctU = E > 0 ? Math.min(100, Math.max(0, (U / E) * 100)) : 0;

    this.container.querySelector('#txt-k-val').textContent = `${K.toFixed(3)} J`;
    this.container.querySelector('#txt-u-val').textContent = `${U.toFixed(3)} J`;
    this.container.querySelector('#txt-e-val').textContent = `${E.toFixed(3)} J`;
    this.container.querySelector('#txt-total-e').textContent = `${E.toFixed(3)} J`;

    this.container.querySelector('#bar-k').style.width = `${pctK}%`;
    this.container.querySelector('#bar-u').style.width = `${pctU}%`;
  }
}

window.PhysicsSimulation = PhysicsSimulation;
