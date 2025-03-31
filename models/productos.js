const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    nombre: String,
    cantidad: String,
    
    costo: String,
    precio: String,
    fecha: String,
    imagen: {
        data: Buffer, // Almacena los datos binarios
        contentType: String // Almacena el tipo de archivo (por ejemplo: "image/jpeg")
    },
    checked: Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Relación con el usuario
    }
});

module.exports = mongoose.model('Producto', productoSchema);
