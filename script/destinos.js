document.addEventListener('DOMContentLoaded', () => {
    
    const inputBuscador = document.querySelector('.contenedor-buscador input');
    const botonBuscar = document.querySelector('.contenedor-buscador button');
    const botonesFiltro = document.querySelectorAll('.btn-filtro-lateral');
    const sliderPrecio = document.querySelector('.slider-precio');
    const textoPrecio = document.querySelector('.bloque-filtro p'); 
    const tarjetas = document.querySelectorAll('.card');
    const selectorMoneda = document.querySelector('.selector-moneda select');
    const tasasCambio = {'EUR': { factor: 1, simbolo: '€' },'DOL': { factor: 1.17, simbolo: '$' },'LIB': { factor: 0.87, simbolo: '£' }}


    let filtros = {
        categoria: 'todos', // Si es inglés, usaremos "All" en la lógica interna
        precioMaximo: 1000,
        busqueda: ''
    };

    // --- 1. LEER PARAMETROS URL (Del buscador del index) ---
    const params = new URLSearchParams(window.location.search);
    const busquedaURL = params.get('q');

    if (busquedaURL) {
        filtros.busqueda = busquedaURL;
        if(inputBuscador) inputBuscador.value = busquedaURL;
    }

    const actualizarPreciosVisuales = () => {
        const monedaSeleccionada = selectorMoneda ? selectorMoneda.value : 'EUR';
        const { factor, simbolo } = tasasCambio[monedaSeleccionada] || tasasCambio['EUR'];
        tarjetas.forEach(card => {
            const precioBase = parseFloat(card.dataset.precio);
            const precioConvertido = Math.round(precioBase * factor);
            const etiquetaPrecio = card.querySelector('.precio');
            if(etiquetaPrecio) {
                etiquetaPrecio.textContent = `${precioConvertido}${simbolo}`;
            }
        });
        if(sliderPrecio && textoPrecio) {
            const valorSlider = parseInt(sliderPrecio.value);
            const precioSliderConvertido = Math.round(valorSlider * factor); 
            const isEn = window.location.pathname.includes('/ingles/');
            textoPrecio.textContent = isEn 
                ? `Up to: ${precioSliderConvertido}${simbolo}` 
                : `Hasta: ${precioSliderConvertido}${simbolo}`;
        }
    };

    // --- 2. FUNCIÓN FILTRAR ---
    const aplicarFiltros = () => {
        const textoBusqueda = filtros.busqueda.toLowerCase().trim();

        tarjetas.forEach(card => {
            // Leemos los data-attributes (que son iguales en ES y EN)
            const categoriaCard = card.dataset.categoria; 
            const precioCard = parseInt(card.dataset.precio);
            const tituloCard = card.querySelector('h3').textContent.toLowerCase();

            // A) Categoría
            // "Todos" en español o "All" en inglés -> mostramos todo
            const esTodo = filtros.categoria === 'todos' || filtros.categoria === 'all';
            const coincideCategoria = esTodo || (filtros.categoria === categoriaCard);

            // B) Precio
            const coincidePrecio = precioCard <= filtros.precioMaximo;

            // C) Buscador
            const coincideBusqueda = tituloCard.includes(textoBusqueda);

            if (coincideCategoria && coincidePrecio && coincideBusqueda) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    };

    // Aplicar filtros iniciales (por si venimos con búsqueda)
    aplicarFiltros();
    actualizarPreciosVisuales();

    // --- 3. LISTENERS ---

    if(selectorMoneda){
        selectorMoneda.addEventListener('change', () => {
            actualizarPreciosVisuales();
        });
    }

    botonesFiltro.forEach(boton => {
        boton.addEventListener('click', (e) => {
            botonesFiltro.forEach(b => b.classList.remove('activo'));
            e.target.classList.add('activo');
            
            const textoBoton = e.target.textContent.toLowerCase();
            
            // MAPEO: Convertir texto visible a data-categoria
            // Si el botón dice "Mountain" (EN), la data es "montana"
            let cat = textoBoton;
            if (textoBoton === 'montaña' || textoBoton === 'mountain') cat = 'montana';
            if (textoBoton === 'playa' || textoBoton === 'beach') cat = 'playa';
            if (textoBoton === 'nieve' || textoBoton === 'snow') cat = 'nieve';
            if (textoBoton === 'ciudad' || textoBoton === 'city') cat = 'ciudad';
            if (textoBoton === 'rural' || textoBoton === 'rural') cat = 'rural';
            if (textoBoton === 'todos' || textoBoton === 'all') cat = 'todos';

            filtros.categoria = cat;
            aplicarFiltros();
        });
    });

    if(sliderPrecio){
        sliderPrecio.addEventListener('input', (e) => {
            const valor = e.target.value;
            filtros.precioMaximo = parseInt(valor);
            const isEn = window.location.pathname.includes('/ingles/');
            textoPrecio.textContent = isEn ? `Up to: ${valor}€` : `Hasta: ${valor}€`;
            aplicarFiltros();
        });
    }

    if(inputBuscador){
        inputBuscador.addEventListener('input', (e) => {
            filtros.busqueda = e.target.value;
            aplicarFiltros();
        });
    }

    if(botonBuscar){
        botonBuscar.addEventListener('click', (e) => {
            e.preventDefault(); 
            aplicarFiltros();
        });
    }
});