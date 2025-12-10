export function agregarReseña({ foto, nombre, titulo, descripcion, estrellas }, packId) {
    const isEn = window.location.pathname.includes('/ingles/');

    // Validaciones
    if (!titulo || titulo.length < 3) throw new Error(isEn ? "Title too short" : "El título es muy corto");
    if (!descripcion || descripcion.length < 5) throw new Error(isEn ? "Description too short" : "La descripción es muy corta");
    if (estrellas < 1 || estrellas > 5) throw new Error(isEn ? "Select a rating" : "Selecciona una puntuación");

    // Guardar con clave única para este destino
    const storageKey = `reseñas_${packId}`;
    
    // Obtener array actual, añadir y guardar
    const reseñas = JSON.parse(localStorage.getItem(storageKey)) || [];
    
    const nuevaReseña = {
        foto, 
        nombre, 
        titulo, 
        descripcion, 
        estrellas,
        fecha: new Date().toLocaleDateString()
    };

    reseñas.push(nuevaReseña);
    localStorage.setItem(storageKey, JSON.stringify(reseñas));
}