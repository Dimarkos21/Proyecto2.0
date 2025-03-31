const usersRouter = require('express').Router();

const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const { PAGE_URL } = require('../config')


usersRouter.get("/", async (request, response) => {  
    const ipApiUrl = "https://api.ip2location.io/?key=E5CBE4899CF677C122DD0828C1ACC827";
    const countryApiUrl = "https://restcountries.com/v3.1/all";

    try {
        // Consulta la IP y datos asociados
        const ipResponse = await fetch(ipApiUrl);
        if (!ipResponse.ok) {
            throw new Error(`Error en la solicitud de IP: ${ipResponse.status}`);
        }
        const ipData = await ipResponse.json();
        console.log("Datos de IP obtenidos:", ipData);

        // Buscar el país y código de teléfono basado en el código de país
        const countryResponse = await fetch(countryApiUrl);
        if (!countryResponse.ok) {
            throw new Error(`Error en la solicitud de países: ${countryResponse.status}`);
        }
        const countryData = await countryResponse.json();
        const country = countryData.find(c => c.cca2 === ipData.country_code); // Filtra el país por el código
        const phoneCode = country ? `${country.idd.root}${country.idd.suffixes[0]}` : "Código no disponible";

        console.log(`Código telefónico para ${ipData.country_name}: ${phoneCode}`);

        // Combinar los datos y enviarlos al cliente
        const finalData = {
          country: country,
            phoneCode: phoneCode,
        };
        return response.status(200).json(finalData); // Enviar los datos al cliente en formato JSON
    } catch (error) {
        console.error("Error:", error.message);
        return response.status(500).json({ error: "Ocurrió un error en el servidor.", detalle: error.message });
    }
});



usersRouter.post('/', async (request, response) => {

    const { name,  email, negocio, numero, password } = request.body;

    if (!name || !email || !negocio || !numero|| !password) {
        return response.status(400).json({error: 'Todos los espacios son requeridos'})
    }

    //validacion que el usuario ya existe.
    const userExist = await User.findOne({ email });

    if (userExist) {
        return response.status(400).json({ error: 'El email ya está registrado.' })
    }

    const saltRounds = 10;

    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = new User ({
        name, 
         email, 
         negocio,
          numero,
        passwordHash,
    });

    const savedUser = await newUser.save();
    console.log("Correo del destinatario:", savedUser.email);

    const token = jwt.sign({ id: savedUser.id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1m'
    });

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, //true for port 465, false for other ports
        auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: savedUser.email,
        subject: 'verificacion de usuario',
        text: "Hello world",
        html: `<a href="${PAGE_URL}/verify/${savedUser.id}/${token}">Verificar correo</a>`,
    })
    console.log("PAGE_URL:", PAGE_URL);


    return response.status(201).json('Usuario creado. Por favor verifica tu correo');

});


usersRouter.patch('/:id/:token', async (request, response) => {
    try {
        const token = request.params.token;
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const id = decodedToken.id;
        await User.findByIdAndUpdate(id, { verified: true });
        return response.sendStatus(200);
    } catch (error) {
        const id = request.params.id;
        const { email } = await User.findById(id); //aaa
        const token = jwt.sign({ id: id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '1d'
        });
    
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, //true for port 465, false for other ports
            auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        });
    
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'verificacion de usuario',
            text: "Hello world",
            html: `<a href="${PAGE_URL}/verify/${id}/${token}">Verificar correo</a>`,
        })


        return response.status(400).json({ error: 'El link ya expiró. Se ha enviado un nuevo link de verificacion a su correo.' })
    }
    
});


module.exports = usersRouter;