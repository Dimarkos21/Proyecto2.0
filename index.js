const app = require('./app');
const http = require('http');


const server = http.createServer(app);

server.listen(3003, () => {
    console.log('El servidor esta corriendo');
});

app.post('/api/mensaje', (req, res) => {
    const { to, message } = req.body; // Recoge los datos del mensaje del cuerpo de la petición
    client.sendMessage(to, message) // Usa el cliente de WhatsApp para enviar un mensaje
        .then(() => res.status(200).send('Mensaje enviado.'))
        .catch(err => res.status(500).send(`Error: ${err}`));
});