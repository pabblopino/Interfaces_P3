// 1. Variables globales
const contenedor = document.getElementById('contenedor-grid-rincones');
const botones = document.querySelectorAll('.filtro-btn');
let datos_globales = [];

// 2. Cargamos el JSON adecuado según el idioma
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Detectar si estamos en la carpeta /ingles/
        const isEn = window.location.pathname.includes('/ingles/');
        
        // Elegir la ruta del archivo JSON
        const rutaJson = isEn 
            ? '../recursos_adicionales/ciudades-del-mundo_en.json' 
            : 'recursos_adicionales/ciudades-del-mundo.json';

        const respuesta = await fetch(rutaJson);
        const datos = await respuesta.json();
        datos_globales = datos.continents;

        // Mostrar el continente por defecto (Europa o Europe)
        // El nombre debe coincidir con el del JSON
        const defaultContinent = isEn ? 'Europe' : 'Europa';
        mostrarContinente(defaultContinent);
    }
    catch(error){
        console.error("Error cargando el archivo JSON:", error);
        const isEn = window.location.pathname.includes('/ingles/');
        contenedor.innerHTML = isEn 
            ? '<p>Error loading destinations</p>' 
            : '<p>Error al cargar los destinos</p>';
    }
});

// 3. Evento para los botones (Filtros)
botones.forEach(boton => {
    boton.addEventListener('click', (e) => {
        botones.forEach(b => b.classList.remove('activo'));
        e.target.classList.add('activo');

        // El texto del botón (HTML) debe coincidir con el 'name' en el JSON
        const continente_elegido = e.target.innerText;
        mostrarContinente(continente_elegido);
    });
});

// 4. Función que escribe los rincones en el HTML
function mostrarContinente(nombre_continente) {
    contenedor.innerHTML = '';

    const continente_data = datos_globales.find(c => c.name === nombre_continente);

    if (continente_data){
        continente_data.countries.forEach(pais =>{
            pais.cities.forEach(ciudad => {
                const tarjetaHTML = `
                    <div class="card-rincon">
                        <img src="${ciudad.image.url}" alt="${ciudad.image.alt}">
                        <div class="info-rincon">
                            <h3><strong>${ciudad.name},</strong> ${pais.name}</h3>
                            <p>${ciudad.description}</p>
                        </div>
                    </div>
                `;
                contenedor.innerHTML += tarjetaHTML;
            });
        });
    } else {
        const isEn = window.location.pathname.includes('/ingles/');
        contenedor.innerHTML = isEn 
            ? '<p>No data found for this continent.</p>' 
            : '<p>No se encontraron datos para este continente.</p>';
    }
}