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

    // --- 1. PERFIL ---
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

    // 2. LÓGICA CAMBIAR CONTRASEÑA
    const btnCambiarPassword = document.querySelector('#btnCambiarPassword');
    const modal = document.querySelector('#modalPassword');
    const btnCancelar = document.querySelector('#btnCancelarPass');
    const btnGuardar = document.querySelector('#btnGuardarPass');

    // Inputs del modal
    const inputOld = document.querySelector('#oldPass');
    const inputNew = document.querySelector('#newPass');
    const inputConfirm = document.querySelector('#confirmPass');

    // 1. Abrir Modal
    if (btnCambiarPassword && modal) {
        btnCambiarPassword.addEventListener('click', () => {
            modal.style.display = 'flex'; // Mostramos el modal
            // Limpiamos los inputs
            inputOld.value = '';
            inputNew.value = '';
            inputConfirm.value = '';
        });
    }

    // 2. Cerrar Modal
    if (btnCancelar) {
        btnCancelar.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // 3. Guardar Nueva Contraseña
    if (btnGuardar) {
        btnGuardar.addEventListener('click', () => {
            const oldPass = inputOld.value;
            const newPass = inputNew.value;
            const confirmPass = inputConfirm.value;
            
            // A) Verificar contraseña actual
            if (oldPass !== usuarioActivo.password) {
                alert(isEn ? 'Incorrect current password.' : 'La contraseña actual es incorrecta.');
                return;
            }

            // B) Verificar que la nueva cumple los requisitos
            const regexPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
            
            if (!regexPassword.test(newPass)) {
                alert(isEn 
                    ? 'Password must have 8 chars, 2 numbers, 1 uppercase, 1 symbol.' 
                    : 'La nueva contraseña debe tener 8 caracteres, 2 números, 1 mayúscula y 1 símbolo.');
                return;
            }

            // C) Verificar coincidencia
            if (newPass !== confirmPass) {
                alert(isEn ? "New passwords don't match." : 'Las nuevas contraseñas no coinciden.');
                return;
            }

            // D) GUARDAR CAMBIOS EN LOCALSTORAGE
            
            // 1. Actualizamos usuario activo
            usuarioActivo.password = newPass;
            localStorage.setItem('usuarioActivo', JSON.stringify(usuarioActivo));

            // 2. Actualizamos la lista general de usuarios (IMPORTANTE)
            let listaUsuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            const index = listaUsuarios.findIndex(u => u.login === usuarioActivo.login);
            
            if (index !== -1) {
                listaUsuarios[index].password = newPass;
                localStorage.setItem('usuarios', JSON.stringify(listaUsuarios));
                
                alert(isEn ? 'Password changed successfully!' : '¡Contraseña cambiada correctamente!');
                modal.style.display = 'none';
            } else {
                alert('Error al actualizar la base de datos.');
            }
        });
    }

    // 3. OTROS BOTONES
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

    const btnMisViajes = document.querySelector('#btnMisViajes');
    if (btnMisViajes) {
        btnMisViajes.addEventListener('click', () => {
            window.location.href = isEn ? 'mis-viajes-en.html' : 'mis-viajes.html';
        });
    }
});