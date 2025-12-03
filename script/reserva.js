$(document).ready(function() {
    const isEn = window.location.pathname.includes('/ingles/');
    const params = new URLSearchParams(window.location.search);
    const packId = params.get("id_pack"); 

    // DATOS EN ESPAÑOL
    const packs_es = {
        camping: {
            nombre: "CAMPING AL ATARDECER",
            precio: "450€",
            detalle: "Conecta con la naturaleza durmiendo bajo las estrellas...",
            imagen: isEn ? "../images/camping.jpg" : "images/camping.jpg", // Ajuste de ruta imagen
            incluye: ["Tienda de campaña pro", "Saco de dormir térmico", "Linterna frontal"]
        },
        desierto: {
            nombre: "AVENTURA EN EL DESIERTO",
            precio: "520€",
            detalle: "Adéntrate en las dunas doradas...",
            imagen: isEn ? "../images/desierto.jpg" : "images/desierto.jpg",
            incluye: ["Excursión en camello", "Cena bajo las estrellas", "Turbante bereber"]
        },
        islandia: {
            nombre: "AURORAS EN ISLANDIA",
            precio: "380€",
            detalle: "Viaja a la tierra del hielo y el fuego...",
            imagen: isEn ? "../images/islandia.jpg" : "images/islandia.jpg",
            incluye: ["Tour de auroras boreales", "Visita a aguas termales", "Crampones para hielo"]
        },
        patagonia: {
            nombre: "TREKKING EN PATAGONIA",
            precio: "290€",
            detalle: "El destino definitivo para los amantes del senderismo...",
            imagen: isEn ? "../images/patagonia.jpg" : "images/patagonia.jpg",
            incluye: ["Guía de montaña experto", "Bastones de trekking", "Mapa de rutas"]
        },
        pirineos: {
            nombre: "CUMBRES DE LOS PIRINEOS",
            precio: "610€",
            detalle: "Explora la majestuosidad de las montañas nevadas...",
            imagen: isEn ? "../images/pirineos.jpg" : "images/pirineos.jpg",
            incluye: ["Forfait para 2 días", "Alquiler de equipo esquí", "Seguro de accidentes"]
        },
        santiago: {
            nombre: "CAMINO DE SANTIAGO",
            precio: "450€",
            detalle: "Más que un viaje, una experiencia vital...",
            imagen: isEn ? "../images/santiago2.jpg" : "images/santiago2.jpg",
            incluye: ["Credencial del peregrino", "Mochila ergonómica", "Alojamiento en albergues"]
        }
    };

    // DATOS EN INGLÉS (¡Traducidos!)
    const packs_en = {
        camping: {
            nombre: "SUNSET CAMPING",
            precio: "450€",
            detalle: "Connect with nature sleeping under the stars...",
            imagen: "../images/camping.jpg",
            incluye: ["Pro Tent", "Thermal Sleeping Bag", "Headlamp"]
        },
        desierto: {
            nombre: "DESERT ADVENTURE",
            precio: "520€",
            detalle: "Venture into golden dunes on camels...",
            imagen: "../images/desierto.jpg",
            incluye: ["Camel Trek", "Dinner under stars", "Berber Turban"]
        },
        islandia: {
            nombre: "ICELAND AURORAS",
            precio: "380€",
            detalle: "Travel to the land of ice and fire...",
            imagen: "../images/islandia.jpg",
            incluye: ["Northern Lights Tour", "Hot Springs Visit", "Ice Crampons"]
        },
        patagonia: {
            nombre: "PATAGONIA TREKKING",
            precio: "290€",
            detalle: "The ultimate destination for hiking lovers...",
            imagen: "../images/patagonia.jpg",
            incluye: ["Expert Mountain Guide", "Trekking Poles", "Route Map"]
        },
        pirineos: {
            nombre: "PYRENEES PEAKS",
            precio: "610€",
            detalle: "Explore the majesty of snowy mountains...",
            imagen: "../images/pirineos.jpg",
            incluye: ["2-day Ski Pass", "Ski Equipment Rental", "Accident Insurance"]
        },
        santiago: {
            nombre: "CAMINO DE SANTIAGO",
            precio: "450€",
            detalle: "More than a trip, a life experience...",
            imagen: "../images/santiago2.jpg",
            incluye: ["Pilgrim Credential", "Ergonomic Backpack", "Hostel Accommodation"]
        }
    };

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
});

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

    if (form_valido){
        // Si está todo OK, redirigimos a confirmación
        if (isEn) {
            window.location.href = "confirmacion_en.html";
        } else {
            window.location.href = "confirmacion.html";
        }
    }
}

$(document).ready(function() {
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