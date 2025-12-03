import { iniciarSesion } from './usuario.mjs';

document.addEventListener("DOMContentLoaded", () => {
    
    // Variable global para saber si estamos en inglés
    const isEn = window.location.pathname.includes('/ingles/');

    // ------------------------------------------------
    // 1. LOGICA DEL SELECTOR DE IDIOMA (FUNDAMENTAL)
    // ------------------------------------------------
    const selectores = document.querySelectorAll('.selector-idioma select, .selector-idioma-mis-viajes select');
    
    selectores.forEach(select => {
        select.addEventListener('change', (e) => {
            const val = e.target.value; // 'es' o 'en'
            const path = window.location.pathname;
            const file = path.substring(path.lastIndexOf('/') + 1); // ej: destinos.html

            if (val === 'en') {
                // Ir a inglés
                if (file.includes('_en.html')) return; // Ya estamos
                // Convertir 'destinos.html' -> 'ingles/destinos_en.html'
                const newFile = file.replace('.html', '_en.html');
                // Si estamos en la raiz (index.html), vamos a ingles/index_en.html
                window.location.href = `ingles/${newFile}`; 
                // NOTA: Si ya estás dentro de /ingles/ por error y quieres recargar, ajusta la ruta, 
                // pero normalmente desde español vas a `ingles/archivo_en.html`.
            } 
            else if (val === 'es') {
                // Ir a español
                if (!file.includes('_en.html')) return; // Ya estamos
                // Convertir 'destinos_en.html' -> 'destinos.html'
                const newFile = file.replace('_en.html', '.html');
                // Salimos de la carpeta ingles con "../"
                window.location.href = `../${newFile}`;
            }
        });
    });

    // ------------------------------------------------
    // 2. HEADER Y NAVEGACIÓN
    // ------------------------------------------------

    // --- BOTÓN DE REGISTRO ---
    const btnRegistro = document.querySelector(".btnRegistro");
    if (btnRegistro) {
        btnRegistro.addEventListener("click", () => {
            window.location.href = isEn ? "registro_en.html" : "registro.html";
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
                alert(isEn ? 'Please enter username and password' : 'Debes introducir usuario y contraseña');
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
            // Ajuste de ruta de imagen si estamos en subcarpeta
            let rutaImg = usuarioActivo.imagen;
            // Si es una ruta relativa local (images/...) y estamos en inglés, añadir ../
            if (isEn && !rutaImg.startsWith('data:') && !rutaImg.startsWith('../') && !rutaImg.startsWith('http')) {
                rutaImg = '../' + rutaImg;
            }
            imagenUsuario.src = rutaImg;
        }
        
        // --- BOTÓN "MI PERFIL" ---
        const btnMiPerfil = document.createElement('button');
        btnMiPerfil.textContent = isEn ? 'My Profile' : 'Mi perfil';
        btnMiPerfil.classList.add('btnMiPerfil');
        btnMiPerfil.style.marginLeft = '10px';

        btnMiPerfil.addEventListener('click', () => {
            window.location.href = isEn ? 'perfil_en.html' : 'perfil.html';
        });
        divUsuario.appendChild(btnMiPerfil);

    } else {
        if (divLogin) divLogin.style.display = 'flex';
        if (divUsuario) divUsuario.style.display = 'none';
    }

    // --- CERRAR SESIÓN ---
    const btnCerrar = document.querySelector('.boton-cerrar');
    if (btnCerrar) {
        btnCerrar.addEventListener('click', () => {
            const msg = isEn ? 'Do you want to log out?' : '¿Desea cerrar sesión?';
            if (confirm(msg)) {
                localStorage.removeItem('usuarioActivo');
                location.reload(); 
            }
        });
    }

    // ------------------------------------------------
    // 3. BUSCADOR INTELIGENTE
    // ------------------------------------------------
    const btnBusquedaIndex = document.querySelector('#btnBusquedaIndex');
    const inputBusquedaIndex = document.querySelector('#inputBusquedaIndex');

    const realizarBusqueda = () => {
        const texto = inputBusquedaIndex.value.trim();
        if (texto) {
            // Si estamos en inglés, mandamos a destinos_en.html
            const paginaDestino = isEn ? 'destinos_en.html' : 'destinos.html';
            window.location.href = `${paginaDestino}?q=${encodeURIComponent(texto)}`;
        }
    };

    if (btnBusquedaIndex && inputBusquedaIndex) {
        btnBusquedaIndex.addEventListener('click', realizarBusqueda);
        inputBusquedaIndex.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') realizarBusqueda();
        });
    }
    // 5. LÓGICA DEL NEWSLETTER 
    // Como esta web es estática y no tiene servidor backend, 
    // hemos utilizamos el servicio de terceros EmailJS para gestionar el envío de correos.
    // Usamos 'fetch' nativo para conectar con su API sin instalar librerías extra.
    // De esta manera y usando la página web de emailjs hemos conseguido que funcione.

    const formNewsletter = document.querySelector('#campos-newsletter form');

    if (formNewsletter) {
        formNewsletter.addEventListener('submit', (e) => {
            e.preventDefault(); 

            // 1. Detectar idioma y elementos
            const isEn = window.location.pathname.includes('/ingles/');
            const inputEmail = formNewsletter.querySelector('input');
            const email = inputEmail.value.trim();
            const btnSubmit = formNewsletter.querySelector('button');
            
            // 2. Validación del email
            const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regexCorreo.test(email)) {
                alert(isEn ? 'Please enter a valid email address.' : 'Por favor, introduce un correo electrónico válido.');
                return;
            }

            // 3. Bloquear botón para evitar doble click
            btnSubmit.disabled = true;
            btnSubmit.textContent = isEn ? 'Sending...' : 'Enviando...';

            // 4. PREPARAR LOS DATOS PARA LA API
            // Aquí es donde ocurre la magia sin librerías
            const datosParaEnviar = {
                service_id: 'service_pinut9h',      // SERVICE ID de mi usuario en la aplicación
                template_id: 'template_ylkyecr',    // PON TU TEMPLATE ID de mi usuario en la aplicación
                user_id: 'ZArOLJ4L9PqBSfzNq',       // PON TU PUBLIC KEY AQUÍ de mi usuario en la aplicación
                template_params: {
                    destinatario: email,          // Esto coincide con {{destinatario}} en tu plantilla
                    mensaje: "Nuevo suscriptor desde la web"
                }
            };

            // 5. ENVIAR LA PETICIÓN (FETCH)
            fetch('https://api.emailjs.com/api/v1.0/email/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datosParaEnviar)
            })
            .then((response) => {
                if (response.ok) {
                    // Éxito (Código 200)
                    alert(isEn 
                        ? 'Email sent! Check your inbox.' 
                        : '¡Correo enviado! Revisa tu bandeja de entrada.');
                    formNewsletter.reset();
                } else {
                    // Error del servidor (ej: credenciales mal puestas)
                    return response.text().then(text => { throw new Error(text) });
                }
            })
            .catch((err) => {
                console.error('ERROR:', err);
                alert(isEn 
                    ? 'Error sending email. Please try again later.' 
                    : 'Error al enviar el correo. Revisa la consola o inténtalo más tarde.');
            })
            .finally(() => {
                // 6. Restaurar el botón
                btnSubmit.disabled = false;
                // Restauramos el texto original (puedes ajustarlo si tu botón dice otra cosa)
                btnSubmit.textContent = isEn ? 'Sign Up' : 'Registro';
            });
        });
    }
});