import { iniciarSesion } from './usuario.mjs';

document.addEventListener("DOMContentLoaded", () => {
    // --- BOTÓN DE REGISTRO ---
    const btnRegistro = document.querySelector(".btnRegistro");
    if (btnRegistro) {
        btnRegistro.addEventListener("click", () => {
            window.location.href = "registro.html";
        });
    }

    // --- LOGIN ---
    const btnLogin = document.querySelector("#btnIniciarSesion");
    const inputUsuario = document.querySelector("#usuario");
    const inputPassword = document.querySelector("#password");

    if (btnLogin && inputUsuario && inputPassword) {
        btnLogin.addEventListener("click", () => {
            const usuario = inputUsuario.value.trim();
            const password = inputPassword.value;

            if (!usuario || !password) {
                alert('Debes introducir usuario y contraseña');
                return;
            }

            iniciarSesion(usuario, password);
        });
    }

    // --- USUARIO ACTIVO ---
    const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));

    const divLogin = document.querySelector('.inicio-sesion');
    const divUsuario = document.querySelector('.usuario-activo');
    const nombreUsuario = document.querySelector('#nombreUsuario');
    const imagenUsuario = document.querySelector('#imagenUsuario');

    if (usuarioActivo) {
        if (divLogin) divLogin.style.display = 'none';
        if (divUsuario) divUsuario.style.display = 'flex';
        if (nombreUsuario) nombreUsuario.textContent = `${usuarioActivo.nombre} ${usuarioActivo.apellidos}`;
        if (imagenUsuario) {
            imagenUsuario.src = usuarioActivo.imagen;
            imagenUsuario.alt = `Foto de ${usuarioActivo.nombre}`;
        }
    } else {
        if (divLogin) divLogin.style.display = 'flex';
        if (divUsuario) divUsuario.style.display = 'none';
    }

    // --- CERRAR SESIÓN ---
    const btnCerrar = document.querySelector('.boton-cerrar');
    if (btnCerrar) {
        btnCerrar.addEventListener('click', () => {
            if (confirm('¿Desea cerrar sesión?')) {
                localStorage.removeItem('usuarioActivo');
                location.reload(); // recarga para actualizar el header
            }
        });
    }
    // --- BOTÓN "MI PERFIL" ---
    if (usuarioActivo) {
        const btnMiPerfil = document.createElement('button');
        btnMiPerfil.textContent = 'Mi perfil';
        btnMiPerfil.classList.add('btnMiPerfil');
        btnMiPerfil.style.marginLeft = '10px';

        btnMiPerfil.addEventListener('click', () => {
            window.location.href = 'perfil.html';
        });

        // Añadir al div del usuario activo
        if (divUsuario) divUsuario.appendChild(btnMiPerfil);
    }

});


