/**
 * CUADERNO VIRTUAL INTERACTIVO - FÍSICA III
 * BASE DE DATOS DE CONTENIDO TEÓRICO, DEDUCCIONES FORMALES Y METADATOS
 */

window.NOTEBOOK_CONTENT = {
  meta: {
    title: "Cuaderno Interactivo Virtual - Física 3",
    subtitle: "Movimiento Oscilatorio y Movimiento Armónico Simple",
    authors: [
      "Ana María López Giraldo",
      "Daniela Alzate Jimenez",
      "Maria Alejandra Ramirez Montes"
    ],
    institution: "Universidad Tecnológica de Pereira",
    faculty: "Ingeniería Industrial",
    course: "Física III (Oscilaciones y Ondas)",
    semester: "Semestre 12",
    totalExpectedPages: 15
  },

  // Páginas del Cuaderno Digital
  pages: [
    {
      id: 1,
      type: "cover",
      title: "Portada Oficial",
      subtitle: "Física III - Movimiento Oscilatorio y M.A.S."
    },
    {
      id: 2,
      type: "toc",
      title: "Índice de Contenidos",
      subtitle: "Estructura interactiva del cuaderno",
      sections: [
        { page: 1, title: "Portada Oficial Institucional" },
        { page: 2, title: "Índice de Contenidos Interactivos" },
        { page: 3, title: "Reseña Histórica y Evolución Científica" },
        { page: 4, title: "Línea de Tiempo Interactiva del M.A.S." },
        { page: 5, title: "Mapa Mental Conceptual Jerárquico" },
        { page: 6, title: "Conceptos, Definiciones y Unidades del S.I." },
        { page: 7, title: "Dinámica y Deducción de la E.D.O. del M.A.S." },
        { page: 8, title: "Cinemática Completa: Elongación, Velocidad y Aceleración" },
        { page: 9, title: "Laboratorio Gráfico: Plano Cartesiano Estilo GeoGebra" },
        { page: 10, title: "Simulador Físico Premium: Masa-Resorte y Péndulo" },
        { page: 11, title: "Ejemplos de Cátedra (Metodología Estricta en 5 Pasos)" },
        { page: 12, title: "Taller de Aplicación Práctica en Ingeniería Industrial" },
        { page: 13, title: "Problemas Resueltos: Sección 15.2 (Serway & Jewett)" },
        { page: 14, title: "Glosario Interactivo de Términos Físicos" },
        { page: 15, title: "Referencias Bibliográficas (Normas APA 7ma Edición)" }
      ]
    },
    {
      id: 3,
      type: "history",
      title: "Reseña Histórica del Movimiento Armónico",
      tag: "Fundamentos Epistemológicos",
      contentHtml: `
        <div class="section-block">
          <h3><i data-lucide="scroll"></i> El Origen del Estudio de las Oscilaciones</h3>
          <p>
            El estudio sistemático del movimiento oscilatorio representa uno de los pilares formativos de la física clásica y la ingeniería moderna. Su origen formal se remonta a <strong>Galileo Galilei (1581)</strong>, quien, de acuerdo con la tradición científica, observó el balanceo de una lámpara suspendida en la Catedral de Pisa y, midiendo el tiempo con las pulsaciones de su muñeca, descubrió el <strong>isocronismo del péndulo</strong>: el período de oscilación para pequeñas amplitudes es prácticamente independiente de la amplitud del balanceo.
          </p>
          <p>
            Posteriormente, en 1656, el físico holandés <strong>Christiaan Huygens</strong> patentó el primer reloj de péndulo mecánico, reduciendo el error diario de cronometraje de 15 minutos a menos de 10 segundos, una revolución sin precedentes en la navegación marina y la organización del trabajo manufacturero.
          </p>
        </div>

        <div class="section-block" style="margin-top: 12px;">
          <h3><i data-lucide="award"></i> De la Elasticidad al Cálculo Diferencial</h3>
          <p>
            En 1678, <strong>Robert Hooke</strong> publicó en su tratado <em>De Potentia Restitutiva</em> el célebre principio físico que hoy lleva su nombre: <em>«Ut tensio, sic vis»</em> (como la deformación, así es la fuerza), estableciendo que la fuerza restauradora elástica es directamente proporcional y opuesta a la deformación experimentada por el cuerpo:
          </p>
          <div class="formula-card">
            <span class="sec-badge equation">Ecuación 1</span>
            $$\\vec{F}_e = -k\\,\\vec{x}$$
            <div class="formula-caption">Ley de elasticidad lineal de Hooke (1678)</div>
          </div>
          <p>
            Con la consolidación de los <em>Philosophiae Naturalis Principia Mathematica</em> de <strong>Sir Isaac Newton (1687)</strong> y el posterior desarrollo del análisis infinitesimal por <strong>Leonhard Euler</strong> y <strong>Joseph-Louis Lagrange</strong>, el movimiento armónico simple fue formalizado como la solución canónica de una ecuación diferencial ordinaria de segundo orden con coeficientes constantes.
          </p>
        </div>
      `
    },
    {
      id: 4,
      type: "timeline",
      title: "Línea de Tiempo Interactiva",
      tag: "Hitos Históricos de las Oscilaciones",
      subtitle: "Evolución histórica y matemática del estudio armónico"
    },
    {
      id: 5,
      type: "mindmap",
      title: "Mapa Mental Conceptual",
      tag: "Estructura Cognitiva",
      subtitle: "Relaciones jerárquicas e interdisciplinares del Movimiento Armónico Simple"
    },
    {
      id: 6,
      type: "concepts",
      title: "Conceptos y Definiciones Fundamentales",
      tag: "Bases Teóricas",
      contentHtml: `
        <div class="section-block">
          <h3><i data-lucide="compass"></i> Movimiento Periódico vs. Movimiento Oscilatorio</h3>
          <p>
            Se define como <strong>Movimiento Periódico</strong> a todo movimiento en el cual la posición, velocidad y aceleración de una partícula se repiten de manera idéntica a intervalos regulares y sucesivos de tiempo.
          </p>
          <p>
            El <strong>Movimiento Oscilatorio o Vibratorio</strong> es una clase especial de movimiento periódico caracterizado por un vaivén de la partícula a uno y otro lado de una <em>posición de equilibrio estable</em>, gobernado por una <strong>fuerza restauradora</strong> que siempre apunta hacia el origen.
          </p>
        </div>

        <div class="section-block" style="margin-top: 10px;">
          <h3><i data-lucide="layers"></i> Variables Cinemáticas Fundamentales</h3>
          <ul style="padding-left: 20px; font-size: 0.9rem; color: #372554; line-height: 1.65;">
            <li><strong>Elongación ($x$):</strong> Vector posición instantánea de la partícula medido respecto a la posición de equilibrio ($x = 0$) en cualquier instante $t$.</li>
            <li><strong>Amplitud ($A$):</strong> Magnitud del desplazamiento máximo alcanzado por la partícula respecto al punto de equilibrio ($A = |x_{\\max}|$). Siempre es un valor real no negativo ($A \\ge 0$).</li>
            <li><strong>Período ($T$):</strong> Intervalo de tiempo necesario para completar una oscilación o ciclo completo de ida y vuelta.</li>
            <li><strong>Frecuencia ($f$):</strong> Número de oscilaciones, ciclos o vibraciones ejecutadas por la partícula en una unidad de tiempo ($f = 1/T$).</li>
            <li><strong>Frecuencia Angular (Pulsación) ($\\omega$):</strong> Rapidez de variación de la fase de la oscilación en el tiempo, expresada analíticamente como $\\omega = 2\\pi f = \\frac{2\\pi}{T}$.</li>
            <li><strong>Fase Inicial o Constante de Fase ($\\phi$):</strong> Parámetro angular que define el estado de elongación y sentido del movimiento en el instante inicial de referencia ($t = 0$).</li>
          </ul>
        </div>

        <div class="section-block" style="margin-top: 10px;">
          <span class="sec-badge table">Tabla 1</span>
          <div style="font-weight: 700; font-size: 0.88rem; color: var(--color-primary-dark); margin-bottom: 6px;">
            Magnitudes Fundamentales y Unidades en el Sistema Internacional (SI)
          </div>
          <table class="academic-table">
            <thead>
              <tr>
                <th>Magnitud Física</th>
                <th>Símbolo</th>
                <th>Unidad S.I.</th>
                <th>Abreviatura</th>
                <th>Dimensión Fórmica</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Elongación</td>
                <td>$x(t)$</td>
                <td>metro</td>
                <td>$\\text{m}$</td>
                <td>$[L]$</td>
              </tr>
              <tr>
                <td>Amplitud</td>
                <td>$A$</td>
                <td>metro</td>
                <td>$\\text{m}$</td>
                <td>$[L]$</td>
              </tr>
              <tr>
                <td>Período</td>
                <td>$T$</td>
                <td>segundo</td>
                <td>$\\text{s}$</td>
                <td>$[T]$</td>
              </tr>
              <tr>
                <td>Frecuencia</td>
                <td>$f$</td>
                <td>Hertz (ciclo/s)</td>
                <td>$\\text{Hz} = \\text{s}^{-1}$</td>
                <td>$[T^{-1}]$</td>
              </tr>
              <tr>
                <td>Frecuencia angular</td>
                <td>$\\omega$</td>
                <td>radián por segundo</td>
                <td>$\\text{rad/s}$</td>
                <td>$[T^{-1}]$</td>
              </tr>
              <tr>
                <td>Constante elástica</td>
                <td>$k$</td>
                <td>Newton por metro</td>
                <td>$\\text{N/m} = \\text{kg/s}^2$</td>
                <td>$[M T^{-2}]$</td>
              </tr>
              <tr>
                <td>Fase inicial</td>
                <td>$\\phi$</td>
                <td>radián</td>
                <td>$\\text{rad}$</td>
                <td>Adimensional</td>
              </tr>
            </tbody>
          </table>
        </div>
      `
    },
    {
      id: 7,
      type: "dynamics",
      title: "Dinámica y Deducción de la Ecuación del M.A.S.",
      tag: "Deducción Matemática Rigurosa",
      contentHtml: `
        <div class="section-block">
          <h3><i data-lucide="function-square"></i> Deducción Formal Paso a Paso de la E.D.O.</h3>
          <p>
            Consideremos un sistema masa-resorte ideal compuesto por una partícula de masa $m$ fijada al extremo de un muelle de constante elástica $k$, que oscila sobre una superficie horizontal lisa sin rozamiento.
          </p>
          <div class="derivation-step">
            <div class="derivation-step-title">Paso 1: Aplicación de la Segunda Ley de Newton</div>
            <p>La única fuerza neta que actúa en la dirección horizontal del movimiento es la fuerza elástica restauradora dada por la Ley de Hooke:</p>
            <div class="formula-card">
              <span class="sec-badge equation">Ecuación 2</span>
              $$\\sum F_x = -k\\,x = m\\,a_x = m\\,\\frac{d^2 x}{dt^2}$$
            </div>
          </div>

          <div class="derivation-step">
            <div class="derivation-step-title">Paso 2: Construcción de la Ecuación Diferencial Canónica</div>
            <p>Dividiendo toda la expresión entre la masa $m$ y reorganizando en forma homogénea:</p>
            <div class="formula-card">
              <span class="sec-badge equation">Ecuación 3</span>
              $$\\frac{d^2 x}{dt^2} + \\frac{k}{m}\\,x = 0$$
            </div>
            <p>Se define la <strong>frecuencia angular natural $\\omega_0$</strong> como la relación física invariable del oscilador:</p>
            <div class="formula-card">
              <span class="sec-badge equation">Ecuación 4</span>
              $$\\omega_0 = \\sqrt{\\frac{k}{m}} \\implies \\frac{d^2 x}{dt^2} + \\omega_0^2\\,x = 0$$
            </div>
          </div>

          <div class="derivation-step">
            <div class="derivation-step-title">Paso 3: Solución por Polinomio Característico y Euler</div>
            <p>Proponiendo una solución de tipo exponencial $x(t) = e^{r t}$, se obtiene el polinomio característico:</p>
            $$r^2 + \\omega_0^2 = 0 \\implies r = \\pm i\\,\\omega_0$$
            <p>Por consiguiente, la solución general en el dominio de los números complejos es:</p>
            $$x(t) = C_1 e^{i\\omega_0 t} + C_2 e^{-i\\omega_0 t}$$
            <p>Aplicando la fórmula de Euler ($e^{\\pm i\\theta} = \\cos\\theta \\pm i\\sin\\theta$) y exigiendo que la posición física sea un valor real, la combinación lineal canónica conduce a:</p>
            <div class="formula-card" style="background: linear-gradient(135deg, #fdf4ff, #fae8ff); border-color: #e879f9;">
              <span class="sec-badge equation">Ecuación 5</span>
              $$x(t) = A \\cos(\\omega_0 t + \\phi)$$
              <div class="formula-caption">Ecuación general de elongación del Movimiento Armónico Simple</div>
            </div>
          </div>

          <div class="derivation-step">
            <div class="derivation-step-title">Paso 4: Período y Frecuencia Natural del Sistema</div>
            <p>Dado que la función coseno tiene una periodicidad fundamental de $2\\pi$ radianes, el argumento cumple $\\omega_0(t + T) + \\phi = (\\omega_0 t + \\phi) + 2\\pi$, despejando el período $T$ y la frecuencia $f$:</p>
            <div class="formula-card">
              <span class="sec-badge equation">Ecuación 6</span>
              $$T = \\frac{2\\pi}{\\omega_0} = 2\\pi \\sqrt{\\frac{m}{k}}$$
            </div>
            <div class="formula-card">
              <span class="sec-badge equation">Ecuación 7</span>
              $$f = \\frac{1}{T} = \\frac{\\omega_0}{2\\pi} = \\frac{1}{2\\pi} \\sqrt{\\frac{k}{m}}$$
            </div>
          </div>
        </div>
      `
    },
    {
      id: 8,
      type: "kinematics",
      title: "Cinemática del M.A.S.: Elongación, Velocidad y Aceleración",
      tag: "Deducción Analítica y Fases",
      contentHtml: `
        <div class="section-block">
          <h3><i data-lucide="activity"></i> Deducción Rigurosa de las Ecuaciones Cinemáticas</h3>
          
          <div class="derivation-step">
            <div class="derivation-step-title">1. Ecuación de la Velocidad Instantánea $v(t)$</div>
            <p>La velocidad instantánea es la primera derivada temporal de la función posición $x(t) = A\\cos(\\omega t + \\phi)$:</p>
            $$v(t) = \\frac{dx}{dt} = \\frac{d}{dt}\\left[ A \\cos(\\omega t + \\phi) \\right] = -A\\,\\omega \\sin(\\omega t + \\phi)$$
            <p>Aplicando la identidad trigonométrica $-\\sin(\\theta) = \\cos\\left(\\theta + \\frac{\\pi}{2}\\right)$, expresamos la velocidad en forma de desfase:</p>
            <div class="formula-card">
              <span class="sec-badge equation">Ecuación 8</span>
              $$v(t) = A\\,\\omega \\cos\\left(\\omega t + \\phi + \\frac{\\pi}{2}\\right)$$
              <div class="formula-caption">La velocidad está <strong>adelantada $\\pi/2$ radianes ($90^\\circ$)</strong> respecto a la elongación.</div>
            </div>
            <p>La velocidad adquiere su valor máximo en el cruce por el punto de equilibrio ($x = 0$):</p>
            <div class="formula-card">
              <span class="sec-badge equation">Ecuación 9</span>
              $$v_{\\max} = A\\,\\omega = A \\sqrt{\\frac{k}{m}}$$
            </div>
          </div>

          <div class="derivation-step" style="margin-top: 14px;">
            <div class="derivation-step-title">2. Ecuación de la Aceleración Instantánea $a(t)$</div>
            <p>La aceleración instantánea es la derivada temporal de la velocidad (o segunda derivada de la posición):</p>
            $$a(t) = \\frac{dv}{dt} = \\frac{d}{dt}\\left[ -A\\omega \\sin(\\omega t + \\phi) \\right] = -A\\,\\omega^2 \\cos(\\omega t + \\phi)$$
            <p>Reconociendo que $x(t) = A\\cos(\\omega t + \\phi)$, obtenemos la relación fundamental del M.A.S.:</p>
            <div class="formula-card">
              <span class="sec-badge equation">Ecuación 10</span>
              $$a(t) = -\\omega^2\\,x(t) = A\\,\\omega^2 \\cos(\\omega t + \\phi + \\pi)$$
              <div class="formula-caption">La aceleración está en <strong>oposición de fase (adelantada $\\pi$ radianes o $180^\\circ$)</strong> con respecto a la elongación.</div>
            </div>
            <p>La aceleración alcanza su magnitud máxima en los puntos de retorno (extremos $x = \\pm A$):</p>
            <div class="formula-card">
              <span class="sec-badge equation">Ecuación 11</span>
              $$a_{\\max} = A\\,\\omega^2 = A\\,\\frac{k}{m}$$
            </div>
          </div>

          <div class="derivation-step" style="margin-top: 14px;">
            <div class="derivation-step-title">3. Relación entre Velocidad y Posición $v(x)$ y Aceleración $a(x)$</div>
            <p>A partir de la identidad fundamental $\\sin^2(\\theta) + \\cos^2(\\theta) = 1$ o mediante la conservación de la energía mecánica total $E = \\frac{1}{2}kA^2 = \\frac{1}{2}mv^2 + \\frac{1}{2}kx^2$:</p>
            <div class="formula-card">
              <span class="sec-badge equation">Ecuación 12</span>
              $$v(x) = \\pm \\omega \\sqrt{A^2 - x^2}$$
              <div class="formula-caption">Velocidad en función de la elongación $x$ (elipse en el espacio de fases).</div>
            </div>
            <p>Asimismo, la aceleración se vincula directamente con la elongación mediante la Ley de Hooke y la Segunda Ley de Newton:</p>
            <div class="formula-card">
              <span class="sec-badge equation">Ecuación 13</span>
              $$a(x) = -\\omega^2 \\cdot x$$
              <div class="formula-caption">Aceleración proporcional y opuesta a la posición (recta restauradora con pendiente $-\\omega^2$).</div>
            </div>
          </div>

          <div class="section-block" style="background: linear-gradient(135deg, #fdf4ff, #fae8ff); border: 1.5px solid #d8b4fe; border-radius: 8px; padding: 12px 16px; margin-top: 14px;">
            <div style="font-weight: 700; color: #4c1d95; font-size: 0.92rem; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
              <i data-lucide="sparkles"></i> Sistema Completo de Ecuaciones Canónicas del M.A.S. (Base Seno)
            </div>
            <p style="font-size: 0.85rem; color: #5b21b6; margin-bottom: 8px;">
              En la formulación matemática con función base seno y ángulo de fase $\\alpha$, las funciones temporales y espaciales se expresan como:
            </p>
            <div class="formula-card" style="background: white; border-color: #c4b5fd;">
              $$\\begin{aligned}
                & x(t) = A \\cdot \\operatorname{sen}(\\omega \\cdot t + \\alpha) \\\\
                & v(t) = \\frac{dx}{dt} = \\omega \\cdot A \\cdot \\cos(\\omega \\cdot t + \\alpha) \\\\
                & a(t) = \\frac{dv}{dt} = -\\omega^2 \\cdot A \\cdot \\operatorname{sen}(\\omega \\cdot t + \\alpha)
              \\end{aligned}$$
            </div>
            <div class="formula-card" style="background: white; border-color: #c4b5fd; margin-top: 8px;">
              $$v(x) = \\pm \\omega \\sqrt{A^2 - x^2}, \\quad a(x) = -\\omega^2 \\cdot x, \\quad \\omega = \\frac{2\\pi}{T} = 2\\pi f$$
              <div class="formula-caption">Relaciones espaciales en el plano cartesiano y frecuencia angular en función del período $T$ y la frecuencia $f$.</div>
            </div>
          </div>
        </div>

        <div class="section-block" style="margin-top: 12px;">
          <span class="sec-badge table">Tabla 2</span>
          <div style="font-weight: 700; font-size: 0.88rem; color: var(--color-primary-dark); margin-bottom: 6px;">
            Comportamiento Cinemático Comparativo en Puntos Clave del M.A.S.
          </div>
          <table class="academic-table">
            <thead>
              <tr>
                <th>Estado del Sistema</th>
                <th>Posición ($x$)</th>
                <th>Velocidad ($v$)</th>
                <th>Aceleración ($a$)</th>
                <th>Fuerza Neta ($F$)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Extremo Positivo</strong></td>
                <td>$+A$ (Máxima)</td>
                <td>$0$ (Nula)</td>
                <td>$-\\omega^2 A$ (Mínima)</td>
                <td>$-kA$ (Máx. hacia izq.)</td>
              </tr>
              <tr>
                <td><strong>Punto de Equilibrio</strong></td>
                <td>$0$ (Nula)</td>
                <td>$\\pm A\\omega$ (Máxima)</td>
                <td>$0$ (Nula)</td>
                <td>$0$ (Nula)</td>
              </tr>
              <tr>
                <td><strong>Extremo Negativo</strong></td>
                <td>$-A$ (Mínima)</td>
                <td>$0$ (Nula)</td>
                <td>$+\\omega^2 A$ (Máxima)</td>
                <td>$+kA$ (Máx. hacia der.)</td>
              </tr>
            </tbody>
          </table>
        </div>
      `
    },
    {
      id: 9,
      type: "geogebra",
      title: "Laboratorio Gráfico: Plano Estilo GeoGebra",
      tag: "Interactividad y Escalas Dinámicas",
      subtitle: "Plano cartesiano con cuadrícula milimetrada dual, escalado manual y paleta de estilos"
    },
    {
      id: 10,
      type: "simulation",
      title: "Simulador Físico en Tiempo Real",
      tag: "Mecánica y Conservación de Energía",
      subtitle: "Sistema masa-resorte y péndulo simple con vectores dinámicos y diagrama energético"
    },
    {
      id: 11,
      type: "exercises",
      title: "Ejemplos y Ejercicios Resueltos",
      tag: "Metodología Estricta en 5 Pasos",
      subtitle: "Protocolo formal con código de colores: Datos en Azul, Incógnitas en Rojo, Solución en Naranja y Validación"
    },
    {
      id: 12,
      type: "industrial-cases",
      title: "Taller de Aplicación en Ingeniería Industrial",
      tag: "Casos Prácticos Industriales",
      subtitle: "Vibraciones mecánicas, aislamiento en prensas y control de calidad con normas técnicas"
    },
    {
      id: 13,
      type: "serway-problems",
      title: "Problemas Resueltos: Sección 15.2 (Serway & Jewett)",
      tag: "Análisis de Modelo: Partícula en M.A.S.",
      subtitle: "Cinco ejercicios canónicos resueltos rigurosamente paso a paso con metodología formal en 5 fases"
    },
    {
      id: 14,
      type: "glossary",
      title: "Glosario Especializado de Términos",
      tag: "Terminología Científica",
      subtitle: "Diccionario interactivo con búsqueda en tiempo real de conceptos clave"
    },
    {
      id: 15,
      type: "references",
      title: "Referencias Bibliográficas (Normas APA 7)",
      tag: "Bibliografía Académica",
      subtitle: "Fuentes científicas consultadas y normalizadas según APA 7ma edición"
    }
  ]
};
