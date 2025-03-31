// Referencias a los elementos del DOM
const nombre = document.querySelector("#nombre");
const correo = document.querySelector("#correo");
const negocio = document.querySelector("#negocio");
const numero = document.querySelector("#numero")
const contraseña = document.querySelector("#contraseña");
const contraseñaVerif = document.querySelector("#verif-contraseña");
const boton = document.querySelector("#boton");
const form = document.querySelector("#contenedor1")

// Expresiones regulares para validaciones
const EMAIL_VALIDATION = /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/;
const PASSWORD_VALIDATION = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const NAME_VALIDATION = /^[A-Z\u00D1][a-zA-Z-\u00FF\u00D1\u00F1]+(\s*[A-Z\u00D1][a-zA-Z-\u00FF\u00D1\u00F1]*)*$/;

// Estados de validación
let contraseñaValidation= false;
let correoValidation= false;
let nombreValidation = false;
  // funcion de mensaje
function mostrarNotificacion(mensaje) {
    const notificacion = document.getElementById("notificacion");
    notificacion.textContent = mensaje;
    notificacion.classList.remove("oculto");
    notificacion.classList.add("visible");

    // Ocultar automáticamente después de 3 segundos
    setTimeout(() => {
        notificacion.classList.remove("visible");
        notificacion.classList.add("oculto");
    }, 3000);
}

form.addEventListener("submit", async e => {
    e.preventDefault(); // Detiene el comportamiento predeterminado del formulario
   nombreValidation = NAME_VALIDATION.test(nombre.value)
     correoValidation = EMAIL_VALIDATION.test(correo.value)
     contraseñaValidation = PASSWORD_VALIDATION.test(contraseña.value)
    if (!nombre.value || !correo.value || !negocio.value || !numero.value || !contraseña.value) {
mostrarNotificacion("No pueden estar vacios los input")
   } else  {
    if (!nombreValidation|| !correoValidation || !contraseñaValidation){
        mostrarNotificacion("El nombre debe tener Nombre y Apellido. El correo tiene que ser valido.  La contraseña debe tener 1 mayuscula    ")
  console.log(nombreValidation, correoValidation,contraseñaValidation)
   }  else {  try {
    
    const { data } = await axios.get("/api/users");
    console.log("Datos obtenidos del backend:", data.phoneCode );

    const numeroCode = data.phoneCode + numero.value;
    console.log(nombre.value)
    const newUser = {
        name: nombre.value,
        email: correo.value,
        negocio: negocio.value,
        numero: numeroCode,
        password: contraseña.value,
    };
    // Realiza la solicitud POST
    const { dat } = await axios.post("/api/users",newUser);
   console.log(dat)
   
} catch (error) {
    console.error("Error en el registro del usuario:", error.response ? error.response.data : error.message);
}}
   }
});


const Home = document.querySelector("#Inventary")
Home.addEventListener("click", e => {
      window.location.pathname = "/"
})