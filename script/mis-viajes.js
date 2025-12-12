import { activarCarrusel } from './carousel.mjs';
import { toggleFavorito, moverViajeRealizado } from './gestion-viajes.js';

document.addEventListener('DOMContentLoaded', () => {

    // 1. Obtenemos el usuario que ha iniciado sesión
    const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'))

    if (!usuarioActivo) {
        console.log("No hay sesión iniciada");
        return;
    }
    // 2. Cargamos los datos de los viajes
    const historial = JSON.parse(localStorage.getItem('historialViajes')) || [];
    // 3. Buscamos los datos que coincidan con el login del usuario activo
    // Usamos .login porque es lo que se guarda en usuario.mjs
    const datosUsuario = historial.find(u => u.login === usuarioActivo.login);

    if (datosUsuario) {
        // 4. Si encontramos datos para el usuario, los mostramos en la página
        pintarSeccion(datosUsuario.viajes.favoritos, 'contenedor-favoritos');
        activarCarrusel('contenedor-favoritos');

        pintarSeccion(datosUsuario.viajes.realizados, 'contenedor-realizados');
        activarCarrusel('contenedor-realizados');

        pintarSeccion(datosUsuario.viajes.reservados, 'contenedor-reservados');
        activarCarrusel('contenedor-reservados');
    } else {
        // Si el usuario es nuevo y aún no tiene historial guardado
        console.log("Usuario sin historial de viajes.");
        pintarSeccion([], 'contenedor-favoritos');
        pintarSeccion([], 'contenedor-realizados');
        pintarSeccion([], 'contenedor-reservados');
    }
});

