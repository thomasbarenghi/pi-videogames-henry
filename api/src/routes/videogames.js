const express = require('express');
const router = express.Router();

const { videogamesController } = require('../controllers');

router.get('/', videogamesController.getVideogames);
router.get('/:idVideogame', videogamesController.getVideogameById);
router.post('/', videogamesController.addVideogame);
router.delete('/:idVideogame', videogamesController.deleteGame);

module.exports = router;