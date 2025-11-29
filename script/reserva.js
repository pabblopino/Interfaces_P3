$(document).ready(function() {

    // 1. Leer parámetro de la URL
    const params = new URLSearchParams(window.location.search);
    const packId = params.get("id_pack"); 

    // 2. Definir los packs disponibles con la NUEVA propiedad 'incluye'
    const packs = {
        camping: {
            nombre: "CAMPING AL ATARDECER",
            precio: "450€",
            detalle: "Conecta con la naturaleza durmiendo bajo las estrellas. Disfruta de una experiencia única de acampada en alta montaña, con amaneceres inolvidables, aire puro y la tranquilidad que solo el bosque puede ofrecer.",
            imagen: "images/camping.jpg",
            incluye: [
                "Tienda de campaña pro",
                "Saco de dormir térmico",
                "Linterna frontal"
            ]
        },
        desierto: {
            nombre: "AVENTURA EN EL DESIERTO",
            precio: "520€",
            detalle: "Adéntrate en las dunas doradas a lomos de camellos. Una travesía exótica donde descubrirás la inmensidad del desierto, sus oasis ocultos y unos atardeceres mágicos que teñirán de rojo la arena.",
            imagen: "images/desierto.jpg",
            incluye: [
                "Excursión en camello",
                "Cena bajo las estrellas",
                "Turbante bereber"
            ]
        },
        islandia: {
            nombre: "AURORAS EN ISLANDIA",
            precio: "380€",
            detalle: "Viaja a la tierra del hielo y el fuego. Descubre cascadas impresionantes, glaciares milenarios y, con suerte, el espectáculo de luces más bonito del mundo: las auroras boreales bailando en el cielo.",
            imagen: "images/islandia.jpg",
            incluye: [
                "Tour de auroras boreales",
                "Visita a aguas termales",
                "Crampones para hielo"
            ]
        },
        patagonia: {
            nombre: "TREKKING EN PATAGONIA",
            precio: "290€",
            detalle: "El destino definitivo para los amantes del senderismo. Recorre los senderos más australes del mundo, rodeado de lagos turquesas, picos afilados y una naturaleza salvaje que te dejará sin aliento.",
            imagen: "images/patagonia.jpg",
            incluye: [
                "Guía de montaña experto",
                "Bastones de trekking",
                "Mapa de rutas"
            ]
        },
        pirineos: {
            nombre: "CUMBRES DE LOS PIRINEOS",
            precio: "610€",
            detalle: "Explora la majestuosidad de las montañas nevadas. Un viaje ideal para disfrutar de los deportes de invierno, paisajes blancos infinitos y la calidez de los pueblos de montaña tras una jornada de actividad.",
            imagen: "images/pirineos.jpg",
            incluye: [
                "Forfait para 2 días",
                "Alquiler de equipo esquí",
                "Seguro de accidentes"
            ]
        },
        santiago: {
            nombre: "CAMINO DE SANTIAGO",
            precio: "450€",
            detalle: "Más que un viaje, una experiencia vital. Peregrina hasta la Plaza del Obradoiro, comparte historias con otros caminantes y descubre la riqueza cultural y gastronómica de Galicia paso a paso.",
            imagen: "images/santiago2.jpg",
            incluye: [
                "Credencial del peregrino",
                "Mochila ergonómica",
                "Alojamiento en albergues"
            ]
        }
    };

    // 3. Actualizar contenido dinámicamente según el nuevo HTML
    const pack = packs[packId];

    if (pack) {
        // Título del destino
        $(".titulo-destino").text(pack.nombre);

        // Precio
        $(".precio-numero").text(pack.precio);

        // Descripción
        $(".texto-descripcion p").text(pack.detalle);

        // Imagen
        $(".marco-foto img").attr("src", pack.imagen);
        $(".marco-foto img").attr("alt", pack.nombre);

        // --- LÓGICA NUEVA PARA LA LISTA 'INCLUYE' ---
        
        // 1. Seleccionamos la lista
        const $lista = $(".lista-incluye");
        
        // 2. Borramos el contenido actual (los li de ejemplo del HTML)
        $lista.empty();

        // 3. Recorremos los 3 elementos del pack y los añadimos
        pack.incluye.forEach(function(item) {
            $lista.append(`<li>${item}</li>`);
        });

    } else {
        console.log("No se ha seleccionado ningún pack o el pack no existe.");
        // Opcional: Ocultar la caja de precio si no hay pack
        // $(".caja-precio").hide();
    }
});

// --- VALIDACIÓN DEL FORMULARIO (Se mantiene igual) ---

