export function toggleFavorito(usuarioActivo, viaje){

    if (!usuarioActivo) return false;

    // 1. Leemos la base de datos completa
    let historial = JSON.parse(localStorage.getItem('historialViajes')) || [];

    // Buscamos al usuario activo dentro de esa lista
    let datosUsuario = historial.find(u => u.login === usuarioActivo.login);
    let esFavorito = false;

    if (datosUsuario) {
        // 2. Comprobamos si el viaje ya existe
        const indice = datosUsuario.viajes.favoritos.findIndex(v => v.id === viaje.id);

        if (indice !== -1){
            // Si ya existe, lo quitamos
            datosUsuario.viajes.favoritos.splice(indice, 1);

            // Quitamos el corazón de la clase favoritos
            esFavorito = false;
        } else {
            // Si no lo tiene, lo añadimos
            datosUsuario.viajes.favoritos.push(viaje);

            // Añadimos el corazón a la clase favoritos
            esFavorito = true;
        }

        // Guardamos todo el historial actualizado
        localStorage.setItem('historialViajes', JSON.stringify(historial));
    } else {
        // Si es un nuevo usuario sin historial, lo creamos y añadimos el favorito
        const nuevoRegistro = {
            login: usuarioActivo.login,
            viajes: { 
                favoritos: [viaje], 
                realizados: [], 
                reservados: [] 
            }
        };
        historial.push(nuevoRegistro);
        localStorage.setItem('historialViajes', JSON.stringify(historial));
        
        esFavorito = true;
    }

    // Devolvemos el estado para que el botón sepa si ponerse rojo o no
    return esFavorito;
}


export function agregarReserva(usuarioActivo, viaje) {
    if (!usuarioActivo) return;

    let historial = JSON.parse(localStorage.getItem('historialViajes')) || [];
    let datosUsuario = historial.find(u => u.login === usuarioActivo.login);

    if (datosUsuario) {
        // Añadimos el viaje a la lista de reservados
        datosUsuario.viajes.reservados.push(viaje);
        
        // Guardamos cambios
        localStorage.setItem('historialViajes', JSON.stringify(historial));
    } else {
        // Si es un nuevo usuario sin historial, lo creamos y añadimos el favorito
        const nuevoRegistro = {
            login: usuarioActivo.login,
            viajes: { favoritos: [], realizados: [], reservados: [viaje] }
        };
        historial.push(nuevoRegistro);
        localStorage.setItem('historialViajes', JSON.stringify(historial));
    }
}


export function moverViajeRealizado(usuarioActivo, viaje) {
    if (!usuarioActivo) return false;

    let historial = JSON.parse(localStorage.getItem('historialViajes')) || [];
    let datosUsuario = historial.find(u => u.login === usuarioActivo.login);

    if (datosUsuario) {
        // 1. Buscamos el viaje en RESERVADOS
        const indice = datosUsuario.viajes.reservados.findIndex(v => v.id === viaje.id);

        if (indice !== -1) {
            // 2. Lo sacamos de reservados (splice devuelve un array, cogemos el primero)
            const viajeMovido = datosUsuario.viajes.reservados.splice(indice, 1)[0];

            // 3. Lo metemos en REALIZADOS
            const yaExiste = datosUsuario.viajes.realizados.some(v => v.id === viajeMovido.id);
            if (!yaExiste) {
                datosUsuario.viajes.realizados.push(viajeMovido);
            }

            // 4. Guardamos los cambios
            localStorage.setItem('historialViajes', JSON.stringify(historial));
            return true;
        }
    }
    return false;
}