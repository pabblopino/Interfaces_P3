import { cargarReseñas, agregarReseña } from "./reviews.mjs";

document.addEventListener("DOMContentLoaded", () => {

    const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo')) || {};

    // Poner nombre y foto automáticamente
    const nombreInput = document.querySelector('#nombreReseña');
    const fotoImg = document.querySelector('#fotoReseña');

    if (usuarioActivo.nombre && usuarioActivo.apellidos) {
        nombreInput.value = usuarioActivo.nombre + " " + usuarioActivo.apellidos;
    }

    if (usuarioActivo.imagen) {
        fotoImg.src = usuarioActivo.imagen;
    }

    // Cargar reseñas existentes
    cargarReseñas("#lista-reseñas");

    let estrellasSeleccionadas = 0;
    const estrellas = document.querySelectorAll(".rating span");

    estrellas.forEach(star => {
        star.addEventListener("click", () => {
            estrellasSeleccionadas = parseInt(star.dataset.star);
            estrellas.forEach(s => s.style.color = (parseInt(s.dataset.star) <= estrellasSeleccionadas) ? "gold" : "#ccc");
        });
    });

    const form = document.querySelector(".form-review");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const titulo = form.querySelector('input[placeholder^="Ej:"]').value.trim();
        const descripcion = form.querySelector("textarea").value.trim();

        try {
            agregarReseña({
                foto: usuarioActivo.imagen || 'images/foto_perfil.png',
                nombre: nombreInput.value,
                titulo,
                descripcion,
                estrellas: estrellasSeleccionadas
            });

            alert("¡Reseña enviada!");
            form.reset();
            estrellas.forEach(s => s.style.color = "#ccc");
            estrellasSeleccionadas = 0;
            cargarReseñas("#lista-reseñas");

            // Volver a poner nombre y foto después de reset
            nombreInput.value = usuarioActivo.nombre + " " + usuarioActivo.apellidos;
            fotoImg.src = usuarioActivo.imagen || 'images/foto_perfil.png';

        } catch (err) {
            alert(err.message);
        }
    });
});
