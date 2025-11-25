import { iniciarSesion } from './usuario.mjs';

document.addEventListener("DOMContentLoaded", () => {
    const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));

    if (!usuarioActivo) {
        alert('No has iniciado sesión. Serás redirigido al inicio.');
        window.location.href = 'index.html';
        return;
    }

    // --- PERFIL ---
    const perfilNombre = document.querySelector('#perfil-nombre');
    const perfilCorreo = document.querySelector('#perfil-correo');
    const perfilFoto = document.querySelector('#perfil-foto');

    if (perfilNombre) perfilNombre.textContent = `${usuarioActivo.nombre} ${usuarioActivo.apellidos}`;
    if (perfilCorreo) perfilCorreo.textContent = usuarioActivo.correo || 'correo@ejemplo.com';
    if (perfilFoto) {
        perfilFoto.src = usuarioActivo.imagen || 'images/foto_perfil.png';
        perfilFoto.alt = `Foto de ${usuarioActivo.nombre}`;
    }

    // --- BOTONES ---
    const cerrarSesion = () => {
        if (confirm('¿Desea cerrar sesión?')) {
            localStorage.removeItem('usuarioActivo');
            window.location.href = 'index.html';
        }
    };

    const btnCerrarSesionPerfil = document.querySelector('#btnCerrarSesion'); // perfil

    if (btnCerrarSesionPerfil) btnCerrarSesionPerfil.addEventListener('click', cerrarSesion);

    const btnCambiarPassword = document.querySelector('#btnCambiarPassword');
    if (btnCambiarPassword) {
        btnCambiarPassword.addEventListener('click', () => {
            alert('.');
        });
    }

    const btnMisViajes = document.querySelector('#btnMisViajes');
    if (btnMisViajes) {
        btnMisViajes.addEventListener('click', () => {
            alert('.');
        });
    }
});
