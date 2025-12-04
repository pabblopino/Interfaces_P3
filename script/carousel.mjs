// script/carousel.mjs

export function activarCarrusel(idContenedor) {    
    const contenedor = document.getElementById(idContenedor);
    if (!contenedor) return;

    const track = contenedor.querySelector('.track-carrusel');
    const nextBtn = contenedor.querySelector('.next');
    const prevBtn = contenedor.querySelector('.prev');

    if (!track) return;

    const totalItems = track.children.length;
    let index = 0; 
    const itemsPorVista = 3;  
    const itemWidth = 100 / itemsPorVista; 

    function moverCarrusel() {
        if (index < 0) {
            index = 0;
        } else if (index > totalItems - itemsPorVista) {
            index = totalItems - itemsPorVista;
        }
        
        // Si hay menos items que huecos, siempre al principio
        if (totalItems < itemsPorVista){
            index = 0;
        }
        
        const offset = -(index * itemWidth);
        track.style.transform = `translateX(${offset}%)`; 
    };

    nextBtn?.addEventListener('click', () => {
        if (index < totalItems - itemsPorVista) {
            index++;
            moverCarrusel();
        }
    });

    prevBtn?.addEventListener('click', () => {
        if (index > 0) {
            index--;
            moverCarrusel();
        }
    });
}