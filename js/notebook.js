/**
 * CUADERNO VIRTUAL INTERACTIVO - FÍSICA III
 * GESTOR DE NAVEGACIÓN, PÁGINAS, AUDIO SINTETIZADO Y CICLO DE VIDA
 */

class NotebookManager {
  constructor() {
    this.currentPage = 1;
    this.totalPages = 15;
    this.audioEnabled = true;

    this.pagesContainer = document.getElementById('notebook-pages-mount');
    this.pageIndicator = document.getElementById('current-page-num');
    this.pageTotal = document.getElementById('total-pages-num');
    this.pageSlider = document.getElementById('page-slider');
    this.btnPrev = document.getElementById('btn-prev-page');
    this.btnNext = document.getElementById('btn-next-page');
    this.btnHome = document.getElementById('btn-home');
    this.btnOverview = document.getElementById('btn-overview');
    this.overviewModal = document.getElementById('modal-overview');
    this.overviewClose = document.getElementById('modal-overview-close');
    this.overviewGrid = document.getElementById('overview-grid');

    this.initAudioContext();
    this.renderAllPages();
    this.bindEvents();
    this.hasInitialized = false;
    this.goToPage(1, false);
    this.hasInitialized = true;
  }

  initAudioContext() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
    } catch (e) {
      console.warn('Web Audio API no soportada en este entorno:', e);
    }
  }

  // Sintetizador de sonido sutil de pase de página (Papel acústico real)
  playPageTurnSound() {
    if (!this.audioEnabled || !this.audioCtx) return;
    try {
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const ctx = this.audioCtx;
      const bufferSize = ctx.sampleRate * 0.16; // 160 ms
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Ruido suave para simular la textura del papel
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = data[i];
        data[i] *= (1 - i / bufferSize); // Desvanecimiento suave
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(950, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.16);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.16);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
    } catch (err) {
      // Audio silenciado sin interrumpir flujo
    }
  }

  renderAllPages() {
    if (!this.pagesContainer || !window.NOTEBOOK_CONTENT) return;

    let html = '';

    window.NOTEBOOK_CONTENT.pages.forEach((p) => {
      if (p.type === 'cover') {
        // Página 1: Portada
        html += `
          <div class="notebook-page page-cover" id="page-item-1" data-page="1">
            <div class="cover-interactive-cta" id="cover-start-btn">
              <div class="icon-circle">
                <i data-lucide="book-open"></i>
              </div>
              <div class="cta-text">
                <span class="cta-title">Abrir Cuaderno de Estudio</span>
                <span class="cta-sub">Física III • UTP Ingeniería Industrial</span>
              </div>
            </div>
          </div>
        `;
      } else if (p.type === 'toc') {
        // Página 2: Índice de Contenidos
        html += `
          <div class="notebook-page page-content" id="page-item-2" data-page="2">
            <div class="page-inner-scroll">
              <div class="page-header-strip">
                <div class="page-header-topic">
                  <span class="page-header-tag">Estructura Académica</span>
                  <h2 class="page-header-title">Índice General de Contenidos</h2>
                </div>
                <span class="page-number-pill">Página 2</span>
              </div>

              <div class="section-block">
                <p>Haga clic sobre cualquiera de las secciones para saltar directamente a la página correspondiente:</p>
                <div class="toc-grid">
                  ${p.sections.map(sec => `
                    <button class="toc-item-btn" onclick="notebookApp.goToPage(${sec.page})">
                      <div class="toc-page-num">${sec.page}</div>
                      <div class="toc-item-title">${sec.title}</div>
                    </button>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>
        `;
      } else if (p.type === 'timeline') {
        // Página 4: Línea de Tiempo
        html += `
          <div class="notebook-page page-content" id="page-item-4" data-page="4">
            <div class="page-inner-scroll">
              <div class="page-header-strip">
                <div class="page-header-topic">
                  <span class="page-header-tag">${p.tag}</span>
                  <h2 class="page-header-title">${p.title}</h2>
                </div>
                <span class="page-number-pill">Página 4</span>
              </div>
              <div id="timeline-mount"></div>
            </div>
          </div>
        `;
      } else if (p.type === 'mindmap') {
        // Página 5: Mapa Mental
        html += `
          <div class="notebook-page page-content" id="page-item-5" data-page="5">
            <div class="page-inner-scroll">
              <div class="page-header-strip">
                <div class="page-header-topic">
                  <span class="page-header-tag">${p.tag}</span>
                  <h2 class="page-header-title">${p.title}</h2>
                </div>
                <span class="page-number-pill">Página 5</span>
              </div>
              <div id="mindmap-mount"></div>
            </div>
          </div>
        `;
      } else if (p.type === 'geogebra') {
        // Página 9: GeoGebra
        html += `
          <div class="notebook-page page-content" id="page-item-9" data-page="9">
            <div class="page-inner-scroll">
              <div class="page-header-strip">
                <div class="page-header-topic">
                  <span class="page-header-tag">${p.tag}</span>
                  <h2 class="page-header-title">${p.title}</h2>
                </div>
                <span class="page-number-pill">Página 9</span>
              </div>
              <div class="section-block" style="padding: 10px 14px; margin-bottom: 6px;">
                <span class="sec-badge figure">Figura 4</span>
                <span style="font-size: 0.85rem; font-weight: 600; color: #4c1d95;">
                  Laboratorio interactivo estilo GeoGebra con papel milimetrado, zoom, paneo, cinemática $x(t), v(t), a(t)$, espacio de fases $v(x)$, aceleración $a(x)$, fasor rotatorio y paleta de estilos.
                </span>
              </div>
              <div id="geogebra-mount"></div>
            </div>
          </div>
        `;
      } else if (p.type === 'simulation') {
        // Página 10: Simulador Físico
        html += `
          <div class="notebook-page page-content" id="page-item-10" data-page="10">
            <div class="page-inner-scroll">
              <div class="page-header-strip">
                <div class="page-header-topic">
                  <span class="page-header-tag">${p.tag}</span>
                  <h2 class="page-header-title">${p.title}</h2>
                </div>
                <span class="page-number-pill">Página 10</span>
              </div>
              <div class="section-block" style="padding: 10px 14px; margin-bottom: 6px;">
                <span class="sec-badge figure">Figura 5</span>
                <span style="font-size: 0.85rem; font-weight: 600; color: #4c1d95;">
                  Simulación interactiva a 60 FPS con vectores de fuerza, velocidad y medidores en tiempo real del Teorema de Conservación de Energía.
                </span>
              </div>
              <div id="simulation-mount"></div>
            </div>
          </div>
        `;
      } else if (p.type === 'exercises') {
        // Página 11: Ejemplos de Cátedra
        html += `
          <div class="notebook-page page-content" id="page-item-11" data-page="11">
            <div class="page-inner-scroll">
              <div class="page-header-strip">
                <div class="page-header-topic">
                  <span class="page-header-tag">${p.tag}</span>
                  <h2 class="page-header-title">${p.title}</h2>
                </div>
                <span class="page-number-pill">Página 11</span>
              </div>
              <div id="exercises-mount-11"></div>
            </div>
          </div>
        `;
      } else if (p.type === 'industrial-cases') {
        // Página 12: Taller de Ingeniería Industrial
        html += `
          <div class="notebook-page page-content" id="page-item-12" data-page="12">
            <div class="page-inner-scroll">
              <div class="page-header-strip">
                <div class="page-header-topic">
                  <span class="page-header-tag">${p.tag}</span>
                  <h2 class="page-header-title">${p.title}</h2>
                </div>
                <span class="page-number-pill">Página 12</span>
              </div>
              <div id="exercises-mount-12"></div>
            </div>
          </div>
        `;
      } else if (p.type === 'serway-problems') {
        // Página 13: Problemas Resueltos Sección 15.2 (Serway & Jewett)
        html += `
          <div class="notebook-page page-content" id="page-item-13" data-page="13">
            <div class="page-inner-scroll">
              <div class="page-header-strip">
                <div class="page-header-topic">
                  <span class="page-header-tag">${p.tag}</span>
                  <h2 class="page-header-title">${p.title}</h2>
                </div>
                <span class="page-number-pill">Página 13</span>
              </div>
              <div class="section-block" style="padding: 12px 16px; margin-bottom: 12px; background: linear-gradient(135deg, #f5f3ff, #faf5ff); border: 1.5px solid #c4b5fd; border-radius: 8px;">
                <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
                  <div>
                    <span class="sec-badge" style="background: #7c3aed; color: white;">Serway & Jewett • Cap. 15</span>
                    <strong style="color: #4c1d95; font-size: 0.95rem; margin-left: 6px;">5 Ejercicios de la Sección 15.2 Resueltos</strong>
                  </div>
                  <div style="font-size: 0.8rem; color: #6d28d9; font-weight: 600;">
                    Metodología Estricta en 5 Fases
                  </div>
                </div>
                <p style="font-size: 0.83rem; color: #5b21b6; margin: 6px 0 0 0; line-height: 1.5;">
                  Solución formal con identificación de <strong>Datos (azul)</strong>, <strong>Incógnitas (rojo)</strong>, <strong>Fórmulas</strong>, <strong>Despeje y Solución (naranja)</strong> y <strong>Validación física dimensional</strong>.
                </p>
              </div>
              <div id="exercises-mount-13"></div>
            </div>
          </div>
        `;
      } else if (p.type === 'glossary') {
        // Página 14: Glosario
        html += `
          <div class="notebook-page page-content" id="page-item-14" data-page="14">
            <div class="page-inner-scroll">
              <div class="page-header-strip">
                <div class="page-header-topic">
                  <span class="page-header-tag">${p.tag}</span>
                  <h2 class="page-header-title">${p.title}</h2>
                </div>
                <span class="page-number-pill">Página 14</span>
              </div>
              <div class="glossary-search-bar">
                <i data-lucide="search" style="color: #7c3aed;"></i>
                <input type="text" id="glossary-input" placeholder="Buscar término físico (ej: elongación, amplitud, Hertz, Hooke)...">
              </div>
              <div id="glossary-list-mount"></div>
            </div>
          </div>
        `;
      } else if (p.type === 'references') {
        // Página 15: Referencias APA 7
        html += `
          <div class="notebook-page page-content" id="page-item-15" data-page="15">
            <div class="page-inner-scroll">
              <div class="page-header-strip">
                <div class="page-header-topic">
                  <span class="page-header-tag">${p.tag}</span>
                  <h2 class="page-header-title">${p.title}</h2>
                </div>
                <span class="page-number-pill">Página 15</span>
              </div>
              <div class="section-block">
                <h3 style="margin-bottom: 12px;"><i data-lucide="book-marked"></i> Fuentes Bibliográficas y Documentos Normativos</h3>
                <p style="font-size: 0.85rem; color: #5b21b6; margin-bottom: 14px;">
                  Las siguientes fuentes académicas fueron consultadas y citadas de conformidad con las directrices de la American Psychological Association (APA 7.ª edición):
                </p>
                <div id="references-list-mount"></div>
              </div>
            </div>
          </div>
        `;
      } else {
        // Páginas Teóricas Estándar (3, 6, 7, 8)
        html += `
          <div class="notebook-page page-content" id="page-item-${p.id}" data-page="${p.id}">
            <div class="page-inner-scroll">
              <div class="page-header-strip">
                <div class="page-header-topic">
                  <span class="page-header-tag">${p.tag || 'Física III'}</span>
                  <h2 class="page-header-title">${p.title}</h2>
                </div>
                <span class="page-number-pill">Página ${p.id}</span>
              </div>
              ${p.contentHtml || ''}
            </div>
          </div>
        `;
      }
    });

    this.pagesContainer.innerHTML = html;

    // Pre-renderizar de inmediato los contenedores de ejercicios, glosario y referencias
    this.renderExercisesForPage(11, 'exercises-mount-11');
    this.renderExercisesForPage(12, 'exercises-mount-12');
    this.renderExercisesForPage(13, 'exercises-mount-13');
    this.renderGlossary('glossary-list-mount');
    this.renderReferences('references-list-mount');

    // Poblar Cuadrícula del Modal de Vista General
    this.renderOverviewGrid();
  }

  renderOverviewGrid() {
    if (!this.overviewGrid || !window.NOTEBOOK_CONTENT) return;

    let html = '';
    window.NOTEBOOK_CONTENT.pages.forEach(p => {
      html += `
        <div class="thumb-card ${p.id === this.currentPage ? 'active' : ''}" onclick="notebookApp.goToPage(${p.id}); notebookApp.closeOverview();">
          <div class="thumb-preview-mini">
            ${p.id === 1 ? '<img src="imagenes/Portada.webp" alt="Portada">' : '<i data-lucide="file-text" style="color: #7c3aed;"></i>'}
          </div>
          <span class="num">Página ${p.id}</span>
          <span class="title">${p.title}</span>
        </div>
      `;
    });

    this.overviewGrid.innerHTML = html;
  }

  bindEvents() {
    // Portada: Botón "Abrir Cuaderno"
    const startBtn = document.getElementById('cover-start-btn');
    if (startBtn) {
      startBtn.addEventListener('click', () => this.goToPage(2));
    }

    // Botones de navegación inferior
    if (this.btnPrev) this.btnPrev.addEventListener('click', () => this.prevPage());
    if (this.btnNext) this.btnNext.addEventListener('click', () => this.nextPage());
    if (this.btnHome) this.btnHome.addEventListener('click', () => this.goToPage(1));

    // Slider de páginas
    if (this.pageSlider) {
      this.pageSlider.addEventListener('input', (e) => {
        const p = parseInt(e.target.value, 10);
        this.goToPage(p);
      });
    }

    // Modal de vista general
    if (this.btnOverview) {
      this.btnOverview.addEventListener('click', () => this.openOverview());
    }
    if (this.overviewClose) {
      this.overviewClose.addEventListener('click', () => this.closeOverview());
    }
    if (this.overviewModal) {
      this.overviewModal.addEventListener('click', (e) => {
        if (e.target === this.overviewModal) this.closeOverview();
      });
    }

    // Atajos de teclado
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        this.nextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        this.prevPage();
      } else if (e.key === 'Home') {
        this.goToPage(1);
      } else if (e.key === 'End') {
        this.goToPage(this.totalPages);
      } else if (e.key === 'Escape') {
        this.closeOverview();
      }
    });

    // Gestos táctiles de deslizamiento (Swipe)
    let touchStartX = 0;
    let touchStartY = 0;

    this.pagesContainer.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    }, { passive: true });

    this.pagesContainer.addEventListener('touchend', (e) => {
      if (e.changedTouches.length === 1) {
        const dx = e.changedTouches[0].clientX - touchStartX;
        const dy = e.changedTouches[0].clientY - touchStartY;

        // Si el gesto es predominantemente horizontal y supera los 60px
        if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
          // Excluir si el toque fue dentro del Canvas de GeoGebra
          if (e.target.closest('.geogebra-container')) return;

          if (dx < 0) {
            this.nextPage();
          } else {
            this.prevPage();
          }
        }
      }
    }, { passive: true });
  }

  openOverview() {
    if (this.overviewModal) {
      this.overviewModal.classList.add('active');
      this.renderOverviewGrid();
      if (window.lucide) window.lucide.createIcons({ root: this.overviewModal });
    }
  }

  closeOverview() {
    if (this.overviewModal) {
      this.overviewModal.classList.remove('active');
    }
  }

  goToPage(pageNum, playSound = true) {
    if (pageNum < 1 || pageNum > this.totalPages) return;

    const oldPageNum = this.currentPage;
    const isSamePage = (pageNum === oldPageNum);

    // Cancelar cualquier animación previa activa ante clics rápidos
    if (this.turnTimeout) {
      clearTimeout(this.turnTimeout);
      this.turnTimeout = null;
      this.cleanupTurnClasses();
    }

    if (playSound && !isSamePage) {
      this.playPageTurnSound();
    }

    this.currentPage = pageNum;

    // Actualizar controles de la barra inferior de inmediato
    if (this.pageIndicator) this.pageIndicator.textContent = this.currentPage;
    if (this.pageTotal) this.pageTotal.textContent = this.totalPages;
    if (this.pageSlider) this.pageSlider.value = this.currentPage;

    if (this.btnPrev) this.btnPrev.disabled = (this.currentPage === 1);
    if (this.btnNext) this.btnNext.disabled = (this.currentPage === this.totalPages);

    const oldPageEl = document.getElementById(`page-item-${oldPageNum}`);
    const newPageEl = document.getElementById(`page-item-${pageNum}`);

    // Si es la carga inicial o no existen elementos o es la misma página
    if (!this.hasInitialized || isSamePage || !oldPageEl || !newPageEl) {
      const pages = this.pagesContainer.querySelectorAll('.notebook-page');
      pages.forEach(p => {
        const pNum = parseInt(p.dataset.page, 10);
        const isActive = (pNum === pageNum);
        p.classList.toggle('active', isActive);
        p.style.display = isActive ? 'flex' : 'none';
        p.style.position = isActive ? 'relative' : '';
      });
      this.onPageActivated(pageNum);
      this.refreshMathAndIcons();
      return;
    }

    const isForward = (pageNum > oldPageNum);
    this.isTurningPage = true;

    if (isForward) {
      // Avanzar: la página nueva se monta debajo estableciendo la altura
      newPageEl.style.display = 'flex';
      newPageEl.style.position = 'relative';
      newPageEl.style.zIndex = '15';
      newPageEl.classList.add('active', 'page-flip-enter-forward');

      // La página saliente se superpone y se curva/pasa hacia la izquierda
      oldPageEl.style.display = 'flex';
      oldPageEl.style.position = 'absolute';
      oldPageEl.style.top = '0';
      oldPageEl.style.left = '0';
      oldPageEl.style.width = '100%';
      oldPageEl.style.zIndex = '25';
      oldPageEl.classList.add('page-flip-exit-forward');
    } else {
      // Retroceder: la página saliente queda debajo
      oldPageEl.style.display = 'flex';
      oldPageEl.style.position = 'relative';
      oldPageEl.style.zIndex = '15';
      oldPageEl.classList.add('page-flip-exit-backward');

      // La página anterior entra curvándose desde la izquierda por encima
      newPageEl.style.display = 'flex';
      newPageEl.style.position = 'absolute';
      newPageEl.style.top = '0';
      newPageEl.style.left = '0';
      newPageEl.style.width = '100%';
      newPageEl.style.zIndex = '25';
      newPageEl.classList.add('active', 'page-flip-enter-backward');
    }

    // Desplazar suavemente a la parte superior de la nueva página
    window.scrollTo({ top: 0, behavior: 'smooth' });

    this.turnTimeout = setTimeout(() => {
      this.cleanupTurnClasses();
      this.turnTimeout = null;
      this.isTurningPage = false;

      // Activar componentes específicos de la página
      this.onPageActivated(pageNum);

      // Re-renderizar iconos y KaTeX
      this.refreshMathAndIcons();
    }, 550);
  }

  cleanupTurnClasses() {
    const pages = this.pagesContainer.querySelectorAll('.notebook-page');
    pages.forEach(p => {
      const pNum = parseInt(p.dataset.page, 10);
      const isActive = (pNum === this.currentPage);
      p.classList.toggle('active', isActive);
      p.classList.remove(
        'page-flip-exit-forward',
        'page-flip-enter-forward',
        'page-flip-exit-backward',
        'page-flip-enter-backward'
      );
      p.style.display = isActive ? 'flex' : 'none';
      p.style.position = isActive ? 'relative' : '';
      p.style.top = '';
      p.style.left = '';
      p.style.width = '';
      p.style.zIndex = isActive ? '20' : '';
    });
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  onPageActivated(pageNum) {
    // Página 4: Línea de Tiempo
    if (pageNum === 4 && window.renderTimeline) {
      window.renderTimeline('timeline-mount');
    }

    // Página 5: Mapa Mental
    if (pageNum === 5 && window.renderMindMap) {
      window.renderMindMap('mindmap-mount');
    }

    // Página 9: GeoGebra Canvas
    if (pageNum === 9) {
      if (!this.geoGebraInstance && window.GeoGebraPlane) {
        this.geoGebraInstance = new window.GeoGebraPlane('geogebra-mount');
      } else if (this.geoGebraInstance) {
        setTimeout(() => this.geoGebraInstance.resize(), 50);
      }
    }

    // Página 10: Simulador Físico
    if (pageNum === 10) {
      if (!this.simInstance && window.PhysicsSimulation) {
        this.simInstance = new window.PhysicsSimulation('simulation-mount');
      } else if (this.simInstance) {
        setTimeout(() => this.simInstance.resize(), 50);
      }
    }

    // Página 11: Ejemplos de Cátedra
    if (pageNum === 11) {
      this.renderExercisesForPage(11, 'exercises-mount-11');
    }

    // Página 12: Casos Industriales
    if (pageNum === 12) {
      this.renderExercisesForPage(12, 'exercises-mount-12');
    }

    // Página 13: Problemas Resueltos Sección 15.2 (Serway & Jewett)
    if (pageNum === 13) {
      this.renderExercisesForPage(13, 'exercises-mount-13');
    }

    // Página 14: Glosario
    if (pageNum === 14) {
      this.renderGlossary('glossary-list-mount');
    }

    // Página 15: Referencias APA 7
    if (pageNum === 15) {
      this.renderReferences('references-list-mount');
    }
  }

  // Renderizar Ejercicios con Metodología Estricta en 5 Pasos
  renderExercisesForPage(pageTarget, mountId) {
    const mount = document.getElementById(mountId);
    if (!mount || !window.NOTEBOOK_EXERCISES) return;

    const list = window.NOTEBOOK_EXERCISES.filter(ex => ex.page === pageTarget);
    let html = '';

    if (list.length > 1) {
      html += `
        <div class="exercise-filter-bar" style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center; margin-bottom: 14px; background: white; padding: 10px 14px; border-radius: 8px; border: 1px solid #ddd6fe; box-shadow: 0 2px 6px rgba(124,58,237,0.06);">
          <span style="font-size: 0.82rem; font-weight: 700; color: #4c1d95; display: flex; align-items: center; gap: 4px;">
            <i data-lucide="layers" style="width: 15px; height: 15px;"></i> Explorador:
          </span>
          <button class="btn-stroke-opt active" style="padding: 4px 10px; font-size: 0.78rem;" onclick="notebookApp.filterExercises('all', '${mountId}', this)">
            Todos los ejercicios (${list.length})
          </button>
          ${list.map((ex) => `
            <button class="btn-stroke-opt" style="padding: 4px 10px; font-size: 0.78rem;" onclick="notebookApp.filterExercises('${ex.id}', '${mountId}', this)">
              ${ex.badge.split('•')[0].trim()}
            </button>
          `).join('')}
        </div>
      `;
    }

    list.forEach(ex => {
      html += `
        <div class="exercise-container" id="card-${ex.id}">
          <div class="exercise-header">
            <span class="sec-badge" style="background: #ede9fe; color: #5b21b6; border: 1px solid #c4b5fd;">
              ${ex.badge}
            </span>
            <div class="ex-title">${ex.title}</div>
          </div>

          <!-- Enunciado -->
          <div class="exercise-statement">
            <strong>Enunciado:</strong> ${ex.statement}
          </div>

          <!-- Paso 1: Datos en AZUL -->
          <div class="step-data-box">
            <div class="step-label data">
              <i data-lucide="check-circle-2"></i> ${ex.dataStep.label}
            </div>
            <ul style="padding-left: 20px; margin: 0; line-height: 1.65;">
              ${ex.dataStep.items.map(it => `
                <li class="item">
                  <span>$${it.symbol} = ${it.value}$</span> 
                  <span style="font-size: 0.82rem; color: #3b82f6; font-weight: normal;">— ${it.note}</span>
                </li>
              `).join('')}
            </ul>
          </div>

          <!-- Paso 2: Incógnitas en ROJO -->
          <div class="step-unknown-box">
            <div class="step-label unknown">
              <i data-lucide="help-circle"></i> ${ex.unknownStep.label}
            </div>
            <ul style="padding-left: 20px; margin: 0; line-height: 1.65;">
              ${ex.unknownStep.items.map(it => `
                <li class="item">
                  <span>$${it.symbol} = ${it.target}$</span> 
                  <span style="font-size: 0.82rem; color: #ef4444; font-weight: normal;">— ${it.desc}</span>
                </li>
              `).join('')}
            </ul>
          </div>

          <!-- Paso 3: Fórmulas Necesarias -->
          <div class="step-formula-box">
            <div class="step-label formulas">
              <i data-lucide="binary"></i> ${ex.formulasStep.label}
            </div>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              ${ex.formulasStep.formulas.map(f => `
                <div style="background: white; border: 1px solid #ddd6fe; border-radius: 6px; padding: 6px 12px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;">
                  <span>$$${f.expr}$$</span>
                  <span style="font-size: 0.78rem; color: #6d28d9; font-weight: 500;">${f.desc}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Paso 4: Reemplazo, Conversiones y Solución (NARANJA) -->
          <div class="step-resolution-box">
            <div class="step-label resolution">
              <i data-lucide="calculator"></i> ${ex.resolutionStep.label}
            </div>
            <div style="font-size: 0.9rem; color: #431407; line-height: 1.7;">
              ${ex.resolutionStep.htmlContent}
            </div>
          </div>

          <!-- Paso 5: Validación de Resultados y Conclusiones -->
          <div class="step-validation-box">
            <div class="step-label validation">
              <i data-lucide="shield-check"></i> ${ex.validationStep.label}
            </div>
            <ul style="padding-left: 20px; margin: 0; line-height: 1.6;">
              ${ex.validationStep.notes.map(n => `
                <li style="margin-bottom: 6px; font-size: 0.88rem; color: #064e3b;">${n}</li>
              `).join('')}
            </ul>
          </div>
        </div>
      `;
    });

    mount.innerHTML = html;
  }

  filterExercises(exId, mountId, btnEl) {
    const mount = document.getElementById(mountId);
    if (!mount) return;
    if (btnEl) {
      const parent = btnEl.parentElement;
      if (parent) {
        parent.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        btnEl.classList.add('active');
      }
    }
    const cards = mount.querySelectorAll('.exercise-container');
    cards.forEach(c => {
      if (exId === 'all' || c.id === `card-${exId}`) {
        c.style.display = 'block';
      } else {
        c.style.display = 'none';
      }
    });
  }

  // Renderizar Glosario
  renderGlossary(mountId) {
    const mount = document.getElementById(mountId);
    if (!mount || !window.NOTEBOOK_GLOSSARY) return;

    const renderList = (filter = '') => {
      const q = filter.trim().toLowerCase();
      const filtered = window.NOTEBOOK_GLOSSARY.filter(item => {
        return item.term.toLowerCase().includes(q) || item.def.toLowerCase().includes(q);
      });

      let html = '';
      filtered.forEach(item => {
        html += `
          <div class="glossary-card">
            <div class="term">
              <span>${item.term}</span>
              <span style="font-family: var(--font-mono); font-size: 0.8rem; color: #7c3aed; background: #f5f3ff; padding: 2px 8px; border-radius: 4px;">
                $${item.symbol}$
              </span>
            </div>
            <div class="definition">${item.def}</div>
          </div>
        `;
      });

      mount.innerHTML = html || '<div style="text-align: center; color: #8a7aa6; padding: 20px;">No se encontraron términos coincidentes.</div>';
      this.refreshMathAndIcons();
    };

    renderList();

    const input = document.getElementById('glossary-input');
    if (input) {
      input.addEventListener('input', (e) => renderList(e.target.value));
    }
  }

  // Renderizar Referencias APA 7
  renderReferences(mountId) {
    const mount = document.getElementById(mountId);
    if (!mount || !window.NOTEBOOK_REFERENCES) return;

    let html = '';
    window.NOTEBOOK_REFERENCES.forEach(ref => {
      html += `
        <div class="apa-reference-item">
          <strong>${ref.author}</strong> (${ref.year}). <em>${ref.title}</em>. ${ref.publisher}. 
          <a href="${ref.url}" target="_blank" rel="noopener noreferrer">${ref.url}</a>
          <div style="font-size: 0.78rem; color: #7c3aed; margin-top: 2px;">
            ${ref.note}
          </div>
        </div>
      `;
    });

    mount.innerHTML = html;
  }

  // Refrescar KaTeX y Lucide Icons
  refreshMathAndIcons() {
    const doRender = () => {
      if (window.renderMathInElement && this.pagesContainer) {
        try {
          window.renderMathInElement(this.pagesContainer, {
            delimiters: [
              { left: "$$", right: "$$", display: true },
              { left: "$", right: "$", display: false }
            ],
            throwOnError: false
          });
        } catch (e) {
          console.warn('KaTeX render warning:', e);
        }
      } else if (!window.renderMathInElement) {
        setTimeout(doRender, 120);
      }

      if (window.lucide) {
        window.lucide.createIcons();
      }
    };
    doRender();
  }
}

window.NotebookManager = NotebookManager;
