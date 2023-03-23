const PlatformModel = require('../models').platformsModels;


//const PlatformModel = require('../models').platformModels
const axios = require('axios');


require('dotenv').config();

const { API_KEY } = process.env;
const API_URL = `https://api.rawg.io/api/platforms`;


const getPlatforms = async (req, res) => {

    try {
        const genres = await PlatformModel.findAll();
        if (genres.length > 0) { return res.status(200).json({ "result": genres }); }
        let apiGenres = await axios.get(`${API_URL}?key=${API_KEY}`);
        apiGenres = apiGenres.data.results.map(res => { return { id: res.id, name: res.name } })
        const PlatformModels = await PlatformModel.bulkCreate(apiGenres);
        return res.status(200).json({ "result": apiGenres });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
}


module.exports = {
    getPlatforms
}



// const getPlatforms = async (req, res) => {
//     try {
//         const platforms = await PlatformModel.findAll();
//         return res.status(200).json({ "result": platforms });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: "Error interno del servidor" });
//     }
// }

// module.exports = {
//     getPlatforms
// }