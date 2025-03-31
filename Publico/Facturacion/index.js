// valores
const Cliente =document.querySelector("#Cliente")
const Cedula =document.querySelector("#Cedula")
const Productos  =document.querySelector("#Productos")

const  Moneda =document.querySelector("#Moneda")
const Metodo =document.querySelector("#Metodo")
const Precio =document.querySelector("#Precio")

// input valor significativo

const Imagen = document.querySelector("#Imagen")
// demas elementos
const form = document.querySelector("#formulario")
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
// cargar las tareas 

(async () => {
    try {
        // Hacer la solicitud al servidor para obtener los productos
        const { data } = await axios.get('/api/facturacion');

        // Iterar sobre los productos recibidos
        data.forEach(todo => {
            const tabla = document.querySelector("#datos");
            const listItem = document.createElement('div');
            
            // Usar el atributo _id si es el campo que envía el servidor
            listItem.id = todo._id ;
           // Verificar el ID asignado
            

            listItem.innerHTML += `
        <div id="p-datos">

            <input class="input-datos" value="${todo.cliente || 'Sin nombre'}" readonly></input>
    
            <input class="input-datos" value="${todo.factura || 0}" readonly></input>
                    <input class="input-datos" value="${todo.fecha || 0}" readonly></input>
                              

        
      
            
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
        // Formulario

      // Cargar las tareas desde el servidor cuando se inicia la aplicación
let numeroFactura = 0




form.addEventListener("submit", async (e) => {
    e.preventDefault();

numeroFactura = 0

    

    try {


        if ( Moneda.value === "Bolivar"){
            const bolivarBCV = await fetch('https://ve.dolarapi.com/v1/dolares/oficial');
            const Bcv = await bolivarBCV.json(); // Convertimos la respuesta a JSON
            console.log(Bcv.promedio); // Mostramos los datos
            const ConversionBolivaresaDolares = (  await Precio.value  /  Bcv.promedio).toFixed(2) +"$"
            let numeroFactura = 1; // Inicializa la primera factura

function generarFactura() {
    const factura = `FACT-${String(numeroFactura).padStart(6, '0')}`; // Formato FACT-000001
    numeroFactura++; // Incrementa el número
    return factura;
}

//function generateQR() {
    const text = document.getElementById("textInput").value;
    const image = document.getElementById("imageInput").files[0];
    const qrCodeContainer = document.getElementById("qrcode");

    // Concatenar texto con numeración
    const uniqueID = Date.now(); // Ejemplo de numeración única
    const qrContent = `${text} | ID: ${uniqueID}`;

    // Limpiar QR previo
    qrCodeContainer.innerHTML = "";

    // Generar QR con texto y numeración
    new QRCode(qrCodeContainer, {
        text: qrContent,
        width: 128,
        height: 128
    });

    // Mostrar imagen asociada
    if (image) {
        const imgElement = document.createElement("img");
        imgElement.src = URL.createObjectURL(image);
        qrCodeContainer.appendChild(imgElement);
    }
//}
            const aleatorio = Math.random().toString(36).substr(2, 5).toUpperCase(); // Código aleatorio
            console.log(generarFactura())
            const { data } = await axios.post('/api/facturacion', { 
                cliente: Cliente.value, 
                cedula: Cedula.value, 
                productos: Productos.value, 
                moneda: Moneda.value, 
                metodo: Metodo.value, 
                factura: generarFactura(),
                conversion: ConversionBolivaresaDolares,
                tasa: Bcv.promedio ,
            
                  
                precio: Precio.value, 
               

              
                fecha: crearFechaActual() 
            });

                    // Mostrar la respuesta directamente
        console.log("Respuesta del servidor:", data);
        

    
        
        // Actualiza la lista de productos y limpia el formulario
        setTimeout(async () => {
          
          
            // Buscar el producto con el ID guardado
            const nuevoProducto = data
            console.log(nuevoProducto);
            if (true) {
                
                const existente = document.getElementById(nuevoProducto._id);
    
                if (true) {
                    const productoElemento = document.createElement("div");
                    productoElemento.id = nuevoProducto._id;

                    productoElemento.innerHTML = `
                        <div id="p-datos">
                            <input class="input-datos" value="${nuevoProducto.cliente || 'Sin nombre'}" readonly></input>

                                                   <input class="input-datos" value="${nuevoProducto.factura || 'Sin nombre'}" readonly></input>
                                                          <input class="input-datos" value="${nuevoProducto.fecha || 'Sin nombre'}" readonly></input>
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
        }
        if ( Moneda.value === "Dolar"){
            const bolivarBCV = await fetch('https://ve.dolarapi.com/v1/dolares/oficial');
            const Bcv = await bolivarBCV.json(); // Convertimos la respuesta a JSON
            console.log(Bcv.promedio); // Mostramos los datos
            const ConversionBolivaresaDolares =  (await Bcv.promedio * Precio.value).toFixed(2) +"bs"
            let numeroFactura = 1; // Inicializa la primera factura

function generarFactura() {
    const factura = `FACT-${String(numeroFactura).padStart(6, '0')}`; // Formato FACT-000001
    numeroFactura++; // Incrementa el número
    return factura;
}
            const aleatorio = Math.random().toString(36).substr(2, 5).toUpperCase(); // Código aleatorio
            console.log(generarFactura())
            const { data } = await axios.post('/api/facturacion', { 
                cliente: Cliente.value, 
                cedula: Cedula.value, 
                productos: Productos.value, 
                moneda: Moneda.value, 
                metodo: Metodo.value, 
                factura: generarFactura(),
                conversion: ConversionBolivaresaDolares,
                tasa: Bcv.promedio ,
                precio: Precio.value, 
               

              
                fecha: crearFechaActual() 
            });

                    // Mostrar la respuesta directamente
        console.log("Respuesta del servidor:", data);
        

    
        
        // Actualiza la lista de productos y limpia el formulario
        setTimeout(async () => {
          
          
            // Buscar el producto con el ID guardado
            const nuevoProducto = data
            console.log(nuevoProducto);
            if (true) {
                
                const existente = document.getElementById(nuevoProducto._id);
    
                if (true) {
                    const productoElemento = document.createElement("div");
                    productoElemento.id = nuevoProducto._id;

                    productoElemento.innerHTML = `
                        <div id="p-datos">
                            <input class="input-datos" value="${nuevoProducto.cliente || 'Sin nombre'}" readonly></input>

                                                   <input class="input-datos" value="${nuevoProducto.factura || 'Sin nombre'}" readonly></input>
                                                          <input class="input-datos" value="${nuevoProducto.fecha || 'Sin nombre'}" readonly></input>
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
        } else {
            const { data } = await axios.post('/api/facturacion', { 
                cliente: Cliente.value, 
                cedula: Cedula.value, 
                productos: Productos.value, 
                moneda: Moneda.value, 
                metodo: Metodo.value, 
                precio: Precio.value, 
                fecha: crearFechaActual() 
            });

                    // Mostrar la respuesta directamente
        console.log("Respuesta del servidor:", data);
        

    
        
        // Actualiza la lista de productos y limpia el formulario
        setTimeout(async () => {
          
          
            // Buscar el producto con el ID guardado
            const nuevoProducto = data
            console.log(nuevoProducto);
            if (true) {
                
                const existente = document.getElementById(nuevoProducto._id);
    
                if (true) {
                    const productoElemento = document.createElement("div");
                    productoElemento.id = nuevoProducto._id;

                    productoElemento.innerHTML = `
                        <div id="p-datos">
                            <input class="input-datos" value="${nuevoProducto.cliente || 'Sin nombre'}" readonly></input>
                            <input class="input-datos" value="${nuevoProducto.cedula || 0}" readonly></input>
                            <input class="input-datos" value="${nuevoProducto.productos|| 0}" readonly></input>
                                       <input class="input-datos" value="${nuevoProducto.moneda|| 0}" readonly></input>
                                                  <input class="input-datos" value="${nuevoProducto.metodo|| 0}" readonly></input>
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
        }
      
        

    } catch (error) {
        console.error("Error al guardar los productos:", error);
    }
});


const infoBtn = document.querySelector("#info");
const containerMas = document.querySelector(".container-mas");

document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("click", async (e) => {
        if (e.target.closest("#info")) {
            const boton = e.target.closest("#info");
            const { data } = await axios.get("/api/facturacion");
            const productos = Array.isArray(data) ? data : [data];
            const padre = boton.parentElement.parentElement.parentElement;

            if (!padre.classList.contains("container-mas")) {
                const productoSeleccionado = productos.find(producto => producto._id === padre.id);

                if (productoSeleccionado) {
                    padre.classList.add("container-mas");
                    padre.style.maxHeight = "500rem";
                    padre.style.overflow = "visible";
                    padre.style.transition = "max-height 0.5s ease-out";

                    padre.innerHTML = `
                        <div id=""><img src=""></div>
                        <div id="descripcion">      
                            <p>Numero:</p>
                            <input class="input-datos" value="${productoSeleccionado.factura || 0}">
                            <p>Cliente:</p>
                            <input class="input-datos" value="${productoSeleccionado.cliente || 'Sin nombre'}">
                            <p>Cedula:</p>
                            <input class="input-datos" value="${productoSeleccionado.cedula || 0}">
                            <p>Metodo:</p>
                            <input class="input-datos" value="${productoSeleccionado.metodo || 0}">
                            <p>Moneda:</p>
                            <input class="input-datos" value="${productoSeleccionado.moneda || 0}">
                            <p>Precio:</p>
                            <input class="input-datos" value="${productoSeleccionado.precio || 0}">
                            <p>Conversion:</p>
                            <input class="input-datos" value="${productoSeleccionado.conversion || 0}">
                            <p>Fecha:</p>
                            <p>${productoSeleccionado.fecha || 'Sin fecha'}</p>
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
                            <div id="container-pdf">  
                                <button id="pdf"><img src="../img/pdf.svg"></button>
                            </div>
                        </div>
                    `;

                    const pdfBoton = document.querySelector("#pdf");
                    pdfBoton.addEventListener("click", async () => {
                        const { jsPDF } = window.jspdf;
                        const doc = new jsPDF();
                        const logo = 'https://th.bing.com/th/id/OIP.jleFhbOD3BG8h1PeUIGdNAHaE8?rs=1&pid=ImgDetMain';
                        doc.addImage(logo, 'PNG', 10, 10, 40, 30);
                        doc.setFontSize(20);
                        doc.setFont("helvetica", "bold");
                        doc.text("FACTURA DE VENTA", 105, 25, { align: "center" });
                        doc.setDrawColor(0, 0, 0);
                        doc.line(10, 40, 200, 40);
                        doc.setFont("helvetica", "bold");
                        doc.setFontSize(12);
                        doc.text("Datos del Cliente:", 10, 50);
                        const clienteDatos = [
                            { label: "Número de Factura", value: productoSeleccionado.factura || "Sin número", y: 55 },
                            { label: "Cliente", value: productoSeleccionado.cliente || "Sin nombre", y: 60 },
                            { label: "Cédula", value: productoSeleccionado.cedula || "N/A", y: 65 },
                            { label: "Método de Pago", value: productoSeleccionado.metodo || "N/A", y: 70 },
                            { label: "Moneda", value: productoSeleccionado.moneda || "N/A", y: 75 },
                            { label: "Precio Total", value: `$${productoSeleccionado.precio || "0.00"}`, y: 80 },
                            { label: "Conversión", value: productoSeleccionado.conversion || "N/A", y: 85 },
                            { label: "Fecha", value: productoSeleccionado.fecha || "Sin fecha", y: 90 }
                        ];
                        clienteDatos.forEach(dato => {
                            doc.setFont("helvetica", "normal");
                            doc.text(`${dato.label}: ${dato.value}`, 10, dato.y);
                        });
                        doc.line(10, 95, 200, 95);
                        doc.setFont("helvetica", "bold");
                        doc.setFontSize(12);
                        doc.text("Detalles de la Compra", 10, 105);
                        doc.setFont("helvetica", "normal");
                        doc.setFontSize(10);
                        doc.text("Cant.", 10, 115);
                        doc.text("Descripción", 40, 115);
                        doc.text("Abono", 120, 115);
                        doc.text("Resta", 150, 115);
                        doc.text("Total", 180, 115);
                        const productosDetalles = productoSeleccionado.items || [];
                        let yPosition = 120;
                        productosDetalles.forEach(item => {
                            doc.text(`${item.cantidad || "N/A"}`, 10, yPosition);
                            doc.text(`${item.descripcion || "Producto"}`, 40, yPosition);
                            doc.text(`$${item.abono || "0.00"}`, 120, yPosition);
                            doc.text(`$${item.resta || "0.00"}`, 150, yPosition);
                            doc.text(`$${item.total || "0.00"}`, 180, yPosition);
                            yPosition += 10;
                        });
                        doc.setFont("helvetica", "bold");
                        doc.setFontSize(12);
                        yPosition += 10;
                        doc.text("Observaciones:", 10, yPosition);
                        doc.setFont("helvetica", "normal");
                        doc.setFontSize(10);
                        doc.text(`${productoSeleccionado.observaciones || "Ninguna"}`, 10, yPosition + 5);
                        yPosition += 20;
                        doc.setFont("helvetica", "bold");
                        doc.text("TOTAL A PAGAR:", 10, yPosition);
                        doc.setFont("helvetica", "normal");
                        doc.text(`$${productoSeleccionado.total || "0.00"}`, 50, yPosition);
                        doc.text("Firma Cliente:", 10, yPosition + 10);
                        doc.line(50, yPosition + 10, 120, yPosition + 10);
                        doc.save("factura.pdf");
                    });
                }
            } else {
                const productoActual = productos.find(producto => producto._id === padre.id);
                padre.classList.remove("container-mas");
                if (productoActual) {
                    padre.innerHTML = `
                        <div id="p-datos">
                            <input class="input-datos" value="${productoActual.cliente || 'Sin nombre'}" readonly></input>
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
    document.addEventListener("click", async e => {
        if (e.target && (e.target.id === "config-delete" || e.target.closest('#config-delete'))) {
            e.preventDefault(); // Evita el comportamiento predeterminado del evento

            try {
                // Obtén y muestra el padre del botón
                const boton = e.target.closest('#config-delete');
                const padre = boton.parentElement.parentElement;


                console.log(padre.id); // Imprime el ID del div padre

            await axios.delete(`/api/facturacion/${padre.id}`);
            console.log(padre.id)
              padre.remove();
            } catch (error) {
                console.log(error);
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
  window.location.pathname = "/Ventas"

})

ConfiguracionBtn.addEventListener("click", e => {
    window.location.pathname = "/Configuracion"

})
      
            

            