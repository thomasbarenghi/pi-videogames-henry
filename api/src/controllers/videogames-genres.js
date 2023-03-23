const videogameGenreModels = require('../models').videogameGenreModels;

const getAllVideogameGenre = async (req, res) => {

    try {
        const related = await videogameGenreModels.findAll();
        return res.status(200).json(related);
    } catch (error) { console.error(error); return res.status(500).json({ error: error.message }); }
}


module.exports = {
    getAllVideogameGenre
}

