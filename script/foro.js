import { cargarReseñas, agregarReseña } from "./reviews.mjs";

document.addEventListener("DOMContentLoaded", () => {
    const isEn = window.location.pathname.includes('/ingles/');
    const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo')) || {};

    const nombreInput = document.querySelector('#nombreReseña');
    if (nombreInput && usuarioActivo.nombre && usuarioActivo.apellidos) {
        nombreInput.value = usuarioActivo.nombre + " " + usuarioActivo.apellidos;
    }

    const reseñasFijas = [
        { nombre: "Juan Pérez", descripcion: "El mejor servicio! Todo estuvo perfectamente organizado, los guías fueron amables y el alojamiento espectacular.", foto: isEn ? '../images/foto_perfil.png' : 'images/foto_perfil.png' },
        { nombre: "Laura Gómez", descripcion: "Todo perfecto! La atención al cliente fue excelente y los lugares visitados superaron mis expectativas.", foto: isEn ? '../images/foto_perfil.png' : 'images/foto_perfil.png' },
        { nombre: "Pedro Martínez", descripcion: "Increíble viaje. La planificación fue impecable, los destinos maravillosos y la experiencia general fantástica.", foto: isEn ? '../images/foto_perfil.png' : 'images/foto_perfil.png' },
        { nombre: "Ana López", descripcion: "Una experiencia única. Repetiré seguro el año que viene con vosotros. Muy recomendado para familias.", foto: isEn ? '../images/foto_perfil.png' : 'images/foto_perfil.png' }
    ];

    function cargarReseñasExtendido() {
        const contenedor = document.querySelector("#lista-reseñas");
        if (!contenedor) return;

        const reseñasUsuarios = JSON.parse(localStorage.getItem('reseñas')) || [];
        const ajustadas = reseñasUsuarios.map(r => ({
            ...r,
            foto: r.foto && !r.foto.startsWith("../") && !r.foto.startsWith("http") ? (isEn ? "../" + r.foto : r.foto) : r.foto
        }));

        const todas = reseñasFijas.concat(ajustadas);
        contenedor.innerHTML = "";

        todas.forEach(r => {
            const div = document.createElement("div");
            div.className = "slide";
            const rutaImg = isEn && !r.foto.startsWith("../") && !r.foto.startsWith("http") ? "../" + r.foto : r.foto;
            div.innerHTML = `
                <img src="${rutaImg}" alt="${r.nombre}">
                <p>"${r.descripcion}"</p>
                <span>- ${r.nombre}</span>
            `;
            contenedor.appendChild(div);
        });
    }

    cargarReseñasExtendido();

    const form = document.querySelector(".form-review");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const titulo = form.querySelector('input[type="text"]:not([disabled])').value.trim();
            const descripcion = form.querySelector("textarea").value.trim();

            try {
                agregarReseña({
                    foto: usuarioActivo.imagen || 'images/foto_perfil.png',
                    nombre: usuarioActivo.nombre ? usuarioActivo.nombre + " " + usuarioActivo.apellidos : (isEn ? "Anonymous" : "Anónimo"),
                    titulo,
                    descripcion
                });

                alert(isEn ? "Review submitted!" : "¡Reseña enviada!");
                form.reset();
                if (nombreInput && usuarioActivo.nombre) {
                    nombreInput.value = usuarioActivo.nombre + " " + usuarioActivo.apellidos;
                }

                cargarReseñasExtendido();
            } catch (err) {
                alert(err.message);
            }
        });
    }
});
