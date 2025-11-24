import { registrarUsuario } from './usuario.mjs';

document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.querySelector('#form-registro');
    const politica = document.querySelector('#check-politica');
    const boton = document.querySelector('#btn-submit');

    // Habilitar/deshabilitar botón según checkbox
    boton.disabled = true;
    politica.addEventListener('change', () => {
        boton.disabled = !politica.checked;
    });

    formulario.addEventListener('submit', (e) => {
        e.preventDefault();

        const archivoImagen = document.querySelector('#imagen').files[0];
        if (!archivoImagen) {
            alert('Debes subir una imagen de perfil.');
            return;
        }

        const datosUsuario = {
            nombre: document.querySelector('#nombre').value,
            apellidos: document.querySelector('#apellidos').value,
            correo: document.querySelector('#correo').value,
            cfcorreo: document.querySelector('#cfcorreo').value,
            nacimiento: document.querySelector('#nacimiento').value,
            login: document.querySelector('#login').value,
            password: document.querySelector('#password-registro').value,
            imagen: '',
            politica: politica.checked
        };

        const lector = new FileReader();
        lector.onload = function(e) {
            datosUsuario.imagen = e.target.result;
            registrarUsuario(datosUsuario);
        };
        lector.readAsDataURL(archivoImagen);
    });
});
