import { cargarReseñas, agregarReseña } from "./reviews.mjs";

document.addEventListener("DOMContentLoaded", () => {

    // Cargar las reseñas guardadas
    cargarReseñas("#lista-reseñas");

    let estrellasSeleccionadas = 0;

    // ------------------- SISTEMA DE ESTRELLAS -------------------
    const estrellas = document.querySelectorAll(".rating span");

    estrellas.forEach(star => {
        star.addEventListener("click", () => {
            estrellasSeleccionadas = parseInt(star.dataset.star);

            estrellas.forEach(s => {
                s.style.color = (parseInt(s.dataset.star) <= estrellasSeleccionadas)
                    ? "gold"
                    : "#ccc";
            });
        });
    });

    // ------------------- ENVÍO DEL FORMULARIO -------------------
    const form = document.querySelector(".form-review");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const imgInput = form.querySelector('input[type="file"]');
        const nombre = form.querySelector('input[placeholder="Ingresa tu nombre"]').value.trim();
        const titulo = form.querySelector('input[placeholder="Ej: Una experiencia inolvidable"]').value.trim();
        const descripcion = form.querySelector("textarea").value.trim();

        // Convertir foto a base64 (si el usuario sube una)
        let fotoBase64 = "";

        const file = imgInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                fotoBase64 = reader.result;
                guardar();
            };
            reader.readAsDataURL(file);
        } else {
            guardar(); // sin foto
        }

        function guardar() {
            try {
                agregarReseña({
                    foto: fotoBase64,
                    nombre,
                    titulo,
                    descripcion,
                    estrellas: estrellasSeleccionadas
                });

                alert("¡Reseña enviada!");

                // Reset form
                form.reset();
                estrellas.forEach(s => (s.style.color = "#ccc"));
                estrellasSeleccionadas = 0;

                // 🔥 Recargar reseñas debajo del formulario
                cargarReseñas("#lista-reseñas");

            } catch (err) {
                alert(err.message);
            }
        }

    });
});
