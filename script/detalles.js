import { agregarReseña } from "./reviews-destino.mjs";
import { activarCarrusel } from "./carousel.mjs";

document.addEventListener("DOMContentLoaded", () => {
    // Detectar si estamos en versión inglés
    const isEn = window.location.pathname.includes('/ingles/');

    const params = new URLSearchParams(window.location.search);
    const packId = params.get("id_pack");

    if (!packId) {
        console.error("Falta id_pack en la URL");
        return;
    }

    // -------------------------------
    // PACKS EN ESPAÑOL
    // -------------------------------
    const packs_es = {
        camping: { 
            nombre: "Camping al Atardecer", 
            precio: "450€", 
            detalle: "Olvídate del estrés de la ciudad y reconecta con tu esencia. Disfrutarás de una ubicación secreta en alta montaña, rodeado de bosques milenarios. La experiencia incluye una noche bajo un manto de estrellas inigualable, historias junto a la hoguera y el despertar con el sonido de la naturaleza.", 
            imagen: "images/camping.jpg", 
            incluye: [
                "Tienda de campaña técnica 4 estaciones",
                "Saco de dormir térmico (-5ºC)",
                "Kit de cocina y frontal",
                "Guía de orientación estelar"
            ]
        },
        desierto: { 
            nombre: "Aventura en el Sahara", 
            precio: "520€", 
            detalle: "Adéntrate en el infinito mar de arena dorada. Cruzarás las dunas a lomos de dromedarios hasta llegar a nuestro campamento de lujo. Disfruta de la hospitalidad bereber, prueba su gastronomía tradicional y déjate hipnotizar por el silencio absoluto del desierto bajo la Vía Láctea.", 
            imagen: "images/desierto.jpg", 
            incluye: [
                "Ruta guiada en dromedario (2h)",
                "Cena típica bereber con espectáculo",
                "Alojamiento en Jaima de lujo",
                "Sandboarding en las dunas"
            ]
        },
        islandia: { 
            nombre: "Cazadores de Auroras", 
            precio: "380€", 
            detalle: "Un viaje a la tierra de hielo y fuego. Exploraremos glaciares azules, cascadas estruendosas y playas de arena negra volcánica. Al caer la noche, nos alejaremos de la contaminación lumínica para buscar las mágicas auroras boreales bailando en el cielo.", 
            imagen: "images/islandia.jpg", 
            incluye: [
                "Tour nocturno de auroras boreales",
                "Entrada a la Laguna Secreta",
                "Equipamiento de seguridad para hielo",
                "Transporte en 4x4"
            ]
        },
        patagonia: { 
            nombre: "Expedición Patagonia", 
            precio: "290€", 
            detalle: "El desafío definitivo para los amantes del trekking. Caminarás a los pies de gigantes de granito como el Fitz Roy. Descubre lagos de color turquesa intenso, bosques magallánicos y una fauna salvaje única en uno de los rincones más vírgenes del planeta.", 
            imagen: "images/patagonia.jpg", 
            incluye: [
                "Guía de montaña certificado",
                "Bastones de trekking profesionales",
                "Mapas topográficos y GPS",
                "Seguro de rescate"
            ]
        },
        pirineos: { 
            nombre: "Nieve en los Pirineos", 
            precio: "610€", 
            detalle: "Vive la majestuosidad de los Pirineos cubiertos de blanco. Disfruta de kilómetros de pistas esquiables con nieve de calidad, o relájate con una ruta de raquetas por bosques de abetos. Al caer la tarde, el calor de la chimenea te esperará en el refugio.", 
            imagen: "images/pirineos.jpg", 
            incluye: [
                "Forfait completo para 2 días",
                "Alquiler de esquís/snowboard gama alta",
                "Seguro de accidentes",
                "Clase de iniciación (opcional)"
            ]
        },
        santiago: { 
            nombre: "El Camino de Santiago", 
            precio: "450€", 
            detalle: "Más que un viaje, una transformación personal. Recorre los últimos 100 km del Camino Francés a través de bosques gallegos y aldeas de piedra. Comparte historias con peregrinos de todo el mundo y siente la emoción indescriptible al llegar a la Plaza del Obradoiro.", 
            imagen: "images/santiago2.jpg", 
            incluye: [
                "Credencial oficial del peregrino",
                "Mochila ergonómica y kit de pies",
                "Gestión de alojamiento en albergues",
                "Vehículo de apoyo"
            ]
        }
    };

    // -------------------------------
    // PACKS EN INGLÉS (solo lo necesario)
    // -------------------------------
    const packs_en = {
        camping: { 
            nombre: "Sunset Alpine Camping",
            precio: "450€",
            detalle: "Forget the stress of the city and reconnect with your essence. Enjoy a secret high-mountain spot surrounded by ancient forests. Spend a night under an unmatched starry sky, with stories by the fire and a peaceful nature awakening.",
            imagen: "../images/camping.jpg",
            incluye: [
                "4-season technical tent",
                "Thermal sleeping bag (-5ºC)",
                "Cooking kit & headlamp",
                "Star-orientation guide"
            ]
        },
        desierto: { 
            nombre: "Sahara Desert Adventure",
            precio: "520€",
            detalle: "Step into the endless golden desert. Ride camels across dunes until reaching a luxury Berber camp. Enjoy traditional food, authentic hospitality, and total silence under the Milky Way.",
            imagen: "../images/desierto.jpg",
            incluye: [
                "Camel guided route (2h)",
                "Traditional Berber dinner & show",
                "Luxury tent accommodation",
                "Sandboarding"
            ]
        },
        islandia: { 
            nombre: "Northern Lights Hunters",
            precio: "380€",
            detalle: "A journey to the land of ice and fire. Explore glaciers, waterfalls, and volcanic black-sand beaches. At night, chase the magical northern lights far from light pollution.",
            imagen: "../images/islandia.jpg",
            incluye: [
                "Northern lights night tour",
                "Secret Lagoon entrance",
                "Ice-safety equipment",
                "4x4 transport"
            ]
        },
        patagonia: { 
            nombre: "Patagonia Expedition",
            precio: "290€",
            detalle: "The ultimate challenge for trekking lovers. Walk beneath granite giants like Fitz Roy. Discover turquoise lakes, Magellanic forests, and unique wildlife in one of the most untouched places on Earth.",
            imagen: "../images/patagonia.jpg",
            incluye: [
                "Mountain certified guide",
                "Professional trekking poles",
                "Topographic maps & GPS",
                "Rescue insurance"
            ]
        },
        pirineos: { 
            nombre: "Snow in the Pyrenees",
            precio: "610€",
            detalle: "Experience the majesty of the snow-covered Pyrenees. Ski long slopes or relax on a snowshoe walk among fir forests. At night, enjoy a warm fireplace in a cozy refuge.",
            imagen: "../images/pirineos.jpg",
            incluye: [
                "2-day full ski pass",
                "High-end ski/snowboard rental",
                "Accident insurance",
                "Optional beginner class"
            ]
        },
        santiago: { 
            nombre: "The Way of St. James",
            precio: "450€",
            detalle: "More than a trip, a personal transformation. Walk the last 100 km of the French Way through forests and stone villages. Share stories with pilgrims and feel the emotion of arriving at Obradoiro Square.",
            imagen: "../images/santiago2.jpg",
            incluye: [
                "Official pilgrim credential",
                "Ergonomic backpack & foot kit",
                "Hostel management",
                "Support vehicle"
            ]
        }
    };

    // -------------------------------
    // Selección de pack según idioma
    // -------------------------------
    const packs = isEn ? packs_en : packs_es;
    const pack = packs[packId];

    if (pack) {
        document.getElementById("titulo-destino").textContent = pack.nombre;
        document.getElementById("precio-destino").textContent = pack.precio;
        document.getElementById("desc-destino").textContent = pack.detalle;

        const selectorMoneda = document.querySelector('.selector-moneda select');
        const precioElemento = document.getElementById("precio-destino");
        const tasasCambio = {'EUR': { factor: 1, simbolo: '€' },'DOL': { factor: 1.17, simbolo: '$' },'LIB': { factor: 0.87, simbolo: '£' }};
        const precioBase = parseInt(pack.precio);

        const actualizarPrecioVisual = () => {
            const monedaSeleccionada = selectorMoneda ? selectorMoneda.value : 'EUR';
            const { factor, simbolo } = tasasCambio[monedaSeleccionada] || tasasCambio['EUR'];
            const precioConvertido = Math.round(precioBase * factor);
            precioElemento.textContent = `${precioConvertido}${simbolo}`;
        };
        if(selectorMoneda){
            selectorMoneda.addEventListener('change', actualizarPrecioVisual);
        }
        actualizarPrecioVisual();
        const imgEl = document.getElementById("img-destino");
        if (imgEl) {
            imgEl.src = pack.imagen;
            imgEl.alt = pack.nombre;
        }

        const listaEl = document.getElementById("lista-incluye");
        if (listaEl) {
            listaEl.innerHTML = "";
            pack.incluye.forEach(item => {
                const li = document.createElement("li");
                li.textContent = item;
                listaEl.appendChild(li);
            });
        }

        const btnReserva = document.getElementById("btn-reservar-link");
        if (btnReserva) {
            btnReserva.href = isEn
                ? `../reserva.html?id_pack=${packId}`
                : `reserva.html?id_pack=${packId}`;
        }
    }

    // -------------------------------
    // Traducción de textos fijos
    // -------------------------------
    if (isEn) {
        document.querySelector("h3:nth-of-type(1)").textContent = "Description";
        document.querySelector("h3:nth-of-type(2)").textContent = "What’s included?";
        document.querySelector(".btn-reservar-grande").textContent = "Book Now";
        document.querySelector(".cabecera-seccion h2").textContent = "LEAVE YOUR REVIEW";

        document.getElementById("tituloExperiencia").placeholder = "Summary of your experience";
        document.getElementById("descExperiencia").placeholder = "Tell us about your trip...";
    }

    // -------------------------------
    // FORMULARIO DE RESEÑAS
    // -------------------------------
    const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo')) || {};
    const nombreInput = document.querySelector('#nombreReseña');

    if (nombreInput) {
        nombreInput.value = usuarioActivo.nombre
            ? `${usuarioActivo.nombre} ${usuarioActivo.apellidos}`
            : (isEn ? "Anonymous" : "Anónimo");
    }

    let estrellasSeleccionadas = 0;
    const estrellas = document.querySelectorAll(".rating span");

    estrellas.forEach(star => {
        star.addEventListener("click", () => {
            estrellasSeleccionadas = parseInt(star.dataset.star);
            estrellas.forEach(s => {
                s.style.color = parseInt(s.dataset.star) <= estrellasSeleccionadas ? "gold" : "#ccc";
            });
        });
    });

    const form = document.querySelector(".form-review");

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const tituloVal = document.getElementById('tituloExperiencia').value.trim();
            const descVal = document.getElementById('descExperiencia').value.trim();

            try {
                agregarReseña({
                    foto: usuarioActivo.imagen || (isEn ? "../images/foto_perfil.png" : "images/foto_perfil.png"),
                    nombre: usuarioActivo.nombre
                        ? `${usuarioActivo.nombre} ${usuarioActivo.apellidos}`
                        : (isEn ? "Anonymous" : "Anónimo"),
                    titulo: tituloVal,
                    descripcion: descVal,
                    estrellas: estrellasSeleccionadas
                }, packId);

                alert(isEn ? "Review saved!" : "¡Opinión guardada correctamente!");

                form.reset();
                estrellasSeleccionadas = 0;
                estrellas.forEach(s => (s.style.color = "#ccc"));
                nombreInput.value = usuarioActivo.nombre
                    ? `${usuarioActivo.nombre} ${usuarioActivo.apellidos}`
                    : (isEn ? "Anonymous" : "Anónimo");

                // Volver a pintar el carrusel actualizado
                pintarReseñasCarrusel(packId);

            } catch (err) {
                alert(err.message);
            }
        });
    }

    // -------------------------------
    // CARRUSEL DE RESEÑAS
    // -------------------------------
    function pintarReseñasCarrusel(packId) {
        const contenedor = document.getElementById('contenedor-reseñas');
        if (!contenedor) return;

        const reseñas = JSON.parse(localStorage.getItem(`reseñas_${packId}`)) || [];
        contenedor.innerHTML = '';

        if (reseñas.length === 0) {
            contenedor.innerHTML = '<p>No hay opiniones aún.</p>';
            return;
        }

        const btnPrev = document.createElement('button');
        btnPrev.className = 'prev flecha';
        btnPrev.innerText = '⟨';

        const btnNext = document.createElement('button');
        btnNext.className = 'next flecha';
        btnNext.innerText = '⟩';

        const ventana = document.createElement('div');
        ventana.className = 'ventana-carrusel';

        const track = document.createElement('div');
        track.className = 'track-carrusel';

        reseñas.forEach(r => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="reseña-foto">
                    <img src="${r.foto}" alt="${r.nombre}">
                </div>
                <h4>${r.titulo}</h4>
                <p class="autor">${r.nombre}</p>
                <p class="descripcion">${r.descripcion}</p>
                <p class="estrellas">${'★'.repeat(r.estrellas)}${'☆'.repeat(5 - r.estrellas)}</p>
            `;
            track.appendChild(card);
        });

        ventana.appendChild(track);
        contenedor.appendChild(btnPrev);
        contenedor.appendChild(ventana);
        contenedor.appendChild(btnNext);

        activarCarrusel('contenedor-reseñas');
    }

    // Pintar carrusel al cargar
    pintarReseñasCarrusel(packId);
});
