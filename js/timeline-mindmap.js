/**
 * CUADERNO VIRTUAL INTERACTIVO - FÍSICA III
 * COMPONENTES DE LÍNEA DE TIEMPO INTERACTIVA Y MAPA MENTAL CONCEPTUAL
 */

window.renderTimeline = function(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const events = [
    {
      year: "1581",
      scientist: "Galileo Galilei",
      title: "Descubrimiento del Isocronismo Pendular",
      desc: "Observando el balanceo de una lámpara en la Catedral de Pisa, determinó que el período de oscilación es independiente de la amplitud para pequeñas desviaciones angulares, estableciendo el nacimiento de la cronometría experimental.",
      icon: "compass"
    },
    {
      year: "1656",
      scientist: "Christiaan Huygens",
      title: "Invención del Reloj de Péndulo y Curva Cicloidal",
      desc: "Construyó el primer reloj de péndulo funcional, reduciendo el desvío cronométrico de 15 minutos a segundos diarios, y demostró que la trayectoria cicloidal logra el isocronismo perfecto sin importar la amplitud.",
      icon: "clock"
    },
    {
      year: "1678",
      scientist: "Robert Hooke",
      title: "Publicación de la Ley de Elasticidad Lineal",
      desc: "Formuló 'Ut tensio, sic vis' en su obra 'De Potentia Restitutiva': la fuerza elástica restauradora es directamente proporcional y opuesta a la elongación (F = -kx), piedra angular del M.A.S.",
      icon: "maximize-2"
    },
    {
      year: "1687",
      scientist: "Sir Isaac Newton",
      title: "Principia Mathematica y Dinámica Universal",
      desc: "Estableció la Segunda Ley del Movimiento (F = ma = m d²x/dt²), permitiendo sintetizar la ley elástica en la célebre ecuación diferencial canónica m(d²x/dt²) + kx = 0.",
      icon: "sparkles"
    },
    {
      year: "1740",
      scientist: "Leonhard Euler",
      title: "Resolución Analítica y Fasores Complejos",
      desc: "Introdujo el método de los polinomios característicos y la fórmula exponencial e^{iθ} = cos(θ) + i·sin(θ), generalizando la solución matemática del oscilador libre y forzado.",
      icon: "cpu"
    },
    {
      year: "1807",
      scientist: "Jean-Baptiste Fourier",
      title: "Análisis y Descomposición Espectral",
      desc: "Demostró que cualquier función u oscilación periódica arbitraria puede representarse como una sumatoria infinita de ondas sinusoidales armónicas simples (Series de Fourier).",
      icon: "activity"
    },
    {
      year: "1925",
      scientist: "Física Cuántica Moderna",
      title: "El Oscilador Armónico Cuántico",
      desc: "Schrödinger y Heisenberg resolvieron el oscilador armónico cuántico, descubriendo que la energía de vibración molecular no es continua sino cuantizada en niveles E_n = (n + 1/2)ℏω.",
      icon: "atom"
    }
  ];

  let html = `
    <div style="display: flex; flex-direction: column; gap: 14px; position: relative; padding-left: 24px; border-left: 3px solid #c4b5fd;">
  `;

  events.forEach((ev, idx) => {
    html += `
      <div style="position: relative; background: rgba(255, 255, 255, 0.9); border: 1.5px solid #ddd6fe; border-radius: 12px; padding: 14px 16px; box-shadow: 0 3px 10px rgba(124, 58, 237, 0.05); transition: transform 0.2s;" onmouseenter="this.style.transform='translateX(6px)'" onmouseleave="this.style.transform='translateX(0)'">
        <!-- Nodo en la línea -->
        <div style="position: absolute; left: -34px; top: 18px; width: 18px; height: 18px; border-radius: 50%; background: #7c3aed; border: 3px solid #ffffff; box-shadow: 0 0 0 2px #c4b5fd;"></div>
        
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <span style="background: #ede9fe; color: #5b21b6; font-weight: 800; font-size: 0.8rem; padding: 2px 10px; border-radius: 999px; font-family: var(--font-mono);">${ev.year}</span>
          <span style="font-size: 0.82rem; font-weight: 700; color: #ec4899;">${ev.scientist}</span>
        </div>
        <div style="font-size: 0.98rem; font-weight: 700; color: #2e1065; margin-bottom: 4px;">${ev.title}</div>
        <div style="font-size: 0.86rem; color: #4b396b; line-height: 1.55;">${ev.desc}</div>
      </div>
    `;
  });

  html += `</div>`;
  container.innerHTML = html;
};

