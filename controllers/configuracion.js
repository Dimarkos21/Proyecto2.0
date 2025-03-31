const user = require('../models/user');
const configuracionRouter = require('express').Router();
configuracionRouter.get("/" , async (request, response)=>{
 try{   const user = request.user;

response.json([user.name,user.email, user.numero , user.negocio])
 }
    catch(error){console.log(error)}
})

module.exports = configuracionRouter;