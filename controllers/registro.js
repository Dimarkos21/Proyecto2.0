
const registerRouter = require('express').Router();
registerRouter.get("/", async (request, response) => {  
    const ipApiUrl = "https://api.ip2location.io/?key=E5CBE4899CF677C122DD0828C1ACC827";
    const countryApiUrl = "https://restcountries.com/v3.1/all";
    
    // Consulta la IP y luego busca el código telefónico
    fetch(ipApiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la solicitud de IP: ${response.status}`);
            }
            return response.json(); // Datos de la primera API
        })
        .then(ipData => {
            console.log("Datos de IP obtenidos:", ipData);
            
            // Buscar el código de teléfono del país basado en el código del país
            return fetch(countryApiUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error en la solicitud de países: ${response.status}`);
                    }
                    return response.json(); // Datos de la segunda API
                })
                .then(countryData => {
                    const country = countryData.find(c => c.cca2 === ipData.country_code); // Buscar país por el código
                    const phoneCode = country ? `${country.idd.root}${country.idd.suffixes[0]}` : "Código no disponible";
    
                    console.log(`Código telefónico para ${ipData.country_name}: ${phoneCode}`);
                    console.log(`Marca de móvil (mobile_brand): ${ipData.as}`);
                    
                  // combinacion de datos
                    return {
                        ipInfo: ipData,
                        phoneCode: phoneCode,
                    };
                });
        })
        .then(finalData => {
            console.log("Datos combinados:", finalData);
        })
        .catch(error => {
            console.error("Error:", error);
        });
    
});


module.exports = registerRouter;
