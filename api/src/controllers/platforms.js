const PlatformModel = require('../models').platformsModels;
const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const API_URL = `https://api.rawg.io/api/platforms`;
const MAX_RETRIES = 5;


const getPlatforms = async (req, res) => {
    try {
        const platforms = await findPlatforms(MAX_RETRIES);
        if (platforms.length > 0) {
            return res.status(200).json({ "result": platforms });
        }
        return res.status(200).json({ "message": "No hay plataformas en la DB" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

const findPlatforms = async (retryCount) => {
    if (retryCount <= 0) {
        return [];
    }
    const platforms = await PlatformModel.findAll();
    if (platforms.length > 0) {
        return platforms;
    }
    // Esperar 500ms antes de llamar a la función de nuevo
    await new Promise(resolve => setTimeout(resolve, 3000));
    return findPlatforms(retryCount - 1);
};


// const getPlatforms = async (req, res) => {

//     try {
//         const genres = await PlatformModel.findAll();
//         if (genres.length > 0) { return res.status(200).json({ "result": genres }); }
//        // let apiGenres = await axios.get(`${API_URL}?key=${API_KEY}`);
//         //apiGenres = apiGenres.data.results.map(res => { return { id: res.id, name: res.name } })
//         //const PlatformModels = await PlatformModel.bulkCreate(apiGenres);
//         return res.status(200).json({ "message": "No hay platformas en la DB" });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: "Error interno del servidor" });
//     }
// }


module.exports = {
    getPlatforms
}