function pintarSeccion(listaViajes, idContenedor) {
    const contenedor = document.getElementById(idContenedor);
    if (!contenedor) return;

    // Detectamos el idioma
    const isEn = window.location.pathname.includes('/ingles/');

    // Limpiamos el contenido previo
    contenedor.innerHTML = '';

    // Si la lista está vacía
    if (!listaViajes || listaViajes.length === 0) {
        let mensaje = isEn ? 'No trips here.' : 'No tienes viajes aquí.';
        
        if(idContenedor === 'contenedor-favoritos') 
            mensaje = isEn ? 'No favorites saved.' : 'No tienes favoritos guardados.';
        
        if(idContenedor === 'contenedor-reservados') 
            mensaje = isEn ? 'No booked trips.' : 'No tienes reservas activas.';
        
        contenedor.innerHTML = `<p>${mensaje}</p>`;
        return;
    }

    // Cargamos todos los viajes favoritos del usuario activo
    const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
    let listaMisFavoritos = [];

    if (usuarioActivo) {
        const historial = JSON.parse(localStorage.getItem('historialViajes')) || [];
        const datosUsuario = historial.find(u => u.login === usuarioActivo.login);
        if(datosUsuario && datosUsuario.viajes.favoritos){
            listaMisFavoritos = datosUsuario.viajes.favoritos;
        }
    }

    // Generamos las tarjetas para cada viaje

    // Botón Izquierda
    const btnPrev = document.createElement('button');
    btnPrev.className = 'flecha prev';
    btnPrev.innerText = '⟨';
    btnPrev.setAttribute('aria-label', isEn ? 'Previous' : 'Anterior');

    // Botón Derecha
    const btnNext = document.createElement('button');
    btnNext.className = 'flecha next';
    btnNext.innerText = '⟩';
    btnNext.setAttribute('aria-label', isEn ? 'Next' : 'Siguiente');

    // Ventana y Track
    const ventana = document.createElement('div');
    ventana.className = 'ventana-carrusel';

    const track = document.createElement('div');
    track.className = 'track-carrusel';

    // ---------------------------------------------------------
    // DICCIONARIO DE TRADUCCIÓN (ID -> Nombre en Inglés)
    // ---------------------------------------------------------
    const nombresIngles = {
        'camping': 'Sunset Alpine Camping',
        'desierto': 'Sahara Desert Adventure',
        'islandia': 'Iceland Aurora Hunt',
        'patagonia': 'Patagonia Expedition',
        'pirineos': 'Pyrenees Snow Escape',
        'santiago': 'The Way of St. James'
    };

    // Generamos las tarjetas (Items)
    listaViajes.forEach(viaje => {
        // Envolvemos la card en un div 'card' que es el que mide 33.33%
        const card = document.createElement('div');
        card.className = 'card';

        // 1. Lógica de los corazones de favoritos
        let claseFavorito = '';

        const esRealmenteFavorito = listaMisFavoritos.some(fav => fav.id === viaje.id);

        if (esRealmenteFavorito) {
             claseFavorito = 'favorito-activo';
        }

        // 2. ADAPTACIÓN AL IDIOMA
        // A) IMAGEN: Si estamos en inglés, la imagen necesita "../"
        let rutaImagen = viaje.imagen;
        if (isEn && !rutaImagen.startsWith('../') && !rutaImagen.startsWith('http')) {
            rutaImagen = '../' + rutaImagen;
        }

        // B) TEXTOS FIJOS
        const textoDesde = isEn ? 'From' : 'Desde';
        const textoVer = isEn ? 'View' : 'Ver';
        
        // C) TÍTULO DEL VIAJE (TRADUCCIÓN)
        let tituloMostrar = viaje.titulo;
        
        // Si estamos en inglés Y tenemos traducción para ese ID, la usamos
        if (isEn && viaje.id && nombresIngles[viaje.id]) {
            tituloMostrar = nombresIngles[viaje.id];
        }

        // D) ENLACE
        // El enlace debe ir a la versión inglesa o española según corresponda
        const paginaDetalle = isEn ? 'detalles-destino-en.html' : 'detalles-destino.html';

        // LÓGICA DEL BOTÓN DE COMPLETAR
        // Solo lo mostramos si estamos en la sección de RESERVADOS
        let botonCompletarHTML = '';
        if (idContenedor === 'contenedor-reservados') {
            const titleCompletar = isEn ? "Mark as completed" : "Marcar como realizado";
            // Usamos un SVG de Check
            botonCompletarHTML = `
                <button class="btn-completar" title="${titleCompletar}" aria-label="${titleCompletar}">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </button>
            `;
        }

        card.innerHTML = `
            <a href="${paginaDetalle}?id_pack=${viaje.id}" style="text-decoration:none; color:inherit;">
                <img src="${rutaImagen}" alt="${tituloMostrar}">
                <h3>${tituloMostrar}</h3>
            </a>
            <p class="precio">${textoDesde} ${viaje.precio}€</p>
            <div class="acciones">
                <button class="btn-like ${claseFavorito}" aria-label="${isEn ? 'Add to favorites' : 'Añadir a favoritos'}">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                </button>
                ${botonCompletarHTML}

                <a href="${paginaDetalle}?id_pack=${viaje.id}" tabindex="-1" aria-hidden="true">
                    <button class="btn-reservar">${textoVer}</button>
                </a>
            </div>
        `;

        // LÓGICA DEL CLICK LIKE 
        const btnLike = card.querySelector('.btn-like');

        btnLike.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Obtenemos el usuario aquí dentro para asegurar que está actualizado
            const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));

            if(usuarioActivo) {
                // Llamamos a la función que nos dice si es o no favorito
                const ahoraEsFavorito = toggleFavorito(usuarioActivo, viaje);

                // Solo actualizamos la clase visual según lo que nos responda la función
                if (ahoraEsFavorito) {
                    btnLike.classList.add('favorito-activo');
                } else {
                    btnLike.classList.remove('favorito-activo');
                }
            }
        });

        // LÓGICA DEL CLICK COMPLETAR
        const btnCompletar = card.querySelector('.btn-completar');
        if (btnCompletar) {
            btnCompletar.addEventListener('click', (e) => {
                e.stopPropagation();

                const msg = isEn ? "Mark trip as completed?" : "¿Marcar este viaje como realizado?";
                if(confirm(msg)) {
                    const usuarioAlClick = JSON.parse(localStorage.getItem('usuarioActivo'));
                    const exito = moverViajeRealizado(usuarioAlClick, viaje);
                    
                    if(exito) {
                        // Recargamos la página para ver el cambio instantáneo
                        window.location.reload();
                    }
                }
            });
        }
        track.appendChild(card);
    });

    // Metemos el track en la ventana
    ventana.appendChild(track);

    // --- LÓGICA INTELIGENTE: ¿NECESITAMOS CARRUSEL? ---
    if (listaViajes.length <= 3) {
        contenedor.classList.add('contenedor-centrado');
        contenedor.appendChild(ventana);
    } else {
        contenedor.classList.remove('contenedor-centrado');
        contenedor.appendChild(btnPrev);
        contenedor.appendChild(ventana);
        contenedor.appendChild(btnNext);
    }
}