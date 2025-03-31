const facturacionRouter = require('express').Router(); // Router sigue siendo adecuado
const user = require('../models/user'); // Cambié "user" a "User" para que represente mejor el modelo
const facturacionModel = require('../models/facturacion1'); // Cambié "Producto" a "ProductosModel" para reflejar que es un modelo
const mongoose = require('mongoose');




// Ruta para manejar las solicitudes POST a /api/productos
facturacionRouter.post("/", async (request, response) => {
    try {
        // Extraer los datos del cuerpo de la solicitud
        const {
            cliente,
            productos,
            cedula,
            metodo,
            moneda,
            precio,
            conversion,
            tasa,
            factura,
            fecha,
        } = request.body;

        // Verificar que los datos esenciales no estén vacíos
        if (!cliente ||!productos  || !factura || !cedula || !metodo || !moneda || !precio || !fecha) {
            return response.status(400).json({ error: "Todos los campos son obligatorios." });
        }

        // Crear una nueva instancia del modelo Facturación
        const nuevoProducto = new facturacionModel({
            cliente,
            productos,
            cedula,
            metodo,
            moneda,
            precio,
            conversion,
            tasa,
            factura,
            fecha,
            checked: false,
            user: request.user ? request.user._id : null, // Usuario autenticado (si existe)
        });

        // Guardar el producto en la base de datos
        const productoGuardado = await nuevoProducto.save();

        console.log("Producto guardado correctamente:", productoGuardado);
        return response.status(201).json(productoGuardado); // Respuesta de éxito
    } catch (error) {
        console.error("Error al guardar el producto:", error);
        return response.status(500).json({
            error: "Ocurrió un error en el servidor.",
            detalle: error.message,
        });
    }
});





// Ruta para manejar las solicitudes GET a /api/productos
facturacionRouter.get("/", async (request, response) => {
    try {
              const facturacion= await facturacionModel.find({});
    const facturacion2 =     facturacion.map(producto => ({
            ...producto.toObject()  }))

        response.json(facturacion2);
    } catch (error) {
        response.status(500).json({ error: 'An error occurred' });
    }
});
// Ruta para manejar las solicitudes DELETE a /api/productos/:id



facturacionRouter.patch("/:id", async (request,response)=> {

})





facturacionRouter.delete("/:id", async (request, response) => {
    try {
        const user = request.user; // Usuario autenticado
        if (!user) {
            return response.status(401).json({ error: "Usuario no autenticado" });
        }

        const facturacionId = request.params.id;
        if (!mongoose.Types.ObjectId.isValid(facturacionId)) {
            return response.status(400).json({ error: "ID inválido" });
        }

        const factura = await facturacionModel.findById(facturacionId);
        if (!factura) {
            return response.status(404).json({ error: "Factura no encontrada" });
        }

        if (!factura.user || !user._id || factura.user.toString() !== user._id.toString()) {
            return response.status(403).json({ error: "No autorizado para eliminar esta factura" });
        }

        await facturacionModel.findByIdAndDelete(facturacionId);
        console.log("Factura eliminada correctamente");
        return response.status(204).end();
    } catch (error) {
        console.error("Error al eliminar la factura:", error);
        return response.status(500).json({ error: "Ocurrió un error en el servidor" });
    }
});



module.exports = facturacionRouter;
