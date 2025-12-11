import { agregarReserva } from "./gestion-viajes.js";

$(document).ready(function() {
    // ---------------------------------
    // 1. CONFIGURACIÓN INICIAL Y DATOS
    // ---------------------------------
    const isEn = window.location.pathname.includes('/ingles/');
    const params = new URLSearchParams(window.location.search);
    const packId = params.get("id_pack"); 

    // DATOS EN ESPAÑOL
    const packs_es = {
        camping: {
            nombre: "Camping al Atardecer",
            precio: "450€",
            detalle: "Desconecta del ruido de la ciudad y sumérgete en la serenidad de la alta montaña. Dormirás en una ubicación privilegiada bajo un manto de estrellas, rodeado por el susurro del viento en los árboles y amaneceres que tiñen los picos de dorado. Una experiencia perfecta para reconectar contigo mismo y con la naturaleza en su estado más puro.",
            imagen: isEn ? "../images/camping.jpg" : "images/camping.jpg",
            incluye: ["Tienda de campaña técnica 4 estaciones", "Saco de dormir térmico de alta gama", "Linterna frontal y kit de cocina"]
        },
        desierto: {
            nombre: "Aventura en el Sahara",
            precio: "520€",
            detalle: "Siente la magia del desierto infinito. Atravesarás dunas doradas a lomos de camellos hasta llegar a un campamento bereber de lujo. Disfruta del silencio absoluto, una cena tradicional junto al fuego y un cielo nocturno tan claro que sentirás que puedes tocar la Vía Láctea. Una aventura exótica que despertará todos tus sentidos.",
            imagen: isEn ? "../images/desierto.jpg" : "images/desierto.jpg",
            incluye: ["Ruta guiada en dromedario", "Cena típica bereber y espectáculo", "Alojamiento en jaima de lujo"]
        },
        islandia: {
            nombre: "Cazadores de Auroras",
            precio: "380€",
            detalle: "Viaja a la tierra donde el hielo y el fuego conviven. Explorarás glaciares milenarios, cascadas estruendosas y playas de arena negra. Por la noche, nos alejaremos de la contaminación lumínica para presenciar el espectáculo natural más impresionante del planeta: las auroras boreales danzando en el cielo ártico.",
            imagen: isEn ? "../images/islandia.jpg" : "images/islandia.jpg",
            incluye: ["Tour nocturno de auroras boreales", "Entrada a la Laguna Secreta", "Equipamiento de seguridad para hielo"]
        },
        patagonia: {
            nombre: "Expedición Patagonia",
            precio: "290€",
            detalle: "El desafío definitivo para los amantes del trekking. Caminarás a los pies de gigantes de granito como el Fitz Roy y las Torres del Paine. Descubre lagos de color turquesa intenso, bosques magallánicos y una fauna salvaje única. Una ruta exigente pero con las vistas más gratificantes del hemisferio sur.",
            imagen: isEn ? "../images/patagonia.jpg" : "images/patagonia.jpg",
            incluye: ["Guía de montaña certificado", "Bastones de trekking profesionales", "Mapas topográficos y GPS"]
        },
        pirineos: {
            nombre: "Nieve en los Pirineos",
            precio: "610€",
            detalle: "Vive la majestuosidad de los Pirineos cubiertos de blanco. Disfruta de kilómetros de pistas esquiables con nieve de calidad, o relájate con una ruta de raquetas por bosques de abetos. Al caer la tarde, el calor de la chimenea y la gastronomía de montaña en un refugio acogedor serán el broche de oro perfecto.",
            imagen: isEn ? "../images/pirineos.jpg" : "images/pirineos.jpg",
            incluye: ["Forfait completo para 2 días", "Alquiler de esquís/snowboard de gama alta", "Seguro de accidentes y rescate"]
        },
        santiago: {
            nombre: "El Camino de Santiago",
            precio: "450€",
            detalle: "Más que un viaje, una transformación personal. Recorre los últimos 100 km del Camino Francés a través de bosques gallegos, aldeas de piedra y puentes medievales. Comparte historias con peregrinos de todo el mundo y siente la emoción indescriptible al llegar a la Plaza del Obradoiro tras días de esfuerzo y superación.",
            imagen: isEn ? "../images/santiago2.jpg" : "images/santiago2.jpg",
            incluye: ["Credencial oficial del peregrino", "Mochila ergonómica y kit de pies", "Gestión de alojamiento en albergues"]
        }
    };

    // DATOS EN INGLÉS (Traducidos y elaborados)
    const packs_en = {
        camping: {
            nombre: "Sunset Alpine Camping",
            precio: "450€",
            detalle: "Disconnect from the city noise and immerse yourself in high mountain serenity. Sleep in a privileged location under a blanket of stars, surrounded by the whisper of wind in the trees and sunrises that turn the peaks gold. The perfect experience to reconnect with yourself and nature in its purest state.",
            imagen: "../images/camping.jpg",
            incluye: ["4-season technical tent", "High-end thermal sleeping bag", "Headlamp and cooking kit"]
        },
        desierto: {
            nombre: "Sahara Desert Adventure",
            precio: "520€",
            detalle: "Feel the magic of the endless desert. You will cross golden dunes on camelback to reach a luxury Berber camp. Enjoy absolute silence, a traditional dinner by the fire, and a night sky so clear you'll feel you can touch the Milky Way. An exotic adventure that will awaken all your senses.",
            imagen: "../images/desierto.jpg",
            incluye: ["Guided camel trek", "Typical Berber dinner & show", "Accommodation in luxury tent"]
        },
        islandia: {
            nombre: "Iceland Aurora Hunt",
            precio: "380€",
            detalle: "Travel to the land where ice and fire coexist. Explore ancient glaciers, thundering waterfalls, and black sand beaches. At night, we'll venture away from light pollution to witness the planet's most impressive natural show: the Northern Lights dancing across the Arctic sky.",
            imagen: "../images/islandia.jpg",
            incluye: ["Northern Lights night tour", "Secret Lagoon entrance", "Ice safety equipment"]
        },
        patagonia: {
            nombre: "Patagonia Expedition",
            precio: "290€",
            detalle: "The ultimate challenge for hiking lovers. Walk at the foot of granite giants like Fitz Roy and Torres del Paine. Discover intense turquoise lakes, Magellanic forests, and unique wildlife. A demanding route offering the most rewarding views in the Southern Hemisphere.",
            imagen: "../images/patagonia.jpg",
            incluye: ["Certified mountain guide", "Professional trekking poles", "Topographic maps & GPS"]
        },
        pirineos: {
            nombre: "Pyrenees Snow Escape",
            precio: "610€",
            detalle: "Experience the majesty of the snow-covered Pyrenees. Enjoy kilometers of skiable slopes with quality snow, or relax with a snowshoe route through fir forests. At sunset, the warmth of a fireplace and hearty mountain cuisine in a cozy refuge will be the perfect finishing touch.",
            imagen: "../images/pirineos.jpg",
            incluye: ["2-day full Ski Pass", "High-end ski/snowboard rental", "Accident & rescue insurance"]
        },
        santiago: {
            nombre: "The Way of St. James",
            precio: "450€",
            detalle: "More than a trip, a personal transformation. Walk the last 100 km of the French Way through Galician forests, stone villages, and medieval bridges. Share stories with pilgrims from around the world and feel the indescribable emotion upon reaching Obradoiro Square after days of effort.",
            imagen: "../images/santiago2.jpg",
            incluye: ["Official Pilgrim Credential", "Ergonomic backpack & foot kit", "Hostel accommodation management"]
        }
    };

    // --------------
    // 2. PINTAR DOM
    // --------------
    // Elegir el objeto de datos correcto
    const packs = isEn ? packs_en : packs_es;
    const pack = packs[packId];

    if (pack) {
        $(".titulo-destino").text(pack.nombre);
        $(".precio-numero").text(pack.precio);
        $(".texto-descripcion p").text(pack.detalle);
        $(".marco-foto img").attr("src", pack.imagen).attr("alt", pack.nombre);
        
        const $lista = $(".lista-incluye");
        $lista.empty();
        pack.incluye.forEach(function(item) {
            $lista.append(`<li>${item}</li>`);
        });
    } else {
        console.log("No pack selected");
    }

    // --------------------------------------
    // 3. DEFINICIÓN DE LA FUNCIÓN DE COMPRA
    // --------------------------------------

    function handleCompra(event){
        event.preventDefault();
        const isEn = window.location.pathname.includes('/ingles/');
        let form_valido = true;
        $('.error-texto').text(''); 

        const data = new FormData(document.forms['compra']);

        // Validaciones con mensajes traducidos
        const nombre = data.get('nombreCompleto').trim();
        if(nombre.length < 3){
            $('#errorNombreCompleto').text(isEn ? 'Name must be at least 3 chars.' : 'El nombre completo debe tener al menos 3 caracteres.');
            form_valido = false;
        }

        const correo = data.get('correo');
        const regex_correo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        if(!regex_correo.test(correo)){
            $('#errorCorreo').text(isEn ? 'Invalid email format.' : 'El formato del correo no es válido.');
            form_valido = false;
        }

        const tipo_tarjeta = data.get('tipoTarjeta');
        if(tipo_tarjeta === ""){
            $('#errorTipoTarjeta').text(isEn ? 'Choose one option' : 'Escoja una de las 3 opciones');
            form_valido = false;
        }

        const num_tarjeta = data.get('numeroTarjeta');
        if(!(num_tarjeta.length == 13 || num_tarjeta.length == 15 || num_tarjeta.length == 16 || num_tarjeta.length == 19)){
            $('#errorNumeroTarjeta').text(isEn ? 'Invalid card number' : 'El número de tarjeta no es válido');
            form_valido = false;
        }

        const titular = data.get('titularTarjeta').trim();
        if(titular.length < 3){
            $('#errorTitularTarjeta').text(isEn ? 'Holder name too short' : 'El nombre del titular debe tener al menos 3 caracteres.');
            form_valido = false;
        }

        const fecha_cad = data.get('fechaCaducidad');
        if (!fecha_cad) {
            $('#errorFechaCaducidad').text(isEn ? 'Date required' : 'Debe introducir una fecha.');
            form_valido = false;
        } else {
            const [anio, mes] = fecha_cad.split('-').map(Number);
            const fecha_hoy = new Date();
            const anio_actual = fecha_hoy.getFullYear();
            const mes_actual = fecha_hoy.getMonth() + 1;

            if(anio < anio_actual || (anio === anio_actual && mes < mes_actual)){
                $('#errorFechaCaducidad').text(isEn ? 'Card expired' : 'La tarjeta ha expirado');
                form_valido = false;
            }
        }
        
        const cvv = data.get('cvv');
        const cvv_regex = /^\d{3}$/;
        if(!cvv_regex.test(cvv)){
            $('#errorCvv').text(isEn ? 'CVV must be 3 digits' : 'El CVV debe tener 3 dígitos.');
            form_valido = false;
        }

        // Añadimos la reserva a las reservas del usuario
        if (form_valido){
            // Obtenemos el usuario activo
            const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));

            // Creamos el objeto reserva
            const precioLimpio = pack.precio.replace('€', '').trim();

            const nuevaReserva = {
                id: packId,
                titulo: pack.nombre,
                precio: precioLimpio,
                imagen: pack.imagen,
                fechaReserva: new Date().toLocaleDateString()
            };

            // Guardamos en LocalStorage la reserva qu se acaba de crear
            if (usuarioActivo) {
                agregarReserva(usuarioActivo, nuevaReserva);
            }

            // Si está todo OK, redirigimos a confirmación
            if (isEn) {
                // Si estamos en la carpeta ingles, busca confirmacion_en.html (que está al lado)
                window.location.href = "confirmacion-reserva-en.html";
            } else {
                // Si estamos en español, busca confirmacion.html
                window.location.href = "confirmacion-reserva.html";
            }
        }
    }

    // -------------------------
    // 4. ASIGNACIÓN DE EVENTOS
    // -------------------------

    $('#formularioCompra').on('submit', handleCompra);
    $('#btnBorrar').on('click', function(){
        document.forms['compra'].reset();
        $('.error-texto').text('');
    });
    
    // Logica visual (Toggle opciones) se mantiene igual
    $("#btnOpcionesAdicionales").click(function() { $("#contenidoOpciones").slideToggle(); });
    $("#checkAcompanantes").change(function() { this.checked ? $("#infoAcompanantes").slideDown() : $("#infoAcompanantes").slideUp(); });
    $("#checkMascota").change(function() { this.checked ? $("#infoMascota").slideDown() : $("#infoMascota").slideUp(); });
    
    // Botones añadir
    $("#btnMasAcompanante").click(function() {
        const phName = window.location.pathname.includes('/ingles/') ? "Full Name" : "Nombre completo";
        const nuevaFila = `<div class="fila-acompanante" style="margin-top:5px;"><input type="text" name="nombreAcompanante[]" placeholder="${phName}"><input type="email" name="emailAcompanante[]" placeholder="Email"></div>`;
        $("#listaAcompanantes").append(nuevaFila);
    });
    
    $("#btnMasMascota").click(function() {
        const isEn = window.location.pathname.includes('/ingles/');
        const phType = isEn ? "Type (e.g. Dog)" : "Tipo (ej. Perro)";
        const opts = isEn 
            ? `<option value="">Size</option><option value="pequeno">Small (< 10kg)</option><option value="mediano">Medium</option><option value="grande">Large</option>`
            : `<option value="">Tamaño</option><option value="pequeno">Pequeño (< 10kg)</option><option value="mediano">Mediano (10-25kg)</option><option value="grande">Grande (> 25kg)</option>`;
            
        const nuevaFila = `<div class="fila-mascota"><input type="text" name="tipoMascota[]" placeholder="${phType}"><select name="tamanoMascota[]" class="select-mascota">${opts}</select></div>`;
        $("#listaMascotas").append(nuevaFila);
    });
});