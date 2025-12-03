/* script/destinos.js */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selección de elementos del DOM
    const inputBuscador = document.querySelector('.contenedor-buscador input');
    const botonBuscar = document.querySelector('.contenedor-buscador button');
    
    // Filtros laterales
    const botonesFiltro = document.querySelectorAll('.btn-filtro-lateral');
    const sliderPrecio = document.querySelector('.slider-precio');
    const textoPrecio = document.querySelector('.bloque-filtro p'); // El texto "Hasta: 1000€"

    // Tarjetas
    const tarjetas = document.querySelectorAll('.card');

    // 2. Estado inicial de los filtros
    let filtros = {
        categoria: 'todos',
        precioMaximo: 1000,
        busqueda: ''
    };

    
    // Comprobamos si venimos del Index con una búsqueda
    const params = new URLSearchParams(window.location.search);
    const busquedaURL = params.get('q');

    if (busquedaURL) {
        // 1. Guardamos el valor en el filtro
        filtros.busqueda = busquedaURL;
        // 2. Ponemos el texto en el input visualmente para que el usuario lo vea
        inputBuscador.value = busquedaURL;
        // 3. Aplicamos el filtro inmediatamente (importante hacerlo antes de los event listeners)
        // NOTA: Mueve la función 'aplicarFiltros' ARRIBA de este bloque o asegúrate de que
        // la función aplicarFiltros esté definida antes de llamarla aquí.
    }
    
    
    // 3. Función Principal: Aplicar todos los filtros
    const aplicarFiltros = () => {
        // Normalizamos el texto de búsqueda (minusculas y sin espacios extra)
        const textoBusqueda = filtros.busqueda.toLowerCase().trim();

        tarjetas.forEach(card => {
            // Obtenemos los datos de la tarjeta actual
            const categoriaCard = card.dataset.categoria; // Lee data-categoria
            const precioCard = parseInt(card.dataset.precio); // Lee data-precio
            const tituloCard = card.querySelector('h3').textContent.toLowerCase();

            // Verificamos las 3 condiciones:
            
            // A) ¿Coincide la categoría? (Si es 'todos', siempre es true)
            const coincideCategoria = (filtros.categoria === 'todos') || (filtros.categoria === categoriaCard);

            // B) ¿El precio es menor o igual al marcado?
            const coincidePrecio = precioCard <= filtros.precioMaximo;

            // C) ¿El título contiene el texto del buscador?
            const coincideBusqueda = tituloCard.includes(textoBusqueda);

            // Si cumple TODO, mostramos. Si falla algo, ocultamos.
            if (coincideCategoria && coincidePrecio && coincideBusqueda) {
                card.style.display = 'flex'; // O 'block', según tu diseño flex
            } else {
                card.style.display = 'none';
            }
        });
    };

    // 4. Event Listeners (Escuchadores de eventos)

    // A) Botones de Categoría
    botonesFiltro.forEach(boton => {
        boton.addEventListener('click', (e) => {
            // 1. Quitar clase activo a todos
            botonesFiltro.forEach(b => b.classList.remove('activo'));
            // 2. Poner clase activo al clickeado
            e.target.classList.add('activo');
            
            // 3. Actualizar el estado del filtro
            // Obtenemos el texto del botón, lo pasamos a minúsculas y quitamos tildes si es necesario
            // Truco: Mapeamos el texto del botón a la data-categoria
            const textoBoton = e.target.textContent.toLowerCase();
            
            // Mapeo simple para quitar tildes o caracteres especiales
            let categoriaSeleccionada = textoBoton;
            if (textoBoton === 'montaña') categoriaSeleccionada = 'montana';
            
            filtros.categoria = categoriaSeleccionada;
            
            // 4. Ejecutar filtros
            aplicarFiltros();
        });
    });

    // B) Slider de Precio
    sliderPrecio.addEventListener('input', (e) => {
        const valor = e.target.value;
        filtros.precioMaximo = parseInt(valor);
        
        // Actualizamos el texto visualmente
        textoPrecio.textContent = `Hasta: ${valor}€`;
        
        aplicarFiltros();
    });

    // C) Buscador (Al escribir)
    inputBuscador.addEventListener('input', (e) => {
        filtros.busqueda = e.target.value;
        aplicarFiltros();
    });

    // D) Botón buscar (Opcional, ya que el 'input' lo hace en tiempo real)
    botonBuscar.addEventListener('click', (e) => {
        e.preventDefault(); // Evita que recargue si estuviera en un form
        aplicarFiltros();
    });

});