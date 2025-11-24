import { cargarReseñas, agregarReseña } from "./reviews.mjs";

document.addEventListener("DOMContentLoaded", () => {
    const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo')) || {};

    // Poner nombre automáticamente
    const nombreInput = document.querySelector('#nombreReseña');
    if (nombreInput && usuarioActivo.nombre && usuarioActivo.apellidos) {
        nombreInput.value = usuarioActivo.nombre + " " + usuarioActivo.apellidos;
    }

    // Cargar reseñas existentes
    cargarReseñas("#lista-reseñas");

    // --- ESTRELLAS ---
    let estrellasSeleccionadas = 0;
    const estrellas = document.querySelectorAll(".rating span");
    if (estrellas.length > 0) {
        estrellas.forEach(star => {
            star.addEventListener("click", () => {
                estrellasSeleccionadas = parseInt(star.dataset.star);
                estrellas.forEach(s => {
                    s.style.color = parseInt(s.dataset.star) <= estrellasSeleccionadas ? "gold" : "#ccc";
                });
            });
        });
    }

    // --- FORMULARIO ---
    const form = document.querySelector(".form-review");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const titulo = form.querySelector('input[placeholder^="Ej:"]').value.trim();
            const descripcion = form.querySelector("textarea").value.trim();

            try {
                agregarReseña({
                    foto: usuarioActivo.imagen || 'images/foto_perfil.png', // Foto automáticamente
                    nombre: usuarioActivo.nombre + " " + usuarioActivo.apellidos,
                    titulo,
                    descripcion,
                    estrellas: estrellasSeleccionadas
                });

                alert("¡Reseña enviada!");
                form.reset();

                // Resetear estrellas
                estrellas.forEach(s => s.style.color = "#ccc");
                estrellasSeleccionadas = 0;

                // Recargar reseñas
                cargarReseñas("#lista-reseñas");

                // Volver a poner nombre
                if (nombreInput) nombreInput.value = usuarioActivo.nombre + " " + usuarioActivo.apellidos;

            } catch (err) {
                alert(err.message);
            }
        });
    }
});
