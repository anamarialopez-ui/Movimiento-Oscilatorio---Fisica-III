/**
 * CUADERNO VIRTUAL INTERACTIVO - FÍSICA III
 * PUNTO DE ENTRADA PRINCIPAL (APP BOOTSTRAPPER)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Inicializar Gestor Principal del Cuaderno
  window.notebookApp = new window.NotebookManager();

  // Registrar Service Worker para PWA (Offline)
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then(reg => console.log('PWA Service Worker registrado con éxito:', reg.scope))
        .catch(err => console.warn('Error al registrar Service Worker:', err));
    });
  }

  // Botón de Pantalla Completa
  const btnFullscreen = document.getElementById('btn-toggle-fullscreen');
  if (btnFullscreen) {
    btnFullscreen.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
          console.warn('Error al entrar a pantalla completa:', err);
        });
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    });
  }

  // Botón de Tamaño de Letra (Lectura Cómoda de Texto)
  const btnFontSize = document.getElementById('btn-font-size');
  let isLargeText = false;
  if (btnFontSize) {
    btnFontSize.addEventListener('click', () => {
      isLargeText = !isLargeText;
      document.body.classList.toggle('large-text-mode', isLargeText);
      btnFontSize.classList.toggle('active', isLargeText);
    });
  }

  // Botón de Sonido (Pase de Página)
  const btnSound = document.getElementById('btn-toggle-sound');
  if (btnSound) {
    btnSound.addEventListener('click', () => {
      window.notebookApp.audioEnabled = !window.notebookApp.audioEnabled;
      const icon = btnSound.querySelector('i');
      if (icon) {
        icon.setAttribute('data-lucide', window.notebookApp.audioEnabled ? 'volume-2' : 'volume-x');
        if (window.lucide) window.lucide.createIcons({ root: btnSound });
      }
      btnSound.title = window.notebookApp.audioEnabled ? 'Efecto de sonido de página activado' : 'Efecto de sonido silenciado';
    });
  }

  // Inicializar iconos de Lucide
  if (window.lucide) {
    window.lucide.createIcons();
  }
});
