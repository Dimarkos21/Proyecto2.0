const HomeBtn = document.querySelector("#Home-btn")
const RegistroBtn = document.querySelector("#Registro-btn")
const contenedor2 = document.querySelector("#contenedor2")
const botonMenu = document.querySelector("#boton-menu")
const RegistroImg = document.querySelector("#Registro-img")
const ProductosBtn = document.querySelector("#producto-btn");
const MensajeBtn = document.querySelector("#mensaje-btn");


const ConfiguracionBtn = document.querySelector("#config-btn");





//estadisticas
async function estadisticas(numero,container , nombre, tipo){

 
  // Carga Google Charts y establece el callback
google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

// Función para dibujar el gráfico
function drawChart() {
var data = google.visualization.arrayToDataTable([
['Mes', nombre],
[tipo,0 ],
[nombre, numero ],

]);

var options = {
title: '',
curveType: 'function',
legend: { position: 'bottom' }
};

var chart = new google.visualization.LineChart(document.querySelector(container));
chart.draw(data, options);
}


}
(async () => {
  try {
      const { data } = await axios.get('/api/todos');
     
      const productos = await axios.get('/api/productos', { headers: { 'Cache-Control': 'no-cache' } }).then(res => res.data);


     const tabla = document.querySelector(".chart");
          const listItem = document.createElement('div');
        
          const clientesD = data.filter(obj => obj.numero).length;
          const productosD = productos.filter(obj => obj.nombre).length;
          const numerosD = data.filter(obj => obj.numero).length;
          const costoD = data.filter(obj => obj.numero);

          const precioD = data.filter(obj => obj.numero);
        
          function calcularSumaCostos(data) {
            // Filtrar los objetos que tienen la propiedad 'costo'
            const objetosConCosto = data.filter(obj => obj.costo);
        
            // Mapear los valores de 'costo' y convertirlos a números
            const valoresCosto = objetosConCosto.map(obj => Number(obj.costo));
        
            // Sumar todos los valores de 'costo' con reduce
            const sumaTotal = valoresCosto.reduce((acumulador, valor) => acumulador + valor, 0);
        
            // Retornar el resultado
            return sumaTotal;
        }
        
        
   const  c =    calcularSumaCostos(costoD)
   const  G =    calcularSumaCostos(costoD) 
   const  t =    calcularSumaCostos(costoD)  +  calcularSumaCostos(precioD)
  estadisticas (clientesD,"#Clientes-s" ,`${clientesD}`, "Clientes")
  estadisticas (numerosD,"#Numeros-s" ,`${numerosD}`,"Numeros")
  estadisticas (c,"#Costes-s",`${c}`,"Costos" )
  estadisticas (G,"#Ganancias-s" , `${G}`, "Ganancias")
  estadisticas (t,"#Total-s", `${t}` , "Total")
  estadisticas (productosD,"#Productos-s", `${productosD}`, "Productos" )
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
  window.location.pathname = "/Mensajes"

})

ConfiguracionBtn.addEventListener("click", e => {
    window.location.pathname = "/Configuracion"

})