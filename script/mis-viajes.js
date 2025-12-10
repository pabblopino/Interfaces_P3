
import { activarCarrusel } from './carousel.mjs';

document.addEventListener('DOMContentLoaded', async () => {

    // 1. Obtenemos el usuario que ha iniciado sesión
    const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'))

    if (!usuarioActivo) {
        console.log("No hay sesión iniciada");
        return;
    }

    try{
        // 2. Cargamos los datos de los viajes
        const respuesta = await fetch('recursos_adicionales/datos-viajes.json');
        const usuariosData = await respuesta.json();

        // 3. Buscamos los datos que coincidan con el login del usuario activo
        // Usamos .login porque es lo que se guarda en usuario.mjs
        const datosUsuario = usuariosData.find(u => u.login === usuarioActivo.login);

        if (datosUsuario) {
            // 4. Si encontramos datos para el usuario, los mostramos en la página
            pintarSeccion(datosUsuario.viajes.favoritos, 'contenedor-favoritos');
            activarCarrusel('contenedor-favoritos');
            pintarSeccion(datosUsuario.viajes.realizados, 'contenedor-realizados');
            activarCarrusel('contenedor-realizados');
            pintarSeccion(datosUsuario.viajes.reservados, 'contenedor-reservados');
            activarCarrusel('contenedor-reservados');
        }
    } catch (error) {
        console.error("Error cargando los viajes:", error);
    }
});

function pintarSeccion(listaViajes, idContenedor) {
    const contenedor = document.getElementById(idContenedor);
    if (!contenedor) return;

    // Limpiamos el contenido previo
    contenedor.innerHTML = '';

    // Si la lista está vacía
    if (!listaViajes || listaViajes.length === 0) {
        contenedor.innerHTML = '<p>No tienes favoritos guardados.</p>';
        return;
    }

    // En otro caso, generamos las tarjetas para cada viaje

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
        
        card.innerHTML = `
            <img src="${viaje.imagen}" alt="${viaje.titulo}">
            <h3>${viaje.titulo}</h3>
            <p class="precio">Desde ${viaje.precio}€</p>
            <div class="acciones">
                <button class="btn-like" style="color: #ff4d4d;">❤</button>
                <button class="btn-reservar">Ver</button>
            </div>
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