document.addEventListener('DOMContentLoaded', () => {
    const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));

    const divLogin = document.querySelector('.inicio-sesion');
    const divUsuario = document.querySelector('.usuario-activo');
    const nombreUsuario = document.querySelector('#nombreUsuario');
    const imagenUsuario = document.querySelector('#imagenUsuario');

    if (usuarioActivo) {
        if(divLogin) divLogin.style.display = 'none';
        if(divUsuario) divUsuario.style.display = 'flex';
        if(nombreUsuario) nombreUsuario.textContent = usuarioActivo.nombre + ' ' + usuarioActivo.apellidos;
        if(imagenUsuario) {
            imagenUsuario.src = usuarioActivo.imagen;
            imagenUsuario.alt = `Foto de ${usuarioActivo.nombre}`;
        }
    } else {
        if(divLogin) divLogin.style.display = 'flex';
        if(divUsuario) divUsuario.style.display = 'none';
    }

    // Cerrar sesión
    const btnCerrar = document.querySelector('.boton-cerrar');
    if (btnCerrar) {
        btnCerrar.addEventListener('click', () => {
            if (confirm('¿Desea cerrar sesión?')) {
                localStorage.removeItem('usuarioActivo');
                location.reload(); // recarga para actualizar el header
            }
        });
    }
});

