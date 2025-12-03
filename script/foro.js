import { cargarReseñas, agregarReseña } from "./reviews.mjs";

document.addEventListener("DOMContentLoaded", () => {
    const isEn = window.location.pathname.includes('/ingles/');
    const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo')) || {};

    const nombreInput = document.querySelector('#nombreReseña');
    if (nombreInput && usuarioActivo.nombre && usuarioActivo.apellidos) {
        nombreInput.value = usuarioActivo.nombre + " " + usuarioActivo.apellidos;
    }

    cargarReseñas("#lista-reseñas");

    // Estrellas
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

    // Formulario
    const form = document.querySelector(".form-review");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const titulo = form.querySelector('input[type="text"]:not([disabled])').value.trim();
            const descripcion = form.querySelector("textarea").value.trim();

            try {
                agregarReseña({
                    foto: usuarioActivo.imagen || 'images/foto_perfil.png',
                    nombre: (usuarioActivo.nombre ? usuarioActivo.nombre + " " + usuarioActivo.apellidos : (isEn ? "Anonymous" : "Anónimo")),
                    titulo,
                    descripcion,
                    estrellas: estrellasSeleccionadas
                });

                alert(isEn ? "Review submitted!" : "¡Reseña enviada!");
                form.reset();
                estrellas.forEach(s => s.style.color = "#ccc");
                estrellasSeleccionadas = 0;
                cargarReseñas("#lista-reseñas");
                
                if (nombreInput && usuarioActivo.nombre) nombreInput.value = usuarioActivo.nombre + " " + usuarioActivo.apellidos;

            } catch (err) {
                alert(err.message);
            }
        });
    }
});