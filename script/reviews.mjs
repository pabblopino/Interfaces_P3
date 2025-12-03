export function cargarReseñas(contenedorSelector) {
    const contenedor = document.querySelector(contenedorSelector);
    if (!contenedor) return;
    const reseñas = JSON.parse(localStorage.getItem('reseñas')) || [];
    const isEn = window.location.pathname.includes('/ingles/');

    contenedor.innerHTML = "";
    reseñas.forEach(r => {
        // Ajustar imagen si estamos en subcarpeta y la imagen es relativa
        let rutaImg = r.foto || 'images/foto_perfil.png';
        if(isEn && !rutaImg.startsWith('../') && !rutaImg.startsWith('http') && !rutaImg.startsWith('data:')){
            rutaImg = '../' + rutaImg;
        }

        const div = document.createElement('div');
        div.className = "slide";
        div.innerHTML = `
            <img src="${rutaImg}" alt="${r.nombre}">
            <div class="estrellas">${"★".repeat(r.estrellas)}${"☆".repeat(5 - r.estrellas)}</div>
            <p>"${r.descripcion}"</p>
            <span>- ${r.nombre}</span>
        `;
        contenedor.appendChild(div);
    });
}

export function agregarReseña({ foto, nombre, titulo, descripcion, estrellas }) {
    const isEn = window.location.pathname.includes('/ingles/');

    if (titulo.length < 5)
        throw new Error(isEn ? "Title must have at least 5 chars." : "El título debe tener al menos 5 caracteres.");

    if (descripcion.length < 10)
        throw new Error(isEn ? "Description must have at least 10 chars." : "La descripción debe tener al menos 10 caracteres.");

    if (estrellas < 1 || estrellas > 5)
        throw new Error(isEn ? "Select a rating between 1 and 5." : "Selecciona una valoración entre 1 y 5 estrellas.");

    const reseñas = JSON.parse(localStorage.getItem('reseñas')) || [];
    reseñas.push({ foto, nombre, titulo, descripcion, estrellas });
    localStorage.setItem('reseñas', JSON.stringify(reseñas));
}