window.renderMindMap = function(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const nodes = [
    {
      category: "1. Cinemática Armónica",
      color: "#7c3aed",
      items: [
        "Elongación: x(t) = A cos(ωt + φ)",
        "Velocidad: v(t) = -Aω sin(ωt + φ) [Adelanto π/2 rad]",
        "Aceleración: a(t) = -ω²x(t) [Oposición de fase π rad]",
        "Valores Extremos: v_max = Aω, a_max = Aω²",
        "Relación espacial: v(x) = ±ω√(A² - x²)"
      ]
    },
    {
      category: "2. Dinámica y Fuerzas",
      color: "#2563eb",
      items: [
        "Ley de Hooke: F = -kx (Fuerza Restauradora)",
        "Segunda Ley de Newton: ΣF = m(d²x/dt²)",
        "Ecuación Diferencial Canónica: d²x/dt² + (k/m)x = 0",
        "Frecuencia Angular Natural: ω_0 = √(k/m)",
        "Período Masa-Resorte: T = 2π√(m/k)"
      ]
    },
    {
      category: "3. Conservación de Energía",
      color: "#10b981",
      items: [
        "Energía Cinética: K = ½ m v²",
        "Energía Potencial Elástica: U = ½ k x²",
        "Energía Mecánica Invariable: E = K + U = ½ k A² = ½ m v_max²",
        "Equipartición: En x = ±A/√2, K = U = E/2"
      ]
    },
    {
      category: "4. Aplicación en Ingeniería Industrial",
      color: "#ea580c",
      items: [
        "Aislamiento de Maquinaria Rotativa (Prensas, Tornos)",
        "Criterio ISO 10816 de Severidad y Salud de Activos",
        "Prevención de Resonancia Estructural Destructiva",
        "Control Estadístico de Calidad en Resortes y Amortiguadores",
        "Sensores Acelerómetros Piezorresistivos y Mantenimiento Predictivo"
      ]
    }
  ];

  let html = `
    <div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">
      <!-- Nodo Central -->
      <div style="background: linear-gradient(135deg, #7c3aed, #4c1d95); color: white; padding: 14px 28px; border-radius: 999px; text-align: center; box-shadow: 0 8px 24px rgba(124, 58, 237, 0.35); border: 2px solid #ddd6fe; max-width: 480px;">
        <div style="font-size: 0.76rem; text-transform: uppercase; letter-spacing: 0.1em; color: #e9d5ff;">Eje Teórico Central</div>
        <div style="font-size: 1.15rem; font-weight: 800;">MOVIMIENTO ARMÓNICO SIMPLE (M.A.S.)</div>
      </div>

      <!-- Cuadrícula de Ramas Conceptuales -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; width: 100%;">
  `;

  nodes.forEach(n => {
    html += `
      <div style="background: white; border: 1.5px solid ${n.color}; border-radius: 12px; padding: 14px; box-shadow: 0 4px 12px rgba(0,0,0,0.04);">
        <div style="color: ${n.color}; font-weight: 800; font-size: 0.92rem; margin-bottom: 8px; border-bottom: 1.5px dashed #ede9fe; padding-bottom: 4px;">
          ${n.category}
        </div>
        <ul style="padding-left: 16px; margin: 0; font-size: 0.82rem; color: #372554; line-height: 1.6;">
          ${n.items.map(it => `<li>${it}</li>`).join('')}
        </ul>
      </div>
    `;
  });

  html += `
      </div>
    </div>
  `;

  container.innerHTML = html;
};
