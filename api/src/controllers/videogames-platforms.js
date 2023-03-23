const videogamePlatformModels = require('../models').videogamePlatformModels;

const getAllVideogamesPlatforms = async (req, res) => {
    try {
        const related = await videogamePlatformModels.findAll();
        return res.status(200).json({ "result": related });
    } catch (error) { console.error(error); return res.status(500).json({ error: error.message }); }
}

module.exports = {
    getAllVideogamesPlatforms
}