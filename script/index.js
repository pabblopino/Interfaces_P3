import { activarCarrusel } from './carousel.mjs'

document.addEventListener('DOMContentLoaded', () =>{

    // 1. Definimos las 4 reseñas estáticas (Siempre aparecerán)
    const resenas_fijas = [
        { 
            nombre: "Juan Pérez", 
            descripcion: "El mejor servicio! Todo estuvo perfectamente organizado, los guías fueron amables y el alojamiento espectacular.", 
            estrellas: 5, 
            foto: "images/foto_perfil.png" 
        },
        { 
            nombre: "Laura Gómez", 
            descripcion: "Todo perfecto! La atención al cliente fue excelente y los lugares visitados superaron mis expectativas.", 
            estrellas: 4, 
            foto: "images/foto_perfil.png" 
        },
        { 
            nombre: "Pedro Martínez", 
            descripcion: "Increíble viaje. La planificación fue impecable, los destinos maravillosos y la experiencia general fantástica.", 
            estrellas: 5, 
            foto: "images/foto_perfil.png" 
        },
        { 
            nombre: "Ana López", 
            descripcion: "Una experiencia única. Repetiré seguro el año que viene con vosotros. Muy recomendado para familias.", 
            estrellas: 5, 
            foto: "images/foto_perfil.png" 
        }
    ];

    // 2. Obtenemos reseñas del LocalStorage (del Foro)
    let resenas_usuarios = JSON.parse(localStorage.getItem('reseñas')) || [];

    // 3. Juntamos todas las reseñas (Las fijas primero + las nuevas después)
    const total_resenas = resenas_fijas.concat(resenas_usuarios)

    // 4. Pintamos y activamos el carrusel
    pintarOpiniones(total_resenas, 'contenedor-opiniones');
    activarCarrusel('contenedor-opiniones');
});

function pintarOpiniones(lista_resenas, id_contenedor){
    const contenedor = document.getElementById(id_contenedor);
    if (!contenedor) return;

    contenedor.innerHTML = '';

    // Botón Izquierda
    const btnPrev = document.createElement('button');
    btnPrev.className = 'flecha prev';
    btnPrev.innerText = '⟨';

    // Ventana y Track
    const ventana = document.createElement('div');
    ventana.className = 'ventana-carrusel';

    const track = document.createElement('div');
    track.className = 'track-carrusel';

    // Generamos las tarjetas (Items)
    lista_resenas.forEach(r => {
        // Generar estrellas
        const estrellasHTML = "★".repeat(r.estrellas) + "☆".repeat(5 - r.estrellas);
        let rutaImg = r.foto || 'images/foto_perfil.png';

        // Envolvemos la card en un div 'card' que es el que mide 33.33%
        const card = document.createElement('div');
        // Además de card, añadimos la clase opinion
        card.className = 'card card-opinion';
        
        card.innerHTML = `
            <img src="${rutaImg}" alt="${r.nombre}">
            <div class="estrellas">${estrellasHTML}</div>
            <p>"${r.descripcion}"</p>
            <span>- ${r.nombre}</span>
        `;

        track.appendChild(card);
    });

    // Metemos el track en la ventana
    ventana.appendChild(track);
    
    // Botón Derecha
    const btnNext = document.createElement('button');
    btnNext.className = 'flecha next';
    btnNext.innerText = '⟩';

    // Inyectamos todo
    contenedor.appendChild(btnPrev);
    contenedor.appendChild(ventana);
    contenedor.appendChild(btnNext);

}