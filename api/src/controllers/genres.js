const GenreModel = require('../models').genreModels
const axios = require('axios');
require('dotenv').config();

const { API_KEY } = process.env;
const API_URL = `https://api.rawg.io/api/genres`;

const getGenres = async (req, res) => {

    try {
        const genres = await GenreModel.findAll();
        if (genres.length > 0) { return res.status(200).json({ "result": genres }); }
        let apiGenres = await axios.get(`${API_URL}?key=${API_KEY}`);
        apiGenres = apiGenres.data.results.map(res => { return { id: res.id, name: res.name } })
        const GenreModels = await GenreModel.bulkCreate(apiGenres);
        return res.status(200).json({ "result": apiGenres });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
}


const getGenreById = async (req, res) => {

    const id = req.params.idGenre;

    try {
        const genre = await GenreModel.findByPk(id);
        if (!genre) { return res.status(404).json({ error: "No existe el género" }); }
        return res.status(200).json(genre);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
}


module.exports = {
    getGenres,
    getGenreById
}
