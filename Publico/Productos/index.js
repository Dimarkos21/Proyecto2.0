// bton de actualizado
const config = document.querySelector("#config")


// input valor significativo
const Nombre = document.querySelector("#Nombre")

const Costo = document.querySelector("#Costo")

const Cantidad = document.querySelector("#Cantidad")
const Precio = document.querySelector("#Precio")
const Imagen = document.querySelector("#Imagen")
// demas elementos
const form = document.querySelector("#form")
const contenedor2 = document.querySelector("#contenedor2");
const botonMenu = document.querySelector("#boton-menu");
const datos1 = document.querySelector("#datos1");
const HomeBtn = document.querySelector("#Home-btn");
const RegistroBtn = document.querySelector("#Registro-btn");
const MensajeBtn = document.querySelector("#mensaje-btn");
const boton = document.querySelector("#boton");
const datos = document.querySelector("#datos");
const configDelete = document.querySelector("#config-delete");
const ProductosBtn = document.querySelector("#producto-btn");
// Boton de informacion

const ConfiguracionBtn = document.querySelector("#config-btn");

// Obtener la fecha 
function crearFechaActual() {
    const fecha = new Date(); // Crea una instancia de la fecha actual

    // Obtén los componentes
    const dia = fecha.getDate().toString().padStart(2, '0'); // Día (2 dígitos)
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Mes (0 indexado, +1 para corregir)
    const año = fecha.getFullYear(); // Año completo (ej: 2025)

    // Formatear como "dd/mm/yyyy"
    return `${dia}/${mes}/${año}`;
}

// Ejemplo de uso
const fechaCreacion = crearFechaActual();
console.log("Fecha creada:", fechaCreacion);

// Agregar Producto CON LO QUE ESTA EN MONGO


