const productosRouter = require('express').Router(); // Router sigue siendo adecuado
const user = require('../models/user'); // Cambié "user" a "User" para que represente mejor el modelo
const ProductosModel = require('../models/productos'); // Cambié "Producto" a "ProductosModel" para reflejar que es un modelo
const mongoose = require('mongoose');
const multer = require("multer");
const path = require("path");

// Configuración de Multer
const storage = multer.memoryStorage(); // Si quieres guardar la imagen en MongoDB como Buffer
const upload = multer({ storage }); // Crea una instancia de Multer

// Ruta para manejar las solicitudes POST a /api/productos
productosRouter.post("/", upload.single("imagen"), async (request, response) => {
    try {
        const { nombre, cantidad, costo, precio, fecha } = request.body;

        const nuevoProducto = new ProductosModel({
            nombre,
            cantidad,
            costo,
            precio,
            fecha,
            imagen: request.file ? {
                data: request.file.buffer,
                contentType: request.file.mimetype
            } : null, // Si no hay imagen, establec el valor como null
            checked: false,
            user: request.user ? request.user._id : null, // Si hay usuario autenticado
        });

        const productoGuardado = await nuevoProducto.save();
        console.log("Producto guardado correctamente:", productoGuardado);
        return response.status(201).json(productoGuardado);
    } catch (error) {
        console.error("Error al guardar el producto:", error);
        return response.status(500).json({ error: "Ocurrió un error en el servidor.", detalle: error.message });
    }
});




// Ruta para manejar las solicitudes GET a /api/productos
productosRouter.get("/", async (request, response) => {
    try {
        const productos = await ProductosModel.find({});

        // Transformar cada producto para incluir la imagen en formato Base64
        const productosConImagen = productos.map(producto => ({
            ...producto.toObject(), // Convierte el documento Mongoose a un objeto plano
            imagen: producto.imagen.data 
                ? `data:${producto.imagen.contentType};base64,${producto.imagen.data.toString('base64')}` 
                : null // Si no hay imagen, devuelve null
        }));

        response.json(productosConImagen);
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        response.status(500).json({ error: 'Ocurrió un error al obtener los productos' });
    }
});

// Ruta para manejar las solicitudes DELETE a /api/productos/:id

// Ruta para manejar las solicitudes DELETE a /api/productos/:id
productosRouter.delete("/:id", async (request, response) => {  
    try {
        const user = request.user; // Usuario autenticado
        if (!user) {
            return response.status(401).json({ error: 'Usuario no autenticado' });
        }

        const productoId = request.params.id; // ID del producto a eliminar
        console.log('ID del producto a eliminar:', productoId); // Log del ID

        // Buscar el producto en la base de datos
        const producto = await ProductosModel.findById(productoId);
        console.log(user)
        if (!producto) {
            console.log('Producto no encontrado'); // Log si no existe
            return response.status(404).json({ error: 'Producto no encontrado' });
        }

        // Verificar que el usuario sea el dueño del producto
        if (producto.user.toString() !== user._id.toString()) {
            return response.status(401).json({ error: 'No autorizado para eliminar este producto' });
        }

        // Eliminar el producto de la base de datos
        await ProductosModel.findByIdAndDelete(productoId);

        // Actualizar la lista de productos del usuario
  
        await user.save();

        console.log('Producto eliminado correctamente'); // Log exitoso
        return response.status(204).end(); // Respuesta exitosa sin contenido
    } catch (error) {
        console.error('Error al eliminar el producto:', error); // Log del error
        return response.status(500).json({ error: 'Ocurrió un error' });
    }
});

productosRouter.patch("/:id", async (request,response)=> {
try {


    const user = request.user; // Usuario autenticado
    if (!user) {
        return response.status(401).json({ error: 'Usuario no autenticado' });
    }

    const productoId =  request.params.id; // ID del producto a eliminar
    console.log('ID del producto a eliminar:', productoId); // Log del ID

    // Buscar el producto en la base de datos
    await ProductosModel.findByIdAndUpdate(productoId , { nombre: `${d}` });
    const producto = await ProductosModel.findById(productoId);
    console.log(user)
} catch (error){
    console.log(error)

 
    if (!producto) { 
        console.log('Producto no encontrado'); // si no existe
        return response.status(404).json({ error: 'Producto no encontrado' });
    }
}
})





module.exports = productosRouter;
