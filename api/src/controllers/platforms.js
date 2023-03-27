const PlatformModel = require('../models').platformsModels;
require('dotenv').config();
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
    await new Promise(resolve => setTimeout(resolve, 3000));
    return findPlatforms(retryCount - 1);
};

module.exports = {
    getPlatforms
}
