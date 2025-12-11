import { activarCarrusel } from './carousel.mjs';
import { toggleFavorito } from './gestion-viajes.js';

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

    // Limpiamos el contenido previo
    contenedor.innerHTML = '';

    // Si la lista está vacía
    if (!listaViajes || listaViajes.length === 0) {
        contenedor.innerHTML = '<p>No tienes viajes guardados.</p>';
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

    // Ventana y Track
    const ventana = document.createElement('div');
    ventana.className = 'ventana-carrusel';

    const track = document.createElement('div');
    track.className = 'track-carrusel';

    // Generamos las tarjetas (Items)
    listaViajes.forEach(viaje => {
        // Envolvemos la card en un div 'card' que es el que mide 33.33%
        const card = document.createElement('div');
        card.className = 'card';

        // Lógica de los corazones de favoritos
        let claseFavorito = '';

        const esRealmenteFavorito = listaMisFavoritos.some(fav => fav.id === viaje.id);

        if (esRealmenteFavorito) {
             claseFavorito = 'favorito-activo';
        }

        card.innerHTML = `
            <img src="${viaje.imagen}" alt="${viaje.titulo}">
            <h3>${viaje.titulo}</h3>
            <p class="precio">Desde ${viaje.precio}€</p>
            <div class="acciones">
                <button class="btn-like ${claseFavorito}">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                </button>
                <button class="btn-reservar">Ver</button>
            </div>
        `;

        // LÓGICA DEL CLICK 
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

        track.appendChild(card);
    });

    // Metemos el track en la ventana
    ventana.appendChild(track);
    
    // --- LÓGICA INTELIGENTE: ¿NECESITAMOS CARRUSEL? ---
    // Si hay 3 o menos viajes, caben todos en pantalla, centramos y quitamos flechas
    if (listaViajes.length <= 3) {
        contenedor.classList.add('contenedor-centrado');
        contenedor.appendChild(ventana); // Solo añadimos la ventana, sin flechas
    } else {
        // Si hay más de 3, montamos el carrusel normal con flechas
        contenedor.classList.remove('contenedor-centrado');
    }

    // Botón Derecha
    const btnNext = document.createElement('button');
    btnNext.className = 'flecha next';
    btnNext.innerText = '⟩';

    // Inyectamos todo
    contenedor.appendChild(btnPrev);
    contenedor.appendChild(ventana);
    contenedor.appendChild(btnNext);
}