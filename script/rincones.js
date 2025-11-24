// 1. Variables globales
const contenedor = document.getElementById('contenedor-grid-rincones')
const botones = document.querySelectorAll('.filtro-btn')
let datos_globales = [] // Aquí se guarda el json al cargarse


// 2. Cargamos el JSON de los recursos adicionales al entrar en la página
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const respuesta = await fetch('/recursos_adicionales/ciudades-del-mundo.json');
        const datos = await respuesta.json();
        datos_globales = datos.continents;

        // Por defecto, mostramos el primer continente del buscador (Europa)
        mostrarContinente('Europa');
    }
    catch(error){
        console.error("Error cargando el archivo JSON:", error);
        contenedor.innerHTML = '<p>Error al cargar los destinos</p>';
    }
});

// 3. Evento para los botones (Filtros)
botones.forEach(boton => {
    boton.addEventListener('click', (e) => {
        // Borramos la clase "activo" de todos los botones 
        botones.forEach(b => b.classList.remove('activo'));

        // Añadimos la clase "activo" únicamente en el botón pulsado
        e.target.classList.add('activo');

        // Obtenemos el nombre del continente del botón y mostramos sus resultados
        const continente_elegido = e.target.innerText;
        mostrarContinente(continente_elegido);
    });
});


// 4. Función que escribe los rincones en el HTML
function mostrarContinente(nombre_continente) {
    // Limpiamos lo que hubiera previamente
    contenedor.innerHTML = '';

    // Buscamos el continente en nuestro json
    const continente_data = datos_globales.find(c => c.name === nombre_continente);

    if (continente_data){
        // Recorremos los países del continente
        continente_data.countries.forEach(pais =>{

            // Recorremos las ciudades de cada país
            pais.cities.forEach(ciudad => {

                // Creamos el HTML para cada ciudad, y lo añadimos al contenedor
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
    }

    else{
        contenedor.innerHTML = '<p>No se encontraron datos para este continente.</p>';
    }
}