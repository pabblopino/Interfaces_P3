import { activarCarrusel } from './carousel.mjs';

document.addEventListener('DOMContentLoaded', () => {

    // -----------------------------------------
    // CAMBIO DE MONEDA
    // -----------------------------------------
    const selectorMoneda = document.querySelector('.selector-moneda select');
    const tarjetasPrecios = document.querySelectorAll('.card');
    const tasasCambio = {
        'EUR': { factor: 1, simbolo: '€' },
        'DOL': { factor: 1.17, simbolo: '$' },
        'LIB': { factor: 0.87, simbolo: '£' }
    };

    const actualizarPreciosVisuales = () => {
        const monedaSeleccionada = selectorMoneda ? selectorMoneda.value : 'EUR';
        const { factor, simbolo } = tasasCambio[monedaSeleccionada] || tasasCambio['EUR'];

        tarjetasPrecios.forEach(card => {
            if (card.dataset.precio) {
                const precioBase = parseFloat(card.dataset.precio);
                const precioConvertido = Math.round(precioBase * factor);
                const etiquetaPrecio = card.querySelector('.precio');
                if (etiquetaPrecio) {
                    etiquetaPrecio.textContent = `${precioConvertido}${simbolo}`;
                }
            }
        });
    };

    if (selectorMoneda) {
        selectorMoneda.addEventListener('change', actualizarPreciosVisuales);
    }

    actualizarPreciosVisuales();


    // -----------------------------------------
    // DETECTAR INGLÉS PARA RUTAS
    // -----------------------------------------
    const isEnglish = window.location.pathname.includes('/ingles/');


    // -----------------------------------------
    // RESEÑAS FIJAS
    // -----------------------------------------
    const resenas_fijas = [
        { 
            nombre: "Juan Pérez", 
            descripcion: "El mejor servicio! Todo estuvo perfectamente organizado, los guías fueron amables y el alojamiento espectacular.",
            estrellas: 5,
            foto: isEnglish ? '../images/foto_perfil.png' : 'images/foto_perfil.png'
        },
        { 
            nombre: "Laura Gómez", 
            descripcion: "Todo perfecto! La atención al cliente fue excelente y los lugares visitados superaron mis expectativas.",
            estrellas: 4,
            foto: isEnglish ? '../images/foto_perfil.png' : 'images/foto_perfil.png'
        },
        { 
            nombre: "Pedro Martínez", 
            descripcion: "Increíble viaje. La planificación fue impecable, los destinos maravillosos y la experiencia general fantástica.",
            estrellas: 5,
            foto: isEnglish ? '../images/foto_perfil.png' : 'images/foto_perfil.png'
        },
        { 
            nombre: "Ana López", 
            descripcion: "Una experiencia única. Repetiré seguro el año que viene con vosotros. Muy recomendado para familias.",
            estrellas: 5,
            foto: isEnglish ? '../images/foto_perfil.png' : 'images/foto_perfil.png'
        }
    ];


    // -----------------------------------------
    // RESEÑAS DE USUARIO (FORO)
    // -----------------------------------------
    let resenas_usuarios = JSON.parse(localStorage.getItem('reseñas')) || [];

    // Ajustamos rutas también en reseñas del foro
    resenas_usuarios = resenas_usuarios.map(r => ({
        ...r,
        foto: r.foto || (isEnglish ? '../images/foto_perfil.png' : 'images/foto_perfil.png')
    }));


    // -----------------------------------------
    // LISTA TOTAL
    // -----------------------------------------
    const total_resenas = resenas_fijas.concat(resenas_usuarios);

    // Pintar y activar carrusel
    pintarOpiniones(total_resenas, 'contenedor-opiniones');
    activarCarrusel('contenedor-opiniones');
});




// -----------------------------------------
// FUNCIÓN pintarOpiniones()
// -----------------------------------------
function pintarOpiniones(lista_resenas, id_contenedor) {

    const contenedor = document.getElementById(id_contenedor);
    if (!contenedor) return;

    contenedor.innerHTML = '';

    const isEnglish = window.location.pathname.includes('/ingles/');

    // Botón Izquierda
    const btnPrev = document.createElement('button');
    btnPrev.className = 'flecha prev';
    btnPrev.innerText = '⟨';

    // Ventana y Track
    const ventana = document.createElement('div');
    ventana.className = 'ventana-carrusel';

    const track = document.createElement('div');
    track.className = 'track-carrusel';

    // Crear tarjetas
    lista_resenas.forEach(r => {

        const estrellasHTML = "★".repeat(r.estrellas) + "☆".repeat(5 - r.estrellas);

        const rutaImg = r.foto || (isEnglish ? '../images/foto_perfil.png' : 'images/foto_perfil.png');

        const card = document.createElement('div');
        card.className = 'card card-opinion';

        card.innerHTML = `
            <img src="${rutaImg}" alt="${r.nombre}">
            <div class="estrellas">${estrellasHTML}</div>
            <p>"${r.descripcion}"</p>
            <span>- ${r.nombre}</span>
        `;

        track.appendChild(card);
    });

    ventana.appendChild(track);

    // Botón Derecha
    const btnNext = document.createElement('button');
    btnNext.className = 'flecha next';
    btnNext.innerText = '⟩';

    // Insertar todo
    contenedor.appendChild(btnPrev);
    contenedor.appendChild(ventana);
    contenedor.appendChild(btnNext);
}
