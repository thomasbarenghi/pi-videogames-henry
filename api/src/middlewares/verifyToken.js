require('dotenv').config();
const { SERVER_TOKEN } = process.env;

function authMiddleware(req, res, next) {

    const authHeader = req.headers['authorization'];
    console.log("authHeader", authHeader, SERVER_TOKEN);

    try {
        if (!authHeader) { return res.status(404).json({ message: 'No se proporcionó una palabra secreta' }); }
        if (authHeader !== SERVER_TOKEN) { return res.status(401).json({ message: 'No se proporcionó una palabra secreta válida' }); }
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
}

module.exports = authMiddleware;
