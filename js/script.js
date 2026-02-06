document.addEventListener('DOMContentLoaded', () => {
    // --- 1. CONFIGURACIÓN INICIAL DE VARIABLES ---
    const textoMensaje = "Que hoy sea un día mágico, lleno de risas y mucho cariño. ¡Te amamos! ❤️";
    const contenedorTextoPrincipal = document.getElementById('maquina-escribir');
    const btnCelebrar = document.getElementById('btnCelebrar');
    const musica = document.getElementById('musicaFondo');
    const btnMusica = document.getElementById('btnMusica');
    const iconoMusica = document.getElementById('iconoMusica');
    let i = 0;

    // --- 2. EFECTO MÁQUINA DE ESCRIBIR ---
    function escribirMensaje() {
        if (i < textoMensaje.length) {
            contenedorTextoPrincipal.innerHTML += textoMensaje.charAt(i);
            i++;
            setTimeout(escribirMensaje, 50);
        }
    }
    escribirMensaje();

    // --- 3. EVENTO BOTÓN CELEBRAR (Confeti + Música) ---
    btnCelebrar.addEventListener('click', () => {
        // 1. Detectamos los colores del CSS actual
        // Sacamos el color del botón principal y del botón de música para el confeti
        const estiloBtn = window.getComputedStyle(btnCelebrar);
        const estiloMusica = window.getComputedStyle(btnMusica);
        
        const colorPrincipal = estiloBtn.backgroundColor;
        const colorSecundario = estiloMusica.backgroundColor;

        // 2. Tira confeti con los colores detectados
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.8 },
            // Usamos los colores dinámicos + blanco y dorado que quedan bien en ambos
            colors: [colorPrincipal, colorSecundario, '#ffffff', '#ffd700']
        });

        // 3. Inicia la música si no está sonando
        if (musica.paused) {
            musica.play();
            iconoMusica.innerText = '⏸️';
            // Usamos el color verde de éxito, pero podrías usar colorPrincipal si preferís
            btnMusica.style.background = '#4CAF50'; 
        }
    });

    // --- 4. CONTROL MANUAL DE LA MÚSICA (Botón flotante) ---
    btnMusica.addEventListener('click', () => {
        if (musica.paused) {
            musica.play();
            iconoMusica.innerText = '⏸️';
            btnMusica.style.background = '#4CAF50';
        } else {
            musica.pause();
            iconoMusica.innerText = '🎵';
            btnMusica.style.background = '#ff2e63';
        }
    });

    // --- 5. ANIMACIÓN DE REVELADO AL HACER SCROLL ---
    const elementosParaRevelar = document.querySelectorAll('.revelar-elemento');
    const opcionesObserver = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('visible');
                observer.unobserve(entrada.target); 
            }
        });
    }, opcionesObserver);

    elementosParaRevelar.forEach(elemento => {
        observer.observe(elemento);
    });
});
