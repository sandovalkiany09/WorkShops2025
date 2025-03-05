document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita el envío del formulario por defecto

    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const cedula = document.getElementById("cedula").value;

    // Crear y codificar en Base64 la autenticación
    const authString = `${nombre}:${apellido}:${cedula}`;
    const authBase64 = btoa(authString);

    // Guardar en sessionStorage
    sessionStorage.setItem("authToken", `Basic ${authBase64}`);

    // Enviar la petición para autenticación
    fetch("http://localhost:3000", {
        method: "GET",
        headers: {
            "Authorization": `Basic ${authBase64}`
        }
    })
    .then(response => {
        if (response.status === 401) {
            alert("Acceso denegado. Credenciales incorrectas.");
        } else {
            alert("Autenticación exitosa.");
            window.location.href = "index.html"; 
        }
    })
    .catch(error => console.error("Error en la autenticación", error));
});
