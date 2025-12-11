import { activarCarrusel } from './carousel.mjs'
import { toggleFavorito } from './gestion-viajes.js';

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
    const resenasFijas = [
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
    let resenasUsuarios = JSON.parse(localStorage.getItem('reseñas')) || [];

    // Ajustamos rutas también en reseñas del foro
    resenasUsuarios = resenasUsuarios.map(r => ({
        ...r,
        foto: r.foto || (isEnglish ? '../images/foto_perfil.png' : 'images/foto_perfil.png')
    }));


    // -----------------------------------------
    // LISTA TOTAL
    // -----------------------------------------
    const totalResenas = resenasFijas.concat(resenasUsuarios);

    // Pintar y activar carrusel
    pintarOpiniones(totalResenas, 'contenedor-opiniones');
    activarCarrusel('contenedor-opiniones');

    // ---------------------------------------------
    // 2. LÓGICA DEL BOTÓN DE FAVORITOS (CORAZONES)
    // ---------------------------------------------
    const botonesLike = document.querySelectorAll('.btn-like');

    // Obtenemos el usuario activo
    const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));

    // Traemos la base de datos de viajes
    let historial = JSON.parse(localStorage.getItem('historialViajes')) || [];


    // A) PINTAR CORAZONES ROJOS AL CARGAR LA PÁGINA
    // Si el usuario está logueado, revisamos qué viajes son favoritos y los pintamos
    if (usuarioActivo) {
        const datosUsuario = historial.find(u => u.login === usuarioActivo.login);
        if (datosUsuario) {
            botonesLike.forEach(btn => {
                // Buscamos el título de la tarjeta actual
                const card = btn.closest('.card');
                const tituloCard = card.querySelector('h3').textContent.trim();
                
                // Miramos si ese título está en su lista de favoritos
                const esFavorito = datosUsuario.viajes.favoritos.some(v => v.titulo === tituloCard);
                
                if (esFavorito) {
                    btn.classList.add('favorito-activo'); // Lo marcamos como favorito (en rojo)
                }
            });
        }
    }

    botonesLike.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // 1. Si no hay usuario logeado, avisamos y paramos
            const botonClicado = e.target.closest('.btn-like');
            const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo')); // Leemos usuario

            if (!usuarioActivo){
                // Detectamos idioma para el mensaje
                const isEn = window.location.pathname.includes('/ingles/');
                alert(isEn ? "You must log in to save favorites." : "Debes iniciar sesión para guardar favoritos.");
                return;
            }
            
            // 2. Captura de datos (Leemos la tarjeta donde se hizo clic)
            const tarjeta = botonClicado.closest('.card');

            // Sacamos la info visualmente del HTML
            const titulo = tarjeta.querySelector('h3').textContent.trim();
            const precio = tarjeta.querySelector('.precio').textContent.replace('€', '').replace('Desde ', '').trim();
            const imagenSrc = tarjeta.querySelector('img').getAttribute('src');
            // Buscamos el enlace <a> y cogemos lo que hay después del "="
            const enlace = tarjeta.querySelector('a').getAttribute('href'); // "reserva.html?id_pack=camping"
            const idPack = enlace.split('=')[1];

            // Creamos el objeto limpio
            const nuevoFavorito = {
                id: idPack,
                titulo: titulo,
                precio: precio,
                imagen: imagenSrc
            };

            const ahoraEsFavorito = toggleFavorito(usuarioActivo, nuevoFavorito)

            // Actualizamos visualmente el viaje
            if (ahoraEsFavorito) {
                botonClicado.classList.add('favorito-activo');
            } else {
                botonClicado.classList.remove('favorito-activo');
            }
        });
    });



});

function pintarOpiniones(listaResenas, idContenedor){
    const contenedor = document.getElementById(idContenedor);
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
    listaResenas.forEach(r => {

        const rutaImg = r.foto || (isEnglish ? '../images/foto_perfil.png' : 'images/foto_perfil.png');

        const card = document.createElement('div');
        card.className = 'card card-opinion';

        card.innerHTML = `
            <img src="${rutaImg}" alt="${r.nombre}">
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
