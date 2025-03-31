const mongoose = require('mongoose');

const FacturacionSchema = new mongoose.Schema({
    cliente: String,
    productos: String,
    cedula: String,
    metodo: String,
    moneda: String,
    precio: String,
    conversion: String,
    tasa: String,
    factura: String,
  

    fecha: String,

    checked: Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Relación con el usuario
    }
});

module.exports = mongoose.model('facturacion', FacturacionSchema);
