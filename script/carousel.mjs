export function activarCarrusel(idContenedor) {
    const contenedor = document.getElementById(idContenedor);
    if (!contenedor) return;

    const track = contenedor.querySelector('.track-carrusel');
    const btnPrev = contenedor.querySelector('.prev');
    const btnNext = contenedor.querySelector('.next');
    
    // Si no existen elementos, salimos para evitar errores
    if (!track || !btnPrev || !btnNext) return;

    let index = 0;

    // Función para obtener el tamaño real que ocupa una tarjeta (Ancho + Márgenes)
    const getCardSize = () => {
        const card = track.querySelector('.card');
        if (!card) return 0;
        
        const style = window.getComputedStyle(card);
        const margin = (parseFloat(style.marginLeft) || 0) + (parseFloat(style.marginRight) || 0);
        return card.offsetWidth + margin;
    };

    // Función que decide si mostrar u ocultar flechas
    const comprobarFlechas = () => {
        const paso = getCardSize();
        if (paso === 0) return;

        const containerWidth = track.parentElement.offsetWidth; // Ancho de la ventana visible
        const totalContentWidth = track.scrollWidth; // Ancho total de todas las tarjetas

        // SI TODO EL CONTENIDO CABE EN LA VENTANA (con un margen de error de 5px)
        if (totalContentWidth <= containerWidth + 5) {
            btnPrev.style.display = 'none';
            btnNext.style.display = 'none';
            track.style.transform = 'translateX(0px)';
            index = 0;
        } else {
            // SI NO CABE, MOSTRAMOS FLECHAS
            btnPrev.style.display = 'flex';
            btnNext.style.display = 'flex';
        }
    };

    const moverCarrusel = () => {
        const paso = getCardSize();
        if (paso === 0) return;

        const containerWidth = track.parentElement.offsetWidth;
        const totalCards = track.querySelectorAll('.card').length;
        
        // Calculamos cuántas tarjetas caben enteras en la pantalla
        const visibleItems = Math.floor(containerWidth / paso);
        // Mínimo 1 para evitar divisiones raras en móvil
        const safeVisible = visibleItems < 1 ? 1 : visibleItems;

        // El índice máximo es: Total Tarjetas - Las que ya veo
        const maxIndex = Math.max(0, totalCards - safeVisible);

        // Límites de seguridad
        if (index < 0) index = 0;
        if (index > maxIndex) index = maxIndex;

        track.style.transform = `translateX(-${index * paso}px)`;
    };

    // --- EVENTOS ---

    btnNext.addEventListener('click', () => {
        const paso = getCardSize();
        if (paso === 0) return;

        const containerWidth = track.parentElement.offsetWidth;
        const totalCards = track.querySelectorAll('.card').length;
        const visibleItems = Math.floor(containerWidth / paso);
        const safeVisible = visibleItems < 1 ? 1 : visibleItems;
        
        const maxIndex = Math.max(0, totalCards - safeVisible);

        // Solo avanzamos si no hemos llegado al final
        if (index < maxIndex) {
            index++;
            moverCarrusel();
        }
    });

    btnPrev.addEventListener('click', () => {
        if (index > 0) {
            index--;
            moverCarrusel();
        }
    });

    // --- RESPONSIVE ---
    // Al redimensionar la pantalla, reseteamos y comprobamos si hacen falta flechas
    window.addEventListener('resize', () => {
        index = 0;
        track.style.transform = 'translateX(0px)';
        comprobarFlechas();
    });

    // Ejecutar al inicio (con pequeño retraso para asegurar carga de CSS)
    setTimeout(comprobarFlechas, 100);
}