$(document).ready(function() {

    // 1. Leer parámetro de la URL
    const params = new URLSearchParams(window.location.search);
    const packId = params.get("id_pack"); 

    // 2. Definir los packs disponibles
    const packs = {
        fiordos: {
            nombre: "FIORDOS NORUEGOS",
            precio: "700€",
            // Usaremos 'detalle' para la descripción larga del nuevo diseño
            detalle: "Los fiordos noruegos son profundas y estrechas entradas de mar, con laderas empinadas y acantilados altos, formadas por la erosión de glaciares. Se caracterizan por su belleza escénica, con cascadas espectaculares, montañas escarpadas y exuberante vegetación.",
            imagen: "images/fiordos.jpg"
        },
        ruta66: {
            nombre: "RUTA 66 EN MOTO",
            precio: "1500€",
            detalle: "La Ruta 66 recorre Estados Unidos de costa a costa, pasando por desiertos, moteles clásicos y paisajes icónicos. Una experiencia ideal para los amantes de la carretera y la libertad. Vive la aventura americana por excelencia.",
            imagen: "images/ruta66.jpg"
        },
        asiatico: {
            nombre: "SUDESTE ASIÁTICO",
            precio: "1200€",
            detalle: "El Sudeste Asiático combina playas paradisíacas, templos milenarios y una gastronomía única. Descubre culturas fascinantes y paisajes exóticos en un solo viaje que te cambiará la vida.",
            imagen: "images/sudeste_asiatico.webp"
        }
    };

    // 3. Actualizar contenido dinámicamente según el nuevo HTML
    const pack = packs[packId];

    if (pack) {
        // Título del destino
        $(".titulo-destino").text(pack.nombre);

        // Precio
        $(".precio-numero").text(pack.precio);

        // Descripción (En el nuevo diseño usamos el párrafo dentro de texto-descripcion)
        $(".texto-descripcion p").text(pack.detalle);

        // Imagen (Ahora es una etiqueta <img>, no un fondo CSS)
        $(".marco-foto img").attr("src", pack.imagen);
        $(".marco-foto img").attr("alt", pack.nombre);

    } else {
        // Si no hay pack seleccionado o no existe, ponemos uno por defecto o un mensaje
        // Opcional: podrías dejar el HTML estático (Monte Fuji) si no hay param URL
        console.log("No se ha seleccionado ningún pack o el pack no existe.");
    }
});

// --- A PARTIR DE AQUÍ LA VALIDACIÓN SIGUE IGUAL ---

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

// Asignar eventos (asegúrate de que el DOM esté cargado o usa document ready)
$(document).ready(function() {
    // Si usas jQuery para el submit:
    $('#formularioCompra').on('submit', handleCompra);

    // Botón borrar
    $('#btnBorrar').on('click', function(){
        document.forms['compra'].reset();
        $('.error-texto').text('');
    });
});