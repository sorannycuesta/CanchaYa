document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("formContacto");

    function esSoloNumeros(texto) {
        if (texto === "") return false;

        for (let i = 0; i < texto.length; i++) {
            let caracter = texto[i];
            if (caracter < '0' || caracter > '9') {
                return false;
            }
        }
        return true;
    }

    formulario.addEventListener("submit", function (evento) {
        // Capturamos los valores de los inputs
        const nombre = document.getElementById("nombre").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const telefono = document.getElementById("contacto").value.trim();
        const mensaje = document.getElementById("mensaje").value.trim();

        if (nombre.length < 3 || nombre.length > 20) {
            evento.preventDefault();
            console.log("Por favor, ingresa un nombre válido (entre 3 y 20 caracteres).");
            return;
        }

        if (isNaN(telefono) || telefono.trim() === "" || telefono.length < 7 || telefono.length > 10) {
            evento.preventDefault();
            console.log("Por favor, ingresa un número de teléfono válido (solo números, entre 7 y 10 dígitos).");
            return;
        }

        if (mensaje === "") {
            alert("Por favor, escribe un mensaje o duda.");
            evento.preventDefault();
            return;
        }

    });
});


