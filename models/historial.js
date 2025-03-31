const mongoose = require('mongoose');

const HistorialSchema = new mongoose.Schema({
    
proveniente: String,
    estado: String ,
  fecha: String ,
    checked: Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Relación con el usuario
    }
});

module.exports = mongoose.model('Producto', productoSchema);
