const mongoose = require('mongoose');

const mensajeSchema = new mongoose.Schema({
   token: String ,
    checked: Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

mensajeSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const Mensaje = mongoose.models.Mensaje || mongoose.model('Mensaje', mensajeSchema);

module.exports = Mensaje;
