export function cargarReseñas(contenedorSelector) {
    const contenedor = document.querySelector(contenedorSelector);
    if (!contenedor) return;
    const reseñas = JSON.parse(localStorage.getItem('reseñas')) || [];
    const isEn = window.location.pathname.includes('/ingles/');
    contenedor.innerHTML = "";

    reseñas.forEach(r => {
        let rutaImg = r.foto || 'images/foto_perfil.png';
        if(isEn && !rutaImg.startsWith('../') && !rutaImg.startsWith('http') && !rutaImg.startsWith('data:')){
            rutaImg = '../' + rutaImg;
        }
        const div = document.createElement('div');
        div.className = "slide";
        div.innerHTML = `
            <img src="${rutaImg}" alt="${r.nombre}">
            <p>"${r.descripcion}"</p>
            <span>- ${r.nombre}</span>
        `;
        contenedor.appendChild(div);
    });
}

export function agregarReseña({ foto, nombre, titulo, descripcion }) {
    const isEn = window.location.pathname.includes('/ingles/');

    if (titulo.length < 5)
        throw new Error(isEn ? "Title must have at least 5 chars." : "El título debe tener al menos 5 caracteres.");

    if (descripcion.length < 10)
        throw new Error(isEn ? "Description must have at least 10 chars." : "La descripción debe tener al menos 10 caracteres.");

    const reseñas = JSON.parse(localStorage.getItem('reseñas')) || [];
    reseñas.push({ foto, nombre, titulo, descripcion });
    localStorage.setItem('reseñas', JSON.stringify(reseñas));
}