(async () => {
    try {
        // Hacer la solicitud al servidor para obtener los productos
        const { data } = await axios.get('/api/productos');

        // Iterar sobre los productos recibidos
        data.forEach(todo => {
            const tabla = document.querySelector("#datos");
            const listItem = document.createElement('div');
            
            // Usar el atributo _id si es el campo que envía el servidor
            listItem.id = todo._id ;
           // Verificar el ID asignado
            

            listItem.innerHTML += `
        <div id="p-datos">

            <input class="input-datos" value="${todo.nombre || 'Sin nombre'}" readonly></input>
            <input class="input-datos" value="${todo.cantidad || 0}" readonly></input>
            <input class="input-datos" value="${todo.costo || 0}" readonly></input>
            <input class="input-datos" value="${todo.precio || 0}" readonly></input>
                   

        
      
            
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

                  <div id="config-container">
            <button id="info"><script src="https://cdn.lordicon.com/lordicon.js"></script>
<lord-icon
    src="https://cdn.lordicon.com/fikcyfpp.json"
    trigger="hover"
    style="width:30px;height:30px">
</lord-icon>
</button>
</div>
        </div>
    `;

            tabla.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error al cargar los productos:', error);
        window.location.pathname = '/login';
    }
})();








// Cargar las tareas desde el servidor cuando se inicia la aplicación

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nombre", Nombre.value);
    formData.append("cantidad", Cantidad.value);
    formData.append("costo", Costo.value);
    formData.append("precio", Precio.value);
    formData.append("fecha", crearFechaActual());

    // Solo adjunta la imagen si se seleccionó una
    if (Imagen.files[0]) {
        formData.append("imagen", Imagen.files[0]);
    }

    try {
        const { data } = await axios.post('/api/productos', formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        console.log("Respuesta del servidor:", data);

        // Actualiza la lista de productos y limpia el formulario
        setTimeout(async () => {
            const { data } = await axios.get("/api/productos");
            const productos = Array.isArray(data) ? data : [data];
            console.log(productos);

            const nuevoProducto = productos.find(producto => producto.id === data.id);
            console.log(nuevoProducto)
            if (true) {
                
                const existente = document.getElementById(nuevoProducto._id);
           console.log(1)
                if (true) {
                    const productoElemento = document.createElement("div");
                    productoElemento.id = nuevoProducto._id;

                    productoElemento.innerHTML = `
                        <div id="p-datos">
                            <input class="input-datos"  value="${nuevoProducto.nombre || 'Sin nombre'}" readonly></input>
                            <input class="input-datos" value="${nuevoProducto.cantidad || 0}" readonly></input>
                            <input class="input-datos" value="${nuevoProducto.costo || 0}" readonly></input>
                            <input class="input-datos" value="${nuevoProducto.precio || 0}" readonly></input>
                            <button id="config-delete">
                                <lord-icon src="https://cdn.lordicon.com/zxvuvcnc.json" trigger="hover" style="width:30px;height:30px"></lord-icon>
                            </button>
                            <button id="config">
                                <lord-icon src="https://cdn.lordicon.com/lomfljuq.json" trigger="hover" style="width:30px;height:30px"></lord-icon>
                            </button>
                            <div id="config-container">
                                <button id="info">
                                    <lord-icon src="https://cdn.lordicon.com/fikcyfpp.json" trigger="hover" style="width:30px;height:30px"></lord-icon>
                                </button>
                            </div>
                        </div>
                    `;

                    document.querySelector("#datos").appendChild(productoElemento);
                }
            }
        }, 100);

        form.reset();
    } catch (error) {
        console.error("Error al guardar los productos:", error);
    }
});


const infoBtn = document.querySelector("#info");
const containerMas = document.querySelector(".container-mas");

document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("click", async (e) => {
        if (e.target.closest("#info")) {
           console.log(1)
            const boton = e.target.closest("#info");

            // Obtener los datos del producto
            const { data } = await axios.get("/api/productos");
            const productos = Array.isArray(data) ? data : [data];

            // Identificar el div padre seleccionado
            const padre = boton.parentElement.parentElement.parentElement; // Selecciona el div exacto
         

            if (!padre.classList.contains("container-mas")) {
                // Filtrar el producto que NO corresponde al div seleccionado (para agregar contenido)
                const productoSeleccionado = productos.find(producto => producto._id === padre.id);

                if (productoSeleccionado) {
                    padre.classList.add("container-mas"); // Añadir la clase
                    padre.style.maxHeight = "500rem"; // Ajusta el tamaño máximo según el contenido
                    padre.style.overflow = "visible"; // Asegúrate de que el contenido sea visible
                    padre.style.transition = "max-height 0.5s ease-out"; // Animación suave

                    // Actualizar el contenido del div seleccionado
                    padre.innerHTML = `
                        <div id="foto">
                            <p id="p-Producto">Producto</p>
                            <img id="imagen" src="${productoSeleccionado.imagen}" alt="Imagen del producto">
                        </div>
                        <div id="descripcion">      
                            <p>Nombre:</p>
                            <input class="input-datos"  id="NombreActualizado"value="${productoSeleccionado.nombre || 'Sin nombre'}" ></input>
                            <p>Cantidad:</p>
                            <input class="input-datos" id="CantidadActualizado" value="${productoSeleccionado.cantidad || 0}" ></input>
                            <p>Costo:</p>
                            <input class="input-datos"  id="CostoActualizado" value="${productoSeleccionado.costo || 0}" ></input>
                            <p>Precio:</p>
                            <input class="input-datos" id="PrecioActualizado" value="${productoSeleccionado.precio || 0}" ></input>
                            <p>Fecha:</p>
                            <p>${productoSeleccionado.fecha || 'Sin fecha'} </p>
                        </div>

                             <div id="container-boton">
                            <button id="config-delete">
                                <lord-icon src="https://cdn.lordicon.com/zxvuvcnc.json" trigger="hover" style="width:30px;height:30px"></lord-icon>
                            </button>
                            <button id="config">
                                <lord-icon src="https://cdn.lordicon.com/lomfljuq.json" trigger="hover" style="width:30px;height:30px"></lord-icon>
                            </button>
                            <div id="config-container">
                                <button id="info">
                                    <lord-icon src="https://cdn.lordicon.com/fikcyfpp.json" trigger="hover" style="width:30px;height:30px"></lord-icon>
                                </button>
                            </div>
                        </div>
                   `;
                }
            } else {
                // Si ya tiene la clase container-mas, agregar más detalles o editar el contenido y filtarr
                const productoActual = productos.find(producto => producto._id === padre.id);
padre.classList.remove("container-mas")
                if (productoActual) {
                    padre.innerHTML = `
                        <div id="p-datos">
                            <input class="input-datos" value="${productoActual.nombre || 'Sin nombre'}" readonly></input>
                            <input class="input-datos" value="${productoActual.cantidad || 0}" readonly></input>
                            <input class="input-datos" value="${productoActual.costo || 0}" readonly></input>
                            <input class="input-datos" value="${productoActual.precio || 0}" readonly></input>
                            <button id="config-delete">
                                <lord-icon src="https://cdn.lordicon.com/zxvuvcnc.json" trigger="hover" style="width:30px;height:30px"></lord-icon>
                            </button>
                            <button id="config">
                                <lord-icon src="https://cdn.lordicon.com/lomfljuq.json" trigger="hover" style="width:30px;height:30px"></lord-icon>
                            </button>
                            <div id="config-container">
                                <button id="info">
                                    <lord-icon src="https://cdn.lordicon.com/fikcyfpp.json" trigger="hover" style="width:30px;height:30px"></lord-icon>
                                </button>
                            </div>
                        </div>`;
                }
            }
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("click", async (e) => {
        if (e.target.closest("#config"))  {
          

try {
       // Obtén y muestra el padre del botón
       const boton = e.target.closest('#config-delete');
       const padre = c.parentElement.parentElement;


       console.log(padre.id); // Imprime el ID del div padre

       const   NombreActualizado = document.querySelector("#NombreActualizado")
       const  CantidadActualizado = document.querySelector("#CantidadActualizado")
       const   CostoActualizado = document.querySelector("#CostoActualizado")
       const  PrecioActualizado = document.querySelector("#PrecioActualizado")
    
     
      
       console.log(NombreActualizado.value)

       const actualizacion =   [{nombreActualizado: `${NombreActualizado.value}`,
        cantidadActualizado: `${CantidadActualizado.value}`,
        costoActualizado: `${ CostoActualizado.value}`,
     precioActualizado: `${PrecioActualizado.value}`,
       }]
  
   await axios.patch(`/api/productos/${padre.id}`, actualizacion);


} catch (error){console.log(error)}

        }
    });
});



   // eliminar productos  
   // 
   document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("click", async e => {
        if (e.target && (e.target.id === "config-delete" || e.target.closest('#config-delete'))) {
            e.preventDefault(); // Evita el comportamiento predeterminado del evento

            try {
                // Obtén y muestra el padre del botón
                const boton = e.target.closest('#config-delete');
                const padre = config.parentElement.parentElement;


                console.log(padre.id); // Imprime el ID del div padre

            await axios.delete(`/api/productos/${padre.id}`);
              padre.remove();
            } catch (error) {
                console.log(error);
            }
        }
    });
});



       

          // menu desplegable 
         
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

ConfiguracionBtn.addEventListener("click", e => {
    window.location.pathname = "/Configuracion"

})
      
            

            