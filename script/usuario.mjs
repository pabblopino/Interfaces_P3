export function registrarUsuario(datos) {
    // --- VALIDACIÓN NOMBRE ---
    const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/;
    if (!datos.nombre || datos.nombre.length < 3 || !regexNombre.test(datos.nombre)) {
        alert('El nombre debe tener al menos 3 caracteres y solo letras.');
        return;
    }

    // --- VALIDACIÓN APELLIDOS ---
    const apellidosArray = datos.apellidos.trim().split(' ');
    if (apellidosArray.length < 2 || apellidosArray.some(a => a.length < 3) || !regexNombre.test(datos.apellidos)) {
        alert('Debes introducir dos apellidos de al menos 3 letras cada uno.');
        return;
    }

    // --- VALIDACIÓN CORREO ---
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(datos.correo)) {
        alert('El correo electrónico no tiene un formato válido.');
        return;
    }
    if (datos.correo !== datos.cfcorreo) {
        alert('Los correos no coinciden.');
        return;
    }

    // --- LOGIN ---
    if (datos.login.length < 5) {
        alert('El nombre de usuario debe tener mínimo 5 caracteres.');
        return;
    }

    // --- FECHA DE NACIMIENTO ---
    if (datos.nacimiento) {
        const fecha = new Date(datos.nacimiento);
        if (isNaN(fecha.getTime()) || fecha > new Date()) {
            alert('La fecha de nacimiento no es válida.');
            return;
        }
    }

    // --- CONTRASEÑA ---
    const regexPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    if (!regexPassword.test(datos.password)) {
        alert('La contraseña debe tener 8 caracteres, 2 números, 1 mayúscula, 1 minúscula y 1 símbolo.');
        return;
    }

    // --- POLÍTICA ---
    if (!datos.politica) {
        alert('Debes aceptar la política de privacidad.');
        return;
    }

    // --- GUARDAR EN LOCALSTORAGE ---
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.push(datos);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // --- INICIAR SESIÓN ---
    localStorage.setItem('usuarioActivo', JSON.stringify(datos));

    alert('Usuario registrado correctamente');
    window.location.href = 'index.html';
}

export function iniciarSesion(usuario, password) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const encontrado = usuarios.find(u => u.login === usuario && u.password === password);

    if (!encontrado) {
        alert('Usuario o contraseña incorrectos.');
        return;
    }

    localStorage.setItem('usuarioActivo', JSON.stringify(encontrado));
    window.location.href = 'index.html';
}
