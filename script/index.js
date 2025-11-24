document.addEventListener("DOMContentLoaded", () => {
    const btnRegistro = document.querySelector(".btnRegistro");

    if (btnRegistro) {
        btnRegistro.addEventListener("click", () => {
            window.location.href = "registro.html";
        });
    }
});
