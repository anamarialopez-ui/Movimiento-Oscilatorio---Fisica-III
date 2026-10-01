/**
 * CUADERNO VIRTUAL INTERACTIVO - FÍSICA III
 * BASE DE DATOS DE EJERCICIOS Y CASOS PRÁCTICOS
 * PROTOCOLO ESTRICTO EN 5 PASOS:
 * 1) DATOS (AZUL)
 * 2) INCÓGNITAS (ROJO)
 * 3) FÓRMULAS NECESARIAS
 * 4) REEMPLAZO, CONVERSIONES DE UNIDADES, DESPEJE Y RESULTADO (NARANJA)
 * 5) VALIDACIÓN DE RESULTADOS Y CONCLUSIONES
 */

window.NOTEBOOK_EXERCISES = [
  {
    page: 11,
    id: "ejercicio-1",
    badge: "Ejemplo Resuelto 1",
    title: "Oscilador Horizontal Masa-Resorte en Banco de Pruebas",
    statement: "Un bloque de masa $m = 450\\text{ g}$ está conectado a un resorte helicoidal horizontal de constante elástica $k = 180\\text{ N/m}$ apoyado sobre una superficie sin fricción. El bloque se desplaza una distancia de $12.0\\text{ cm}$ hacia la derecha desde su posición de equilibrio y se libera desde el reposo en el instante $t = 0\\text{ s}$. Determine: a) la frecuencia angular, el período y la frecuencia de oscilación; b) la velocidad máxima y la aceleración máxima; c) la posición, velocidad y aceleración en el instante $t = 0.75\\text{ s}$.",
    
    // Paso 1: Datos en AZUL
    dataStep: {
      label: "Paso 1: Identificación de los Datos",
      items: [
        { symbol: "m", value: "450\\text{ g}", note: "Masa del bloque oscilante" },
        { symbol: "k", value: "180\\text{ N/m}", note: "Constante recuperadora elástica" },
        { symbol: "x_0 = A", value: "12.0\\text{ cm}", note: "Elongación inicial en reposo (Amplitud)" },
        { symbol: "v_0", value: "0\\text{ m/s}", note: "Velocidad inicial en t = 0 s" },
        { symbol: "t_1", value: "0.75\\text{ s}", note: "Instante temporal de evaluación" }
      ]
    },

    // Paso 2: Incógnitas en ROJO
    unknownStep: {
      label: "Paso 2: Identificación de las Incógnitas",
      items: [
        { symbol: "\\omega", target: "?", desc: "Frecuencia angular del oscilador (\\text{rad/s})" },
        { symbol: "T", target: "?", desc: "Período fundamental de oscilación (\\text{s})" },
        { symbol: "f", target: "?", desc: "Frecuencia cíclica (\\text{Hz})" },
        { symbol: "v_{\\max}", target: "?", desc: "Velocidad máxima alcanzada (\\text{m/s})" },
        { symbol: "a_{\\max}", target: "?", desc: "Aceleración máxima alcanzada (\\text{m/s}^2)" },
        { symbol: "x(0.75)", target: "?", desc: "Elongación en t = 0.75 s (\\text{m})" },
        { symbol: "v(0.75)", target: "?", desc: "Velocidad en t = 0.75 s (\\text{m/s})" },
        { symbol: "a(0.75)", target: "?", desc: "Aceleración en t = 0.75 s (\\text{m/s}^2)" }
      ]
    },

    // Paso 3: Fórmulas necesarias
    formulasStep: {
      label: "Paso 3: Fórmulas Necesarias",
      formulas: [
        { expr: "\\omega = \\sqrt{\\frac{k}{m}}", desc: "Frecuencia angular natural del sistema masa-resorte" },
        { expr: "T = \\frac{2\\pi}{\\omega}, \\quad f = \\frac{1}{T}", desc: "Período y frecuencia de oscilación" },
        { expr: "v_{\\max} = A\\,\\omega, \\quad a_{\\max} = A\\,\\omega^2", desc: "Valores extremos de la cinemática" },
        { expr: "x(t) = A\\cos(\\omega t + \\phi)", desc: "Ecuación general de elongación" },
        { expr: "v(t) = -A\\omega\\sin(\\omega t + \\phi)", desc: "Ecuación de velocidad instantánea" },
        { expr: "a(t) = -\\omega^2 x(t)", desc: "Ecuación de aceleración instantánea" }
      ]
    },

    // Paso 4: Reemplazo, Conversiones, Despeje y Solución (NARANJA)
    resolutionStep: {
      label: "Paso 4: Sustitución, Conversión de Unidades y Despeje",
      htmlContent: `
        <div style="margin-bottom: 10px;">
          <strong>A. Conversión de Unidades al Sistema Internacional (S.I.):</strong><br>
          • Masa: $m = 450\\text{ g} \\times \\left(\\frac{1\\text{ kg}}{1000\\text{ g}}\\right) = 0.450\\text{ kg}$<br>
          • Amplitud: $A = 12.0\\text{ cm} \\times \\left(\\frac{1\\text{ m}}{100\\text{ cm}}\\right) = 0.120\\text{ m}$<br>
          • Condiciones iniciales: En $t = 0$, $x(0) = A\\cos(\\phi) = A \\implies \\cos(\\phi) = 1 \\implies \\phi = 0\\text{ rad}$.
        </div>

        <div style="margin-bottom: 12px;">
          <strong>B. Cálculo de Parámetros Frecuenciales:</strong><br>
          $$\\omega = \\sqrt{\\frac{180\\text{ N/m}}{0.450\\text{ kg}}} = \\sqrt{400\\text{ s}^{-2}} = 20.0\\text{ rad/s}$$
          <div class="solved-result-badge">
            Variable resuelta: $\\omega = 20.0\\text{ rad/s}$ (Ya no es incógnita)
          </div><br>

          $$T = \\frac{2\\pi}{20.0\\text{ rad/s}} \\approx 0.3142\\text{ s}$$
          <div class="solved-result-badge">
            Variable resuelta: $T = 0.314\\text{ s}$ (Ya no es incógnita)
          </div><br>

          $$f = \\frac{1}{0.3142\\text{ s}} \\approx 3.183\\text{ Hz}$$
          <div class="solved-result-badge">
            Variable resuelta: $f = 3.18\\text{ Hz}$ (Ya no es incógnita)
          </div>
        </div>

        <div style="margin-bottom: 12px;">
          <strong>C. Valores Cinemáticos Máximos:</strong><br>
          $$v_{\\max} = A\\,\\omega = (0.120\\text{ m})(20.0\\text{ rad/s}) = 2.40\\text{ m/s}$$
          <div class="solved-result-badge">
            Variable resuelta: $v_{\\max} = 2.40\\text{ m/s}$ (Ya no es incógnita)
          </div><br>

          $$a_{\\max} = A\\,\\omega^2 = (0.120\\text{ m})(20.0\\text{ rad/s})^2 = 48.0\\text{ m/s}^2$$
          <div class="solved-result-badge">
            Variable resuelta: $a_{\\max} = 48.0\\text{ m/s}^2$ (Ya no es incógnita)
          </div>
        </div>

        <div style="margin-bottom: 10px;">
          <strong>D. Cinemática en el instante $t = 0.75\\text{ s}$:</strong><br>
          Argumento de fase: $\\theta = \\omega t = (20.0\\text{ rad/s})(0.75\\text{ s}) = 15.0\\text{ rad}$.<br>
          Reduciendo módulo $2\\pi$: $15.0 - 2\\pi(2) = 15.0 - 12.566 = 2.434\\text{ rad}$ ($139.43^\\circ$, segundo cuadrante).<br>
          • $\\cos(15.0\\text{ rad}) \\approx -0.7597$<br>
          • $\\sin(15.0\\text{ rad}) \\approx 0.6503$<br><br>

          $$x(0.75) = (0.120\\text{ m})(-0.7597) \\approx -0.0912\\text{ m} = -9.12\\text{ cm}$$
          <div class="solved-result-badge">
            Variable resuelta: $x(0.75\\text{ s}) = -0.0912\\text{ m}$ (Ya no es incógnita)
          </div><br>

          $$v(0.75) = -(0.120)(20.0)(0.6503) = -1.561\\text{ m/s}$$
          <div class="solved-result-badge">
            Variable resuelta: $v(0.75\\text{ s}) = -1.56\\text{ m/s}$ (Ya no es incógnita)
          </div><br>

          $$a(0.75) = -(20.0)^2(-0.0912\\text{ m}) = +36.48\\text{ m/s}^2$$
          <div class="solved-result-badge">
            Variable resuelta: $a(0.75\\text{ s}) = +36.5\\text{ m/s}^2$ (Ya no es incógnita)
          </div>
        </div>
      `
    },

    // Paso 5: Validación y conclusiones
    validationStep: {
      label: "Paso 5: Validación de Resultados y Conclusiones Físicas",
      notes: [
        "Consistencia Dimensional: $\\omega = \\sqrt{\\text{N}/(\\text{m}\\cdot\\text{kg})} = \\sqrt{\\text{kg}\\cdot\\text{m}/(\\text{s}^2\\cdot\\text{m}\\cdot\\text{kg})} = \\text{s}^{-1} = \\text{rad/s}$, lo que ratifica la homogeneidad dimensional.",
        "Comprobación Energética: $E_T = \\frac{1}{2} k A^2 = 0.5(180)(0.12)^2 = 1.296\\text{ J}$. En $t = 0.75\\text{ s}$: $K = \\frac{1}{2}(0.450)(-1.561)^2 = 0.548\\text{ J}$; $U = \\frac{1}{2}(180)(-0.0912)^2 = 0.748\\text{ J}$. Suma: $K + U = 1.296\\text{ J}$, verificando con total exactitud el Teorema de Conservación de la Energía Mecánica.",
        "Comprobación de Signos: En $x < 0$, la elongación está a la izquierda del equilibrio; la fuerza elástica restauradora empuja hacia la derecha, por ende la aceleración debe ser forzosamente positiva ($a > 0$), tal como se dedujo analíticamente."
      ]
    }
  },

  {
    page: 12,
    id: "caso-industrial-1",
    badge: "Caso Práctico en Ingeniería Industrial",
    title: "Aislamiento y Frecuencia Crítica de Vibraciones en Prensa Estampadora",
    statement: "En una planta de manufactura metalmecánica, una prensa excéntrica de masa $M = 1200\\text{ kg}$ opera con un motor a régimen nominal de $n = 900\\text{ rpm}$. Para evitar la transmisión de vibraciones destructivas a la losa de cimentación y a las estaciones de metrología contiguas, el equipo de Ingeniería de Planta debe diseñar una base de resortes helicoidales de acero. La norma ISO 10816 exige que la frecuencia natural del montaje sea al menos un $40\\%$ inferior a la frecuencia de excitación forzada del motor para evitar la condición de resonancia. Determine: 1) la frecuencia de excitación forzada en Hertz y rad/s; 2) la rigidez equivalente requerida para el conjunto de resortes de apoyo; 3) la deformación estática inicial por peso propio del equipo.",
    
    // Paso 1: Datos en AZUL
    dataStep: {
      label: "Paso 1: Identificación de los Datos",
      items: [
        { symbol: "M", value: "1200\\text{ kg}", note: "Masa total de la maquinaria a aislar" },
        { symbol: "n", value: "900\\text{ rpm}", note: "Velocidad angular operativa de excitación" },
        { symbol: "\\eta", value: "0.60", note: "Factor de diseño normativo (f_0 \\le 0.60 f_{\\text{exc}})" },
        { symbol: "g", value: "9.81\\text{ m/s}^2", note: "Aceleración de la gravedad local" }
      ]
    },

    // Paso 2: Incógnitas en ROJO
    unknownStep: {
      label: "Paso 2: Identificación de las Incógnitas",
      items: [
        { symbol: "f_{\\text{exc}}", target: "?", desc: "Frecuencia forzada de la máquina en Hertz (\\text{Hz})" },
        { symbol: "\\omega_{\\text{exc}}", target: "?", desc: "Frecuencia angular de excitación (\\text{rad/s})" },
        { symbol: "f_0", target: "?", desc: "Frecuencia natural máxima de diseño (\\text{Hz})" },
        { symbol: "\\omega_0", target: "?", desc: "Frecuencia natural angular del sistema aislado (\\text{rad/s})" },
        { symbol: "k_{\\text{eq}}", target: "?", desc: "Rigidez elástica combinada de la bancada (\\text{N/m})" },
        { symbol: "\\delta_{\\text{est}}", target: "?", desc: "Deflexión estática admisible por carga gravitatoria (\\text{mm})" }
      ]
    },

    // Paso 3: Fórmulas necesarias
    formulasStep: {
      label: "Paso 3: Fórmulas Necesarias",
      formulas: [
        { expr: "f_{\\text{exc}} = \\frac{n}{60}, \\quad \\omega_{\\text{exc}} = 2\\pi f_{\\text{exc}}", desc: "Conversión de régimen de giro a frecuencia cíclica" },
        { expr: "f_0 = \\eta \\cdot f_{\\text{exc}}, \\quad \\omega_0 = 2\\pi f_0", desc: "Criterio de sintonía antisísmica e industrial" },
        { expr: "\\omega_0 = \\sqrt{\\frac{k_{\\text{eq}}}{M}} \\implies k_{\\text{eq}} = M\\,\\omega_0^2", desc: "Rigidez equivalente requerida para la base" },
        { expr: "\\delta_{\\text{est}} = \\frac{M\\,g}{k_{\\text{eq}}} = \\frac{g}{\\omega_0^2}", desc: "Deflexión elástica estática bajo peso propio" }
      ]
    },

    // Paso 4: Reemplazo, Conversiones y Solución (NARANJA)
    resolutionStep: {
      label: "Paso 4: Sustitución, Conversión de Unidades y Despeje",
      htmlContent: `
        <div style="margin-bottom: 10px;">
          <strong>A. Determinación de la Frecuencia Forzada de Operación:</strong><br>
          $$f_{\\text{exc}} = \\frac{900\\text{ rev/min}}{60\\text{ s/min}} = 15.0\\text{ Hz}$$
          <div class="solved-result-badge">
            Variable resuelta: $f_{\\text{exc}} = 15.0\\text{ Hz}$ (Ya no es incógnita)
          </div><br>
          $$\\omega_{\\text{exc}} = 2\\pi(15.0\\text{ Hz}) \\approx 94.25\\text{ rad/s}$$
          <div class="solved-result-badge">
            Variable resuelta: $\\omega_{\\text{exc}} = 94.25\\text{ rad/s}$ (Ya no es incógnita)
          </div>
        </div>

        <div style="margin-bottom: 10px;">
          <strong>B. Frecuencia Natural Límite según Criterio ISO ($40\\%$ de margen):</strong><br>
          $$f_0 = 0.60 \\times 15.0\\text{ Hz} = 9.0\\text{ Hz}$$
          <div class="solved-result-badge">
            Variable resuelta: $f_0 = 9.0\\text{ Hz}$ (Ya no es incógnita)
          </div><br>
          $$\\omega_0 = 2\\pi(9.0\\text{ Hz}) = 18\\pi \\approx 56.55\\text{ rad/s}$$
          <div class="solved-result-badge">
            Variable resuelta: $\\omega_0 = 56.55\\text{ rad/s}$ (Ya no es incógnita)
          </div>
        </div>

        <div style="margin-bottom: 10px;">
          <strong>C. Rigidez Equivalente del Montaje ($k_{\\text{eq}}$):</strong><br>
          Despejando $k_{\\text{eq}}$ de $\\omega_0 = \\sqrt{k_{\\text{eq}}/M}$:<br>
          $$k_{\\text{eq}} = M \\cdot \\omega_0^2 = (1200\\text{ kg}) \\cdot (56.549\\text{ rad/s})^2 = 3\\,837\\,400\\text{ N/m} \\approx 3.84\\times 10^6\\text{ N/m}$$
          <div class="solved-result-badge">
            Variable resuelta: $k_{\\text{eq}} = 3.84\\times 10^6\\text{ N/m} = 3837\\text{ kN/m}$ (Ya no es incógnita)
          </div><br>
          <em>Si se instalan 4 amortiguadores en las esquinas de la base, cada resorte debe poseer:</em><br>
          $$k_{\\text{individual}} = \\frac{k_{\\text{eq}}}{4} = \\frac{3837\\text{ kN/m}}{4} = 959.35\\text{ kN/m}$$
        </div>

        <div style="margin-bottom: 10px;">
          <strong>D. Deflexión Estática Inicial por Peso Propio:</strong><br>
          $$\\delta_{\\text{est}} = \\frac{M\\,g}{k_{\\text{eq}}} = \\frac{(1200\\text{ kg})(9.81\\text{ m/s}^2)}{3\\,837\\,400\\text{ N/m}} = 0.003068\\text{ m} = 3.07\\text{ mm}$$
          <div class="solved-result-badge">
            Variable resuelta: $\\delta_{\\text{est}} = 3.07\\text{ mm}$ (Ya no es incógnita)
          </div>
        </div>
      `
    },

    // Paso 5: Validación y conclusiones
    validationStep: {
      label: "Paso 5: Validación de Resultados e Impacto en Ingeniería Industrial",
      notes: [
        "Aislamiento de Transmisibilidad: La relación de frecuencias es $r = \\frac{\\omega_{\\text{exc}}}{\\omega_0} = \\frac{94.25}{56.55} = 1.667 > \\sqrt{2} \\approx 1.414$. En teoría de vibraciones mecánicas, cuando la relación $r > \\sqrt{2}$, la transmisibilidad de fuerza a la cimentación cae por debajo de la unidad ($T_R < 1$), garantizando aislamiento efectivo del $56\\%$.",
        "Seguridad Operacional: Una deflexión estática de apenas $3.07\\text{ mm}$ evita el desbalanceo geométrico severo de las líneas de alimentación de chapa metálica y protege los troqueles de estampado.",
        "Conclusión para la Gestión de Mantenimiento: El uso de 4 aisladores de $960\\text{ kN/m}$ distribuidos simétricamente cumple con holgura la norma ISO 10816, extendiendo la vida útil de los rodamientos y reduciendo la contaminación acústica en la nave fabril."
      ]
    }
  },

  /* ==========================================================================
     SECCIÓN 15.2 (SERWAY & JEWETT): ANÁLISIS DE MODELO - PARTÍCULA EN M.A.S.
     5 EJERCICIOS ENUNCIADOS Y RESUELTOS CON PROTOCOLO ESTRICTO EN 5 PASOS
     ========================================================================== */

  // EJERCICIO 1 DE SECCIÓN 15.2 (Problema 2 del libro)
  {
    page: 13,
    id: "serway-15-2",
    badge: "Problema 2 • Sección 15.2",
    title: "Pistón de Motor a Gasolina: Velocidad y Aceleración Máximas a 3600 rpm",
    statement: "Un pistón en un motor a gasolina está en movimiento armónico simple. El motor está corriendo a razón de $3\\,600\\text{ rev/min}$. Si considera los extremos de su posición relativa con su punto central como $\\pm 5.00\\text{ cm}$, encuentre las magnitudes de (a) la velocidad máxima y (b) la aceleración máxima del pistón.",
    
    // Paso 1: Datos en AZUL
    dataStep: {
      label: "Paso 1: Identificación de los Datos (Azul)",
      items: [
        { symbol: "n", value: "3\\,600\\text{ rev/min}", note: "Frecuencia de giro o régimen de rotación del cigüeñal" },
        { symbol: "A", value: "5.00\\text{ cm}", note: "Amplitud de oscilación del pistón respecto al centro" },
        { symbol: "x_{\\text{centro}}", value: "0.00\\text{ cm}", note: "Posición central tomada como punto de equilibrio" },
        { symbol: "x_{\\text{extremos}}", value: "\\pm 5.00\\text{ cm}", note: "Límites superior e inferior del desplazamiento" }
      ]
    },

    // Paso 2: Incógnitas en ROJO
    unknownStep: {
      label: "Paso 2: Identificación de las Incógnitas (Rojo)",
      items: [
        { symbol: "v_{\\max}", target: "?", desc: "Magnitud de la velocidad máxima instantánea del pistón (\\text{m/s})" },
        { symbol: "a_{\\max}", target: "?", desc: "Magnitud de la aceleración máxima instantánea del pistón (\\text{m/s}^2)" },
        { symbol: "f", target: "?", desc: "Frecuencia cíclica de oscilación en Hertz (\\text{Hz})" },
        { symbol: "\\omega", target: "?", desc: "Frecuencia angular del movimiento armónico (\\text{rad/s})" }
      ]
    },

    // Paso 3: Fórmulas necesarias
    formulasStep: {
      label: "Paso 3: Fórmulas Necesarias",
      formulas: [
        { expr: "f = \\frac{n}{60\\text{ s/min}}, \\quad \\omega = 2\\pi f = \\frac{2\\pi n}{60}", desc: "Conversión de velocidad angular a pulsación armónica" },
        { expr: "v_{\\max} = \\omega \\cdot A", desc: "Velocidad máxima alcanzada en el cruce por el punto de equilibrio (x = 0)" },
        { expr: "a_{\\max} = \\omega^2 \\cdot A", desc: "Aceleración máxima alcanzada en los extremos de retorno (x = ±A)" }
      ]
    },

    // Paso 4: Reemplazo, Conversiones y Solución (NARANJA)
    resolutionStep: {
      label: "Paso 4: Sustitución, Conversión de Unidades y Despeje (Naranja)",
      htmlContent: `
        <div style="margin-bottom: 10px;">
          <strong>A. Conversión de Unidades al Sistema Internacional (S.I.):</strong><br>
          • Amplitud: $A = 5.00\\text{ cm} \\times \\left(\\frac{1\\text{ m}}{100\\text{ cm}}\\right) = 0.0500\\text{ m}$<br>
          • Frecuencia de rotación: $f = \\frac{3600\\text{ rev/min}}{60\\text{ s/min}} = 60.0\\text{ s}^{-1} = 60.0\\text{ Hz}$<br>
          • Frecuencia angular: $\\omega = 2\\pi(60.0\\text{ s}^{-1}) = 120\\pi\\text{ rad/s} \\approx 376.99\\text{ rad/s}$
        </div>

        <div style="margin-bottom: 12px;">
          <strong>B. Cálculo de (a) la Velocidad Máxima del Pistón ($v_{\\max}$):</strong><br>
          $$v_{\\max} = \\omega \\cdot A = (376.99\\text{ rad/s})(0.0500\\text{ m}) = 18.8496\\text{ m/s} \\approx 18.8\\text{ m/s}$$
          <div class="solved-result-badge">
            Variable resuelta (a): $v_{\\max} = 18.8\\text{ m/s} = 67.9\\text{ km/h}$
          </div>
        </div>

        <div style="margin-bottom: 12px;">
          <strong>C. Cálculo de (b) la Aceleración Máxima del Pistón ($a_{\\max}$):</strong><br>
          $$a_{\\max} = \\omega^2 \\cdot A = (376.99\\text{ rad/s})^2(0.0500\\text{ m}) = (142\\,122.3\\text{ rad}^2/\\text{s}^2)(0.0500\\text{ m}) = 7\\,106.1\\text{ m/s}^2 \\approx 7.11\\times 10^3\\text{ m/s}^2$$
          <div class="solved-result-badge">
            Variable resuelta (b): $a_{\\max} = 7.11\\times 10^3\\text{ m/s}^2$
          </div>
        </div>
      `
    },

    // Paso 5: Validación y conclusiones
    validationStep: {
      label: "Paso 5: Validación de Resultados e Interpretación Física",
      notes: [
        "Comparación Gravitatoria (Fuerza G): $a_{\\max}/g = \\frac{7106.1\\text{ m/s}^2}{9.81\\text{ m/s}^2} \\approx 724.4\\,g$. El pistón experimenta más de 700 veces la aceleración de la gravedad terrestre en cada inversión de marcha (puntos muertos superior e inferior).",
        "Implicación en Ingeniería Mecánica: Estas enormes fuerzas inerciales de vaivén ($F_{\\text{inercia}} = m\\,a_{\\max}$) imponen el uso de aleaciones ligeras de aluminio forjado y pasadores de titanio o acero al cromo-níquel templado para mitigar la fatiga mecánica.",
        "Consistencia de Fases: La velocidad es máxima cuando la aceleración es nula (en el centro $x=0$), y la aceleración es máxima cuando la velocidad es nula (en los extremos $x=\\pm A$), respetando la cuadratura de fase de $\\pi/2$ rad."
      ]
    }
  },

  // EJERCICIO 2 DE SECCIÓN 15.2 (Problema 3 del libro)
  {
    page: 13,
    id: "serway-15-3",
    badge: "Problema 3 • Sección 15.2",
    title: "Cinemática de Onda de una Partícula: Parámetros y Posición Instantánea",
    statement: "La posición de una partícula está dada por la expresión $x = 4.00 \\cos(3.00\\pi t + \\pi)$ (en el texto impreso aparece como $3.00\\omega t + \\pi$), donde $x$ está en metros y $t$ en segundos. Determine: (a) la frecuencia y (b) el periodo del movimiento, (c) la amplitud del movimiento, (d) la constante de fase y (e) la posición de la partícula en $t = 0.250\\text{ s}$.",
    
    // Paso 1: Datos en AZUL
    dataStep: {
      label: "Paso 1: Identificación de los Datos (Azul)",
      items: [
        { symbol: "x(t)", value: "4.00 \\cos(3.00\\pi t + \\pi)\\text{ m}", note: "Ecuación analítica de la elongación temporal" },
        { symbol: "t_1", value: "0.250\\text{ s}", note: "Instante temporal específico de evaluación para el inciso (e)" },
        { symbol: "\\text{Unidades}", value: "x\\text{ en m},\\, t\\text{ en s}", note: "Sistema Internacional de Unidades explícito" }
      ]
    },

    // Paso 2: Incógnitas en ROJO
    unknownStep: {
      label: "Paso 2: Identificación de las Incógnitas (Rojo)",
      items: [
        { symbol: "f", target: "?", desc: "Frecuencia cíclica de oscilación en Hertz (\\text{Hz})" },
        { symbol: "T", target: "?", desc: "Período temporal del ciclo completo en segundos (\\text{s})" },
        { symbol: "A", target: "?", desc: "Amplitud máxima del movimiento armónico en metros (\\text{m})" },
        { symbol: "\\phi", target: "?", desc: "Constante de fase inicial en radianes (\\text{rad})" },
        { symbol: "x(0.250)", target: "?", desc: "Posición instantánea de la partícula en t = 0.250 s (\\text{m})" }
      ]
    },

    // Paso 3: Fórmulas necesarias
    formulasStep: {
      label: "Paso 3: Fórmulas Necesarias",
      formulas: [
        { expr: "x(t) = A\\cos(\\omega t + \\phi)", desc: "Forma general canónica del Movimiento Armónico Simple" },
        { expr: "\\omega = 2\\pi f \\implies f = \\frac{\\omega}{2\\pi}", desc: "Relación entre pulsación angular y frecuencia cíclica" },
        { expr: "T = \\frac{1}{f} = \\frac{2\\pi}{\\omega}", desc: "Período temporal de una oscilación completa" },
        { expr: "x(t_1) = A\\cos(\\omega t_1 + \\phi)", desc: "Evaluación trigonométrica de la elongación" }
      ]
    },

    // Paso 4: Reemplazo, Conversiones y Solución (NARANJA)
    resolutionStep: {
      label: "Paso 4: Sustitución, Conversión de Unidades y Despeje (Naranja)",
      htmlContent: `
        <div style="margin-bottom: 10px;">
          <strong>A. Identificación de Parámetros por Comparación Directa con $x(t) = A\\cos(\\omega t + \\phi)$:</strong><br>
          Comparando término a término con $x(t) = 4.00 \\cos(3.00\\pi t + \\pi)$:<br>
          • Amplitud: $A = 4.00\\text{ m}$<br>
          • Frecuencia angular: $\\omega = 3.00\\pi\\text{ rad/s} \\approx 9.425\\text{ rad/s}$<br>
          • Constante de fase: $\\phi = \\pi\\text{ rad} = 180^\\circ$
        </div>

        <div style="margin-bottom: 12px;">
          <strong>B. Cálculo de (a) Frecuencia y (b) Período:</strong><br>
          $$f = \\frac{\\omega}{2\\pi} = \\frac{3.00\\pi\\text{ rad/s}}{2\\pi\\text{ rad}} = 1.50\\text{ Hz}$$
          <div class="solved-result-badge">
            Variable resuelta (a): $f = 1.50\\text{ Hz}$
          </div><br>

          $$T = \\frac{1}{f} = \\frac{1}{1.50\\text{ Hz}} = \\frac{2}{3}\\text{ s} \\approx 0.667\\text{ s}$$
          <div class="solved-result-badge">
            Variable resuelta (b): $T = 0.667\\text{ s} = \\frac{2}{3}\\text{ s}$
          </div>
        </div>

        <div style="margin-bottom: 12px;">
          <strong>C. Identificación de (c) Amplitud y (d) Constante de Fase:</strong><br>
          <div class="solved-result-badge">
            Variable resuelta (c): $A = 4.00\\text{ m}$
          </div><br>
          <div class="solved-result-badge">
            Variable resuelta (d): $\\phi = \\pi\\text{ rad} = 180^\\circ$
          </div>
        </div>

        <div style="margin-bottom: 10px;">
          <strong>D. Cálculo de (e) la Posición en el instante $t = 0.250\\text{ s}$:</strong><br>
          Fase instantánea del argumento:<br>
          $$\\theta = 3.00\\pi(0.250\\text{ s}) + \\pi = 0.75\\pi + \\pi = 1.75\\pi\\text{ rad} = \\frac{7\\pi}{4}\\text{ rad} = 315^\\circ$$
          Calculando el coseno en el cuarto cuadrante:<br>
          $$\\cos\\left(\\frac{7\\pi}{4}\\right) = \\cos\\left(-\\frac{\\pi}{4}\\right) = \\frac{\\sqrt{2}}{2} \\approx 0.707107$$
          Sustituyendo en la ecuación horaria:<br>
          $$x(0.250\\text{ s}) = (4.00\\text{ m}) \\cdot \\cos\\left(\\frac{7\\pi}{4}\\right) = 4.00 \\cdot \\frac{\\sqrt{2}}{2} = 2\\sqrt{2}\\text{ m} \\approx 2.83\\text{ m}$$
          <div class="solved-result-badge">
            Variable resuelta (e): $x(0.250\\text{ s}) = 2\\sqrt{2}\\text{ m} \\approx 2.83\\text{ m}$
          </div>
        </div>
      `
    },

    // Paso 5: Validación y conclusiones
    validationStep: {
      label: "Paso 5: Validación de Resultados y Análisis de Trayectoria",
      notes: [
        "Estado Inicial ($t = 0$): $x(0) = 4.00\\cos(\\pi) = -4.00\\text{ m}$. La partícula parte exactamente del extremo izquierdo negativo con velocidad nula inicial.",
        "Progresión en el Ciclo: Al cabo de un cuarto de período ($T/4 = \\frac{2/3}{4} = \\frac{1}{6}\\text{ s} \\approx 0.167\\text{ s}$), la partícula cruza el origen $x = 0$ en dirección hacia la derecha.",
        "Coherencia en $t = 0.250\\text{ s}$: Puesto que $0.250\\text{ s} = \\frac{3}{8}T$ (a mitad de camino entre el origen y el extremo positivo $+A = +4.00\\text{ m}$), la elongación debe ser positiva y menor que $4.00\\text{ m}$. El valor exacto $x = 2\\sqrt{2}\\text{ m} \\approx 2.83\\text{ m}$ cumple rigurosamente con la geometría de la función armónica."
      ]
    }
  },

  // EJERCICIO 3 DE SECCIÓN 15.2 (Problema 4 del libro)
  {
    page: 13,
    id: "serway-15-4",
    badge: "Problema 4 • Sección 15.2",
    title: "Objeto Suspendido de un Resorte Vertical: Rigidez Elástica a partir del Período",
    statement: "Un objeto de $7.00\\text{ kg}$ cuelga del extremo inferior de un resorte vertical amarrado a una viga. El objeto se pone a oscilar verticalmente con un periodo de $2.60\\text{ s}$. Encuentre la constante de fuerza del resorte.",
    
    // Paso 1: Datos en AZUL
    dataStep: {
      label: "Paso 1: Identificación de los Datos (Azul)",
      items: [
        { symbol: "m", value: "7.00\\text{ kg}", note: "Masa del objeto suspendido de la viga" },
        { symbol: "T", value: "2.60\\text{ s}", note: "Período temporal de oscilación vertical completa" }
      ]
    },

    // Paso 2: Incógnitas en ROJO
    unknownStep: {
      label: "Paso 2: Identificación de las Incógnitas (Rojo)",
      items: [
        { symbol: "k", target: "?", desc: "Constante recuperadora de fuerza o rigidez elástica del resorte (\\text{N/m})" },
        { symbol: "\\omega", target: "?", desc: "Frecuencia angular del sistema masa-resorte (\\text{rad/s})" }
      ]
    },

    // Paso 3: Fórmulas necesarias
    formulasStep: {
      label: "Paso 3: Fórmulas Necesarias",
      formulas: [
        { expr: "T = 2\\pi \\sqrt{\\frac{m}{k}}", desc: "Período de oscilación de un resorte ideal en M.A.S." },
        { expr: "T^2 = 4\\pi^2 \\frac{m}{k} \\implies k = \\frac{4\\pi^2 m}{T^2}", desc: "Despeje algebraico de la constante elástica k" },
        { expr: "\\omega = \\frac{2\\pi}{T} = \\sqrt{\\frac{k}{m}}", desc: "Pulsación angular natural del oscilador" }
      ]
    },

    // Paso 4: Reemplazo, Conversiones y Solución (NARANJA)
    resolutionStep: {
      label: "Paso 4: Sustitución, Conversión de Unidades y Despeje (Naranja)",
      htmlContent: `
        <div style="margin-bottom: 10px;">
          <strong>A. Frecuencia Angular de Oscilación:</strong><br>
          $$\\omega = \\frac{2\\pi}{T} = \\frac{2\\pi}{2.60\\text{ s}} \\approx 2.4166\\text{ rad/s}$$
        </div>

        <div style="margin-bottom: 12px;">
          <strong>B. Despeje y Sustitución de la Constante de Fuerza ($k$):</strong><br>
          A partir de la relación canónica $T = 2\\pi \\sqrt{\\frac{m}{k}}$:<br>
          $$k = \\frac{4\\pi^2 \\cdot m}{T^2}$$
          Sustituyendo los valores numéricos directos:<br>
          $$k = \\frac{4\\pi^2 \\cdot (7.00\\text{ kg})}{(2.60\\text{ s})^2} = \\frac{4 \\cdot 9.8696 \\cdot 7.00\\text{ kg}}{6.76\\text{ s}^2} = \\frac{276.349\\text{ kg}}{6.76\\text{ s}^2} \\approx 40.8799\\text{ N/m}$$
          <div class="solved-result-badge">
            Variable resuelta: $k = 40.9\\text{ N/m} = 40.9\\text{ kg/s}^2$
          </div>
        </div>
      `
    },

    // Paso 5: Validación y conclusiones
    validationStep: {
      label: "Paso 5: Validación Dimensional y Fisiomecánica",
      notes: [
        "Homogeneidad Dimensional: $[k] = \\frac{[M]}{[T]^2} = \\frac{\\text{kg}}{\\text{s}^2} = \\frac{\\text{kg}\\cdot\\text{m}}{\\text{s}^2\\cdot\\text{m}} = \\frac{\\text{N}}{\\text{m}}$, concordancia absoluta con la unidad de rigidez en el S.I.",
        "Comprobación Retrospectiva: Sustituyendo $k = 40.88\\text{ N/m}$ en la fórmula del período: $T = 2\\pi\\sqrt{7.00 / 40.88} = 2\\pi\\sqrt{0.17123} = 2\\pi(0.4138) = 2.60\\text{ s}$, verificando con exactitud el dato experimental.",
        "Independencia de la Gravedad: Nótese que aunque el resorte cuelgue verticalmente, la gravedad únicamente desplaza la posición de equilibrio estático ($y_0 = mg/k$), pero NO altera en absoluto la frecuencia ni el período de oscilación armónica."
      ]
    }
  },

  // EJERCICIO 4 DE SECCIÓN 15.2 (Problema 7 del libro)
  {
    page: 13,
    id: "serway-15-7",
    badge: "Problema 7 • Sección 15.2",
    title: "Partícula Partiendo del Origen: Ecuación Horaria Senoidal y Distancia Recorrida",
    statement: "Una partícula que se mueve a lo largo del eje $x$ en movimiento armónico simple parte de su posición de equilibrio, el origen, en $t = 0$ y se mueve a la derecha. La amplitud de su movimiento es de $2.00\\text{ cm}$ y la frecuencia de $1.50\\text{ Hz}$. (a) Encuentre una expresión para la posición de la partícula como una función del tiempo. Determine (b) la rapidez máxima de la partícula y (c) el tiempo más temprano ($t > 0$) en el que la partícula tiene esta rapidez. Encuentre (d) la aceleración positiva máxima de la partícula y (e) el tiempo más temprano ($t > 0$) en el que la partícula tiene esta aceleración, y (f) la distancia total recorrida entre $t = 0$ y $t = 1.00\\text{ s}$.",
    
    // Paso 1: Datos en AZUL
    dataStep: {
      label: "Paso 1: Identificación de los Datos (Azul)",
      items: [
        { symbol: "x(0)", value: "0.00\\text{ m}", note: "Condición de posición inicial: parte del origen de equilibrio" },
        { symbol: "v(0)", value: "> 0\\text{ (hacia la derecha)}", note: "Sentido del movimiento en el instante inicial" },
        { symbol: "A", value: "2.00\\text{ cm} = 0.0200\\text{ m}", note: "Amplitud máxima de oscilación" },
        { symbol: "f", value: "1.50\\text{ Hz}", note: "Frecuencia cíclica de oscilación" },
        { symbol: "\\Delta t", value: "1.00\\text{ s}", note: "Intervalo temporal para el cálculo de distancia recorrida" }
      ]
    },

    // Paso 2: Incógnitas en ROJO
    unknownStep: {
      label: "Paso 2: Identificación de las Incógnitas (Rojo)",
      items: [
        { symbol: "x(t)", target: "?", desc: "Expresión horaria analítica de la posición (\\text{m})" },
        { symbol: "v_{\\max}", target: "?", desc: "Rapidez máxima instantánea de la partícula (\\text{m/s})" },
        { symbol: "t_v", target: "?", desc: "Tiempo más temprano t > 0 con rapidez máxima (\\text{s})" },
        { symbol: "a_{\\max}^+", target: "?", desc: "Aceleración positiva máxima de la partícula (\\text{m/s}^2)" },
        { symbol: "t_a", target: "?", desc: "Tiempo más temprano t > 0 con aceleración positiva máxima (\\text{s})" },
        { symbol: "d_{\\text{total}}", target: "?", desc: "Distancia total acumulada en el intervalo [0, 1.00 s] (\\text{cm})" }
      ]
    },

    // Paso 3: Fórmulas necesarias
    formulasStep: {
      label: "Paso 3: Fórmulas Necesarias",
      formulas: [
        { expr: "\\omega = 2\\pi f, \\quad T = \\frac{1}{f}", desc: "Pulsación angular y período fundamental" },
        { expr: "x(t) = A\\operatorname{sen}(\\omega t + \\alpha)", desc: "Ecuación de elongación con base seno solicitada por el usuario" },
        { expr: "v(t) = \\omega A\\cos(\\omega t + \\alpha), \\quad v_{\\max} = \\omega A", desc: "Velocidad instantánea y rapidez máxima" },
        { expr: "a(t) = -\\omega^2 A\\operatorname{sen}(\\omega t + \\alpha) = -\\omega^2 x", desc: "Aceleración instantánea y aceleración extrema" },
        { expr: "d_{\\text{ciclo}} = 4A", desc: "Distancia lineal recorrida en cada oscilación completa (1T)" }
      ]
    },

    // Paso 4: Reemplazo, Conversiones y Solución (NARANJA)
    resolutionStep: {
      label: "Paso 4: Sustitución, Conversión de Unidades y Despeje (Naranja)",
      htmlContent: `
        <div style="margin-bottom: 10px;">
          <strong>A. Parámetros Frecuenciales y Fase Inicial:</strong><br>
          • $\\omega = 2\\pi(1.50\\text{ Hz}) = 3.00\\pi\\text{ rad/s} \\approx 9.425\\text{ rad/s}$<br>
          • $T = \\frac{1}{1.50\\text{ Hz}} = \\frac{2}{3}\\text{ s} \\approx 0.667\\text{ s}$<br>
          • Condición inicial en $t=0$: $x(0) = A\\operatorname{sen}(\\alpha) = 0 \\implies \\alpha = 0$ o $\\pi$. Dado que $v(0) = \\omega A\\cos(\\alpha) > 0$, concluimos unívocamente que $\\cos(\\alpha) > 0 \\implies \\alpha = 0\\text{ rad}$.
        </div>

        <div style="margin-bottom: 12px;">
          <strong>B. (a) Expresión de la Posición en Función del Tiempo:</strong><br>
          $$x(t) = (0.0200\\text{ m}) \\cdot \\operatorname{sen}(3.00\\pi t) \\quad \\text{ó} \\quad x(t) = (2.00\\text{ cm}) \\cdot \\operatorname{sen}(3.00\\pi t)$$
          <div class="solved-result-badge">
            Variable resuelta (a): $x(t) = (0.0200\\text{ m})\\operatorname{sen}(3.00\\pi t)$
          </div>
        </div>

        <div style="margin-bottom: 12px;">
          <strong>C. (b) Rapidez Máxima y (c) Primer Instante $t > 0$:</strong><br>
          $$v_{\\max} = \\omega A = (3.00\\pi\\text{ rad/s})(0.0200\\text{ m}) = 0.0600\\pi\\text{ m/s} \\approx 0.1885\\text{ m/s} = 18.8\\text{ cm/s}$$
          <div class="solved-result-badge">
            Variable resuelta (b): $v_{\\max} = 0.188\\text{ m/s} = 18.8\\text{ cm/s}$
          </div><br>
          La rapidez es máxima en cada cruce por el punto de equilibrio ($x=0$). El primer instante tras partir de $t=0$ ocurre en medio período ($T/2$):<br>
          $$t = \\frac{T}{2} = \\frac{2/3\\text{ s}}{2} = \\frac{1}{3}\\text{ s} \\approx 0.333\\text{ s}$$
          <div class="solved-result-badge">
            Variable resuelta (c): $t = \\frac{1}{3}\\text{ s} \\approx 0.333\\text{ s}$
          </div>
        </div>

        <div style="margin-bottom: 12px;">
          <strong>D. (d) Aceleración Positiva Máxima y (e) Primer Instante $t > 0$:</strong><br>
          La aceleración es $a(t) = -\\omega^2 x$. Es máxima y positiva cuando $x$ alcanza su mínimo ($x = -A$):<br>
          $$a_{\\max}^+ = \\omega^2 A = (3.00\\pi\\text{ rad/s})^2 (0.0200\\text{ m}) = 0.180\\pi^2\\text{ m/s}^2 \\approx 1.7765\\text{ m/s}^2 \\approx 1.78\\text{ m/s}^2$$
          <div class="solved-result-badge">
            Variable resuelta (d): $a_{\\max}^+ = 1.78\\text{ m/s}^2$
          </div><br>
          La partícula llega al extremo negativo $x = -A$ en $t = \\frac{3}{4}T$:<br>
          $$t = \\frac{3}{4}T = \\frac{3}{4}\\left(\\frac{2}{3}\\text{ s}\\right) = \\frac{1}{2}\\text{ s} = 0.500\\text{ s}$$
          <div class="solved-result-badge">
            Variable resuelta (e): $t = 0.500\\text{ s}$
          </div>
        </div>

        <div style="margin-bottom: 10px;">
          <strong>E. (f) Distancia Total Recorrida entre $t = 0$ y $t = 1.00\\text{ s}$:</strong><br>
          El intervalo de tiempo total es $\\Delta t = 1.00\\text{ s} = \\frac{1.00}{2/3} T = 1.5\\,T$ (un ciclo y medio completo).<br>
          • En 1 período completo ($0\\text{ s} \\to \\frac{2}{3}\\text{ s}$): la partícula viaja de $0 \\to +A \\to 0 \\to -A \\to 0$, recorriendo $4A = 4(2.00\\text{ cm}) = 8.00\\text{ cm}$.<br>
          • En el medio período restante ($\\frac{2}{3}\\text{ s} \\to 1.00\\text{ s}$): viaja de $0 \\to +A \\to 0$, recorriendo $2A = 2(2.00\\text{ cm}) = 4.00\\text{ cm}$.<br>
          $$d_{\\text{total}} = 4A + 2A = 6A = 6(2.00\\text{ cm}) = 12.0\\text{ cm} = 0.120\\text{ m}$$
          <div class="solved-result-badge">
            Variable resuelta (f): $d_{\\text{total}} = 12.0\\text{ cm} = 0.120\\text{ m}$
          </div>
        </div>
      `
    },

    // Paso 5: Validación y conclusiones
    validationStep: {
      label: "Paso 5: Validación por Integración y Análisis Cinemático",
      notes: [
        "Comprobación por Cálculo Integral: La distancia total recorrida es la integral del módulo de la velocidad: $d = \\int_0^1 |v(t)|dt = \\int_0^1 |0.06\\pi \\cos(3\\pi t)|dt = 6 \\times (0.02\\text{ m}) = 0.120\\text{ m}$, confirmando sin margen de duda el resultado.",
        "Diferencia entre Desplazamiento y Distancia: En $t = 1.00\\text{ s}$, la partícula está en $x(1) = 0.02\\operatorname{sen}(3\\pi) = 0\\text{ m}$, por lo que su desplazamiento neto es $\\Delta x = 0$, mientras que la distancia física acumulada es de $12.0\\text{ cm}$.",
        "Validación con la Ecuación del Usuario: Este ejercicio aplica fielmente la función $x(t) = A\\operatorname{sen}(\\omega t + \\alpha)$ requerida para la aplicación web."
      ]
    }
  },

  // EJERCICIO 5 DE SECCIÓN 15.2 (Problema 9 del libro)
  {
    page: 13,
    id: "serway-15-9",
    badge: "Problema 9 • Sección 15.2",
    title: "Resorte Vertical Estirado en Reposo: Demostración y Cálculo del Período",
    statement: "Usted une un objeto al extremo inferior de un resorte vertical que cuelga en reposo después de extender el resorte $18.3\\text{ cm}$. Luego pone el objeto a vibrar. (a) ¿Tiene suficiente información para encontrar su periodo? (b) Explique su respuesta y establezca lo que pueda acerca de su periodo.",
    
    // Paso 1: Datos en AZUL
    dataStep: {
      label: "Paso 1: Identificación de los Datos (Azul)",
      items: [
        { symbol: "\\Delta L", value: "18.3\\text{ cm} = 0.183\\text{ m}", note: "Extensión estática de deformación del resorte en reposo" },
        { symbol: "g", value: "9.80\\text{ m/s}^2", note: "Aceleración de la gravedad estándar (o 9.81 m/s²)" },
        { symbol: "v_0", value: "0\\text{ m/s}", note: "Condición de partida en reposo previo a la perturbación oscilatoria" }
      ]
    },

    // Paso 2: Incógnitas en ROJO
    unknownStep: {
      label: "Paso 2: Identificación de las Incógnitas (Rojo)",
      items: [
        { symbol: "\\text{¿Información? }", target: "\\text{¿Suficiente?}", desc: "Determinación lógica de suficiencia analítica de datos (Sí/No)" },
        { symbol: "T", target: "?", desc: "Período temporal del oscilador armónico resultante (\\text{s})" },
        { symbol: "f", target: "?", desc: "Frecuencia de vibración armónica (\\text{Hz})" },
        { symbol: "\\omega", target: "?", desc: "Pulsación angular natural del sistema (\\text{rad/s})" }
      ]
    },

    // Paso 3: Fórmulas necesarias
    formulasStep: {
      label: "Paso 3: Fórmulas Necesarias",
      formulas: [
        { expr: "\\sum F_y = 0 \\implies k\\,\\Delta L = m\\,g", desc: "Condición de equilibrio estático gravitatorio-elástico" },
        { expr: "\\frac{m}{k} = \\frac{\\Delta L}{g}", desc: "Relación de equivalencia entre masa/rigidez y deformación/gravedad" },
        { expr: "T = 2\\pi \\sqrt{\\frac{m}{k}} = 2\\pi \\sqrt{\\frac{\\Delta L}{g}}", desc: "Deducción canónica del período sin depender explícitamente de m ni de k" },
        { expr: "\\omega = \\sqrt{\\frac{g}{\\Delta L}}, \\quad f = \\frac{1}{T}", desc: "Pulsación angular y frecuencia natural del sistema" }
      ]
    },

    // Paso 4: Reemplazo, Conversiones y Solución (NARANJA)
    resolutionStep: {
      label: "Paso 4: Sustitución, Conversión de Unidades y Despeje (Naranja)",
      htmlContent: `
        <div style="margin-bottom: 10px;">
          <strong>A. (a) Respuesta a la Pregunta Conceptual y Demostración Formal:</strong><br>
          <div class="solved-result-badge" style="background: #ecfdf5; color: #065f46; border-color: #a7f3d0; margin-bottom: 8px;">
            Respuesta (a): <strong>SÍ, TIENE TOTAL Y PLENA INFORMACIÓN PARA HALLAR EL PERÍODO.</strong>
          </div>
          <strong>Explicación Física:</strong><br>
          Cuando el objeto cuelga en reposo, el peso hacia abajo equilibra exactamente a la fuerza elástica hacia arriba:<br>
          $$k\\,\\Delta L = m\\,g \\implies \\frac{m}{k} = \\frac{\\Delta L}{g}$$
          La ecuación general para el período de oscilación de un resorte es $T = 2\\pi\\sqrt{m/k}$. Al sustituir la relación del equilibrio estático, se obtiene:<br>
          $$T = 2\\pi \\sqrt{\\frac{\\Delta L}{g}}$$
          Como se observa, el período depende <em>exclusivamente</em> de la elongación estática $\\Delta L$ y de la constante gravitacional $g$, sin requerir los valores individuales de la masa $m$ ni de la rigidez $k$.
        </div>

        <div style="margin-bottom: 12px;">
          <strong>B. (b) Cálculo Numérico Riguroso del Período de Vibración:</strong><br>
          Conversión de unidades: $\\Delta L = 18.3\\text{ cm} = 0.183\\text{ m}$.<br>
          Empleando $g = 9.80\\text{ m/s}^2$:<br>
          $$T = 2\\pi \\sqrt{\\frac{0.183\\text{ m}}{9.80\\text{ m/s}^2}} = 2\\pi \\sqrt{0.0186735\\text{ s}^2} = 2\\pi \\cdot (0.136651\\text{ s}) = 0.8586\\text{ s} \\approx 0.859\\text{ s}$$
          <em>(Si se toma $g = 9.81\\text{ m/s}^2$, $T = 2\\pi\\sqrt{0.183/9.81} = 0.8582\\text{ s} \\approx 0.858\\text{ s}$)</em>.<br>
          <div class="solved-result-badge">
            Variable resuelta (b): $T = 0.859\\text{ s}$
          </div>
        </div>

        <div style="margin-bottom: 10px;">
          <strong>C. Parámetros Cinemáticos Complementarios Derivados:</strong><br>
          • Frecuencia cíclica: $f = \\frac{1}{T} = \\frac{1}{0.8586\\text{ s}} \\approx 1.165\\text{ Hz}$<br>
          <div class="solved-result-badge">
            Variable resuelta: $f = 1.16\\text{ Hz}$
          </div><br>
          • Frecuencia angular: $\\omega = \\sqrt{\\frac{g}{\\Delta L}} = \\sqrt{\\frac{9.80}{0.183}} = \\sqrt{53.55} \\approx 7.318\\text{ rad/s}$<br>
          <div class="solved-result-badge">
            Variable resuelta: $\\omega = 7.32\\text{ rad/s}$
          </div>
        </div>
      `
    },

    // Paso 5: Validación y conclusiones
    validationStep: {
      label: "Paso 5: Validación Dimensional y Epistemológica",
      notes: [
        "Homogeneidad Dimensional: $[T] = \\sqrt{\\frac{[L]}{[L][T]^{-2}}} = \\sqrt{[T]^2} = [T] = \\text{segundos}$, verificando la formulación analítica.",
        "Maravillosa Analogía con el Péndulo Simple: La fórmula obtenida $T = 2\\pi\\sqrt{\\Delta L / g}$ es matemáticamente idéntica a la del péndulo simple $T = 2\\pi\\sqrt{L / g}$. ¡La deformación estática $\\Delta L$ del resorte actúa como la longitud efectiva de un péndulo de igual período!",
        "Relevancia en Ensayos Industriales: En metrología y control de calidad, este método permite calibrar la constante de rigidez $k$ de cualquier resorte con un cronómetro y una regla graduada sin necesidad de balanzas de precisión."
      ]
    }
  }
];
