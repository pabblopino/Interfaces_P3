/* Este archivo existe para actualizar el modo daltónico en confirmacion-reserva,
 ya que los otros módulos tardan más en cargar y a la página no le da tiempo a 
 actualizarse */

function activarDaltonismo() {
    // Verificamos la memoria local
    var modo = localStorage.getItem('modoDaltonico');
    
    // Si es true, añadimos la clase al body inmediatamente
    if (modo === 'true') {
        document.body.classList.add('modo-daltonico');
    }
}

activarDaltonismo();