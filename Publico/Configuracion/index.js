
// menu desplegable 

const HomeBtn = document.querySelector("#Home-btn");
const RegistroBtn = document.querySelector("#Registro-btn");
const MensajeBtn = document.querySelector("#mensaje-btn");
const botonMenu = document.querySelector("#boton-menu");

// cagar una funcion automaticamente
(async () => {
    try {
        const {data} = await axios.get('/api/configuracion');
  console.log(data)
  const containerInfo = document.querySelector("#contenedor-info")

  const listItem = document.querySelector("#contenedor-info")

  
  listItem.innerHTML += `

<section id="informacion">
  <article id="nombre" class="info-item">
    <h2 class="titulo">Nombre y Apellido:</h2>
    <p class="valor">${data[0]}</p>
  </article>

  <article id="correo" class="info-item">
    <h2 class="titulo">Correo electrónico:</h2>
    <p class="valor">${data[1]}</p>
  </article>

    <article id="numero" class="info-item">
    <h2 class="titulo">Numero de telefono:</h2>
    <p class="valor">${data[2]}</p>
  </article>

    <article id="negocio" class="info-item">
    <h2 class="titulo">Negocio o compañia:</h2>
    <p class="valor">${data[3]}</p>
  </article>
  <div id="div-container"> 




  


<button id="cerrar-sesion" class="boton">Cerrar sesion</button>


</div>



</section>





   
  `;



  containerInfo.appendChild(listItem);
   
    } catch (error) {
        console.error('Error al cargar tareas:', error);
   
    }
})();


botonMenu.addEventListener("click" , e => {
 
  const menuDesplegable = document.querySelector("#menu-desplegable")
  const container2 = document.querySelector("#menu-desplegable")
  if ( container2.classList.contains("visible") ===true) {
      container2.classList.remove("visible")
      console.log(menuDesplegable)
  }else {  console.log("hdd")
      container2.classList.add("visible")}
  
  })
// Menu despegable 


HomeBtn.addEventListener("click", e => {
    window.location.pathname = "/Casa"

})
RegistroBtn.addEventListener("click", e => {
    window.location.pathname = "/Inventario"

})

ProductosBtn.addEventListener("click", e => {
    window.location.pathname = "/Productos"

})
MensajeBtn.addEventListener("click", e => {
  window.location.pathname = "/Facturacion"

})
const ConfiguracionBtn = document.querySelector("#config-btn");
ConfiguracionBtn.addEventListener("click", e => {
    window.location.pathname = "/Configuracion"

})