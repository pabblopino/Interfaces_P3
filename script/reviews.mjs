// ------------------- CARGAR RESEÑAS -------------------
export function cargarReseñas(contenedorSelector) {
    const contenedor = document.querySelector(contenedorSelector);
    if (!contenedor) return;

    const reseñas = JSON.parse(localStorage.getItem('reseñas')) || [];

    contenedor.innerHTML = "";

    reseñas.forEach(r => {
        const div = document.createElement('div');
        div.className = "slide";

        div.innerHTML = `
            <img src="${r.foto || 'images/foto_perfil.png'}" alt="${r.nombre}">
            <div class="estrellas">
                ${"★".repeat(r.estrellas)}${"☆".repeat(5 - r.estrellas)}
            </div>
            <p>"${r.descripcion}"</p>
            <span>- ${r.nombre}</span>
        `;

        contenedor.appendChild(div);
    });
}

// ------------------- GUARDAR RESEÑA -------------------
export function agregarReseña({ foto, nombre, titulo, descripcion, estrellas }) {

    if (titulo.length < 5)
        throw new Error("El título debe tener al menos 5 caracteres.");

    if (descripcion.length < 10)
        throw new Error("La descripción debe tener al menos 10 caracteres.");

    if (estrellas < 1 || estrellas > 5)
        throw new Error("Selecciona una valoración entre 1 y 5 estrellas.");

    const reseñas = JSON.parse(localStorage.getItem('reseñas')) || [];

    reseñas.push({
        foto,
        nombre,
        titulo,
        descripcion,
        estrellas
    });

    localStorage.setItem('reseñas', JSON.stringify(reseñas));
}