function handleCompra(event){
    event.preventDefault();
    let form_valido = true;
    $('.error-texto').text(''); 

    const data = new FormData(document.forms['compra']);

    // 1. Nombre
    const nombre = data.get('nombreCompleto').trim();
    if(nombre.length < 3){
        $('#errorNombreCompleto').text('El nombre completo debe tener al menos 3 caracteres.');
        form_valido = false;
    }

    // 2. Correo
    const correo = data.get('correo');
    const regex_correo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    if(!regex_correo.test(correo)){
        $('#errorCorreo').text('El formato del correo no es válido.');
        form_valido = false;
    }

    // 3. Tipo Tarjeta
    const tipo_tarjeta = data.get('tipoTarjeta');
    if(tipo_tarjeta === ""){
        $('#errorTipoTarjeta').text('Escoja una de las 3 opciones');
        form_valido = false;
    }

    // 4. Numero Tarjeta
    const num_tarjeta = data.get('numeroTarjeta');
    if(!(num_tarjeta.length == 13 || num_tarjeta.length == 15 || num_tarjeta.length == 16 || num_tarjeta.length == 19)){
        $('#errorNumeroTarjeta').text('El número de tarjeta no es válido');
        form_valido = false;
    }

    // 5. Titular
    const titular = data.get('titularTarjeta').trim();
    if(titular.length < 3){
        $('#errorTitularTarjeta').text('El nombre del titular debe tener al menos 3 caracteres.');
        form_valido = false;
    }

    // 6. Fecha
    const fecha_cad = data.get('fechaCaducidad');
    if (!fecha_cad) {
        $('#errorFechaCaducidad').text('Debe introducir una fecha.');
        form_valido = false;
    } else {
        const [anio, mes] = fecha_cad.split('-').map(Number);
        const fecha_hoy = new Date();
        const anio_actual = fecha_hoy.getFullYear();
        const mes_actual = fecha_hoy.getMonth() + 1;

        if(anio < anio_actual || (anio === anio_actual && mes < mes_actual)){
            $('#errorFechaCaducidad').text('La tarjeta ha expirado');
            form_valido = false;
        }
    }
    
    // 7. CVV
    const cvv = data.get('cvv');
    const cvv_regex = /^\d{3}$/;
    if(!cvv_regex.test(cvv)){
        $('#errorCvv').text('El CVV debe tener 3 dígitos.');
        form_valido = false;
    }

    if (form_valido){
        alert('Compra realizada con éxito.');
        $('#formularioCompra')[0].reset();
    }
}

// Asignar eventos
$(document).ready(function() {
    $('#formularioCompra').on('submit', handleCompra);

    $('#btnBorrar').on('click', function(){
        document.forms['compra'].reset();
        $('.error-texto').text('');
    });
});

// Desplegar/Ocultar el bloque principal
$("#btnOpcionesAdicionales").click(function() {
    $("#contenidoOpciones").slideToggle();
    // Cambiar la flechita (opcional)
    let texto = $(this).find("span").text();
    $(this).find("span").text(texto === "▼" ? "▲" : "▼");
});

// Mostrar/Ocultar campos de Acompañantes
$("#checkAcompanantes").change(function() {
    if(this.checked) {
        $("#infoAcompanantes").slideDown();
    } else {
        $("#infoAcompanantes").slideUp();
    }
});

// Añadir más filas de acompañantes dinámicamente
$("#btnMasAcompanante").click(function() {
    const nuevaFila = `
        <div class="fila-acompanante" style="margin-top:5px;">
            <input type="text" name="nombreAcompanante[]" placeholder="Nombre completo">
            <input type="email" name="emailAcompanante[]" placeholder="Email">
        </div>
    `;
    $("#listaAcompanantes").append(nuevaFila);
});

// Mostrar/Ocultar campos de Mascota
$("#checkMascota").change(function() {
    if(this.checked) {
        $("#infoMascota").slideDown();
    } else {
        $("#infoMascota").slideUp();
    }
});

// Añadir más filas de mascotas dinámicamente
    $("#btnMasMascota").click(function() {
        const nuevaFilaMascota = `
            <div class="fila-mascota">
                <input type="text" name="tipoMascota[]" placeholder="Tipo (ej. Perro)">
                <select name="tamanoMascota[]" class="select-mascota">
                    <option value="">Tamaño</option>
                    <option value="pequeno">Pequeño (< 10kg)</option>
                    <option value="mediano">Mediano (10-25kg)</option>
                    <option value="grande">Grande (> 25kg)</option>
                </select>
            </div>
        `;
        $("#listaMascotas").append(nuevaFilaMascota);
    });