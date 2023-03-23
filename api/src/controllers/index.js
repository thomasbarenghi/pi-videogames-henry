const videogamesController = require('./videogames');
const genreController = require('./genres');
const videogameGenreController = require('./videogames-genres');
const platformsController = require('./platforms');
const videogamesPlatformsController = require('./videogames-platforms');

module.exports = {
    videogamesController,
    genreController,
    videogameGenreController,
    platformsController,
    videogamesPlatformsController
}