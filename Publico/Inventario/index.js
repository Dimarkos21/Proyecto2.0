const nombre = document.querySelector("#Nombre")
const numero = document.querySelector("#Numero")
const cedula = document.querySelector("#Cedula")
const monto = document.querySelector("#Monto")
const contenedor2 = document.querySelector("#contenedor2")
const botonMenu = document.querySelector("#boton-menu")
const datos1 = document.querySelector("#datos1")
const HomeBtn = document.querySelector("#Home-btn")
const RegistroBtn = document.querySelector("#Registro-btn")
const MensajeBtn = document.querySelector("#mensaje-btn")
const boton = document.querySelector("#boton")
const datos = document.querySelector("#datos")
const configDelete = document.querySelector("#config-delete")
const ProductosBtn = document.querySelector("#producto-btn");
const costo = document.querySelector("#Costo")
botonMenu.addEventListener("click" , e => {
 
const menuDesplegable = document.querySelector("#menu-desplegable")
const container2 = document.querySelector("#menu-desplegable")
if ( container2.classList.contains("visible") ===true) {
    container2.classList.remove("visible")
    console.log(menuDesplegable)
}else {  console.log("hdd")
    container2.classList.add("visible")}

})




const ul = document.querySelector('ul');
const form = document.querySelector('#form');


// Contadores de tareas
// Cargar las tareas desde el servidor cuando se inicia la aplicación
(async () => {
    try {
        const { data } = await axios.get('/api/todos');
        data.forEach(todo => {
            const tabla = document.querySelector("#datos");
            const listItem = document.createElement('div');
            listItem.id = todo.id;
            
            listItem.innerHTML += `

            
            <div id="p-datos">
               <input class="input-datos" value="${todo.nombre}"></input>
                <input class="input-datos" value="${todo.numero}"></input>
                <input class="input-datos" value="${todo.cedula}"></input>
                       <input class="input-datos" value="${todo.costo}"></input>
                  <input class="input-datos" value="${todo.monto}"></input>
             
                
                  
                 <div id="config-container">



 
 </div>

 
 <button id="config-delete"> 
                 <script src="https://cdn.lordicon.com/lordicon.js"></script>
<lord-icon
    src="https://cdn.lordicon.com/zxvuvcnc.json"
    trigger="hover"
    style="width:30px;height:30px">
</lord-icon>
 </button>

  <button id="config">   


<script src="https://cdn.lordicon.com/lordicon.js"></script>
<lord-icon
    src="https://cdn.lordicon.com/lomfljuq.json"
    trigger="hover"
    style="width:30px;height:30px">
</lord-icon>

 </button>
                </div>
               
                
             
            `;

         

            tabla.appendChild(listItem);

           
        });
    } catch (error) {
        console.error('Error al cargar tareas:', error);
        window.location.pathname = '/login';
    }
})();











form.addEventListener("submit", async e => {
    e.preventDefault();
if ( nombre.value.trim() === "" || 
numero.value.trim() === "" || 
cedula.value.trim() === "" || 
costo.value.trim() === "" || 
monto.value.trim() === "")
{ 

   
    setTimeout(() => { 
        const tabl2 = document.querySelector("#alert");
        const listItem = document.createElement('div');
        
        // Asegúrate de que el contenedor sea visible
        tabl2.style.display = "block";
    
        // Verifica si el mensaje ya existe
        if (!document.querySelector("#text-vacio")) {
            listItem.innerHTML = `
            <p id="text-vacio">No puedes añadir un registro vacío!!</p>
            `; 
            tabl2.appendChild(listItem);
        }
    
        // Elimina el mensaje automáticamente después de 3 segundos
        setTimeout(() => {
            listItem.remove();
            tabl2.style.display = "none"; // Oculta el contenedor si queda vacío
        }, 1000);
    
    }, 1000);
    

} else { {    try {
    
    const { data } = await axios.post('/api/todos', { nombre: nombre.value , numero: numero.value ,cedula: cedula.value ,costo: costo.value,monto: monto.value });


  const d = [{ nombre: nombre.value , numero: numero.value ,cedula: cedula.value ,costo: costo.value,monto: monto.value }]
    d.forEach(todo => {

        const tabl2 = document.querySelector("#datos")
        const listItem = document.createElement('div');
        listItem.id = data.id; // Usar _id
       
        listItem.innerHTML += `
       
   <div id="p-datos">
           <input class="input-datos" value="${todo.nombre}"></input>
            <input class="input-datos" value="${todo.numero}"></input>
            <input class="input-datos" value="${todo.cedula}"></input>
                      <input class="input-datos" value="${todo.costo}"></input>
              <input class="input-datos" value="${todo.monto}"></input>
            
              
             <div id="config-container">




</button>

</div>
<button id="config-delete"> 
             <script src="https://cdn.lordicon.com/lordicon.js"></script>
<lord-icon
src="https://cdn.lordicon.com/zxvuvcnc.json"
trigger="hover"
style="width:30px;height:30px">
</lord-icon>
</button>

<button id="config">   


<script src="https://cdn.lordicon.com/lordicon.js"></script>
<lord-icon
src="https://cdn.lordicon.com/lomfljuq.json"
trigger="hover"
style="width:30px;height:30px">
</lord-icon>


            </div>

        `; 

        tabl2.appendChild(listItem);
       
    }
  
  
);
document.querySelector('#form').reset();
} catch (error) {
    console.error('Error al agregar tarea:', )}}}

})

        
        document.addEventListener("DOMContentLoaded", () => {
            document.addEventListener("click", async e => {
                if (e.target && (e.target.id === "config-delete" || e.target.closest('#config-delete'))) {
                    e.preventDefault(); // Evita el comportamiento predeterminado del evento
        
                    try {
                        // Obtén y muestra el padre del botón
                        const boton = e.target.closest('#config-delete');
                        const padre = boton.parentElement.parentElement;


                        console.log(padre.id); // Imprime el ID del div padre

                        await axios.delete(`/api/todos/${padre.id}`);
                      padre.remove();
                    } catch (error) {
                        console.error(error);
                    }
                }
            });
        });
        
        
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

ConfiguracionBtn.addEventListener("click", e => {
    window.location.pathname = "/Configuracion"

})

        // validacion de los input que no esten vacios


    

        // detectar si es un movil 
        // 
         function detectarMovil() {
  if (window.innerWidth <= 768) { // Define un ancho típico para móviles
    console.log("Este es un dispositivo móvil");
    // Llama aquí la función exclusiva para móviles
    funcionParaMovil();
  } else {
    
    console.log("No es un dispositivo móvil");
  }
}

function funcionParaMovil() {
  // Código exclusivo para móviles

}

// Ejecuta la detección cuando la página carga
window.onload = detectarMovil;
