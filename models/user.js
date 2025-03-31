const mongoose = require('mongoose');
const Facturacion = require('./facturacion1');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    negocio: String,
    numero: String,
    passwordHash: String,
    verified: {
        type: Boolean,
        default: false
    },
    todos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Todo"
    }],
    productos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Producto"
    }],
    Facturacion: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "facturacions"
    }]
       
});

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;