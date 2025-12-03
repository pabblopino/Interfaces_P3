import { iniciarSesion } from './usuario.mjs';

document.addEventListener("DOMContentLoaded", () => {
    // Detectar idioma
    const isEn = window.location.pathname.includes('/ingles/');
    const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));

    if (!usuarioActivo) {
        alert(isEn ? 'Not logged in. Redirecting to home.' : 'No has iniciado sesión. Serás redirigido al inicio.');
        window.location.href = isEn ? 'index_en.html' : 'index.html';
        return;
    }

    // --- PERFIL ---
    const perfilNombre = document.querySelector('#perfil-nombre');
    const perfilCorreo = document.querySelector('#perfil-correo');
    const perfilFoto = document.querySelector('#perfil-foto');

    if (perfilNombre) perfilNombre.textContent = `${usuarioActivo.nombre} ${usuarioActivo.apellidos}`;
    if (perfilCorreo) perfilCorreo.textContent = usuarioActivo.correo || 'correo@ejemplo.com';
    
    if (perfilFoto) {
        let ruta = usuarioActivo.imagen || 'images/foto_perfil.png';
        if (isEn && !ruta.startsWith('data:') && !ruta.startsWith('../')) {
            ruta = '../' + ruta;
        }
        perfilFoto.src = ruta;
    }

    // --- BOTONES ---
    const btnCerrarSesionPerfil = document.querySelector('#btnCerrarSesion'); 

    if (btnCerrarSesionPerfil) {
        btnCerrarSesionPerfil.addEventListener('click', () => {
            const msg = isEn ? 'Do you want to log out?' : '¿Desea cerrar sesión?';
            if (confirm(msg)) {
                localStorage.removeItem('usuarioActivo');
                window.location.href = isEn ? 'index_en.html' : 'index.html';
            }
        });
    }

    // Botones dummy
    const btnCambiarPassword = document.querySelector('#btnCambiarPassword');
    if (btnCambiarPassword) {
        btnCambiarPassword.addEventListener('click', () => alert(isEn ? 'Coming soon...' : 'Próximamente...'));
    }

    const btnMisViajes = document.querySelector('#btnMisViajes');
    if (btnMisViajes) {
        btnMisViajes.addEventListener('click', () => {
            window.location.href = isEn ? 'mis_viajes_en.html' : 'mis_viajes.html';
        });
    }
});