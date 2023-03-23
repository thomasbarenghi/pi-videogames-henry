const express = require('express');
const router = express.Router();

const videogameGenreController = require('../controllers').videogameGenreController;

router.get('/', videogameGenreController.getAllVideogameGenre);


module.exports = router;