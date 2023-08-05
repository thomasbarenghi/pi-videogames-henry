const axios = require("axios");
const Game = require("../models").videogamesModels;
const Genre = require("../models").genreModels;
const Platform = require("../models").platformsModels;
const quitarDuplicados = require("../utils/esDuplicado");

require("dotenv").config();

const { API_KEY } = process.env;
const API_URL = `https://api.rawg.io/api/games`;
let cachedGames = [];

const getVideogames = async (req, res) => {
  const searchValue = req.query.name?.toLowerCase();
  if (cachedGames.length > 0) {
    return res
      .status(200)
      .json({ results: cachedGames, count: cachedGames.length });
  }

  try {
    let games = [];

    for (let currentPage = 1; games.length < 100; currentPage++) {
      let apiGames = [];
      const { data: resGame } = await axios.get(
        `${API_URL}?key=${API_KEY}&page=${currentPage}&page_size=50`
      );
      apiGames = await resGame.results.map((res) => {
        return {
          id: res.id,
          name: res.name,
          source: "public",
          genres: res.genres.map((genre) => {
            return { id: genre.id, name: genre.name };
          }),
          platforms: res.platforms.map((platform) => {
            return { id: platform.platform.id, name: platform.platform.name };
          }),
          background_image: res.background_image,
          rating: res.rating,
        };
      });
      games = games.concat(apiGames).slice(0, 100);
    }

    const genres = await Genre.findAll();
    const platforms = await Platform.findAll();

    let localGames = await Game.findAll({
      include: [
        {
          model: Genre,
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
        {
          model: Platform,
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
      ],
    });

    localGames = localGames.map((game) => {
      return {
        id: game.id,
        name: game.name,
        source: "own",
        genres: game.genres,
        rating: game.rating,
        background_image: game.background_image,
        platforms: game.platforms,
      };
    });
    games = [...games, ...localGames];

    //Cargar las platforms
    const platformsModel = await Platform.findAll();
    if (platformsModel.length > 0) {
      console.log("Hay platforms en la DB");
    } else {
      let platforms = games.map((game) => game.platforms).flat();
      let platformsUnicos = quitarDuplicados(platforms);
      await Platform.bulkCreate(platformsUnicos);
    }

    let filteredGames = searchValue
      ? games
          .filter((game) => game.name.toLowerCase().includes(searchValue))
          .slice(0, 15)
      : games;
    filteredGames = filteredGames.sort((a, b) => a.id - b.id);
    cachedGames = filteredGames;

    return res.status(200).json({
      results: filteredGames,
      count: filteredGames.length,
      genres: genres || [],
      platforms: platforms || [],
    });
  } catch (error) {
    console.error(error);
    //  return res.status(500).json({ error: "Error interno del servidor" });
    throw new Error(error.message);
  }
};

function filterObjectProperties(obj, allowedProperties) {
  return Object.keys(obj).reduce((newObj, key) => {
    if (allowedProperties.includes(key)) {
      newObj[key] = obj[key];
    }
    return newObj;
  }, {});
}

const getVideogameById = async (req, res) => {
  const id = req.params.idVideogame;
  const hasLetter = /[a-zA-Z]/.test(id);

  try {
    if (hasLetter) {
      const game = await Game.findByPk(id, {
        include: [
          {
            model: Genre,
            attributes: ["id", "name"],
            through: { attributes: [] },
          },
          {
            model: Platform,
            attributes: ["id", "name"],
            through: { attributes: [] },
          },
        ],
      });

      if (!game) {
        return res.status(404).json({ error: "No existe el juego" });
      }

      const relatedGenres = game.genres.map((genre) => ({
        id: genre.id,
        name: genre.name,
      }));
      const relatedPlatforms = game.platforms.map((platform) => ({
        id: platform.id,
        name: platform.name,
      }));
      const filteredGame = {
        id: game.id,
        name: game.name,
        description: game.description,
        platforms: game.platforms,
        background_image: game.background_image,
        released: game.released,
        rating: game.rating,
        source: game.source,
        createdAt: game.createdAt,
        updatedAt: game.updatedAt,
        genres: relatedGenres,
        platforms: relatedPlatforms,
      };

      return res.status(200).json(filteredGame);
    } else {
      const { data: game } = await axios.get(`${API_URL}/${id}?key=${API_KEY}`);
      const filteredResponse = filterObjectProperties(game, [
        "id",
        "name",
        "description",
        "background_image",
        "rating",
        "released",
        "genres",
        "platforms",
      ]);
      filteredResponse.platforms = filteredResponse.platforms.map(
        (platform) => ({
          id: platform.platform.id,
          name: platform.platform.name,
        })
      );
      filteredResponse.genres = filteredResponse.genres.map((genre) => ({
        id: genre.id,
        name: genre.name,
      }));
      return res.status(200).json(filteredResponse);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

const addVideogame = async (req, res) => {
  const {
    name,
    description,
    released,
    rating,
    platforms,
    background_image,
    token,
    genres,
  } = req.body;

  if (
    !name ||
    !description ||
    !released ||
    !rating ||
    !background_image ||
    !platforms ||
    !genres
  ) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  try {
    const game = await Game.create({
      name,
      description,
      released,
      rating,
      background_image,
      platforms: [],
      genres: [],
    });
    cachedGames = [...cachedGames, game];
    if (genres && genres.length > 0) {
      const genresFn = await Genre.findAll({ where: { id: genres } });
      await game.addGenres(genresFn);
    }

    if (platforms && platforms.length > 0) {
      const platformsFn = await Platform.findAll({ where: { id: platforms } });
      await game.addPlatforms(platformsFn);
    }

    cachedGames = [];

    return res.status(200).json(game);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

const deleteGame = async (req, res) => {
  const id = req.params.idVideogame;
  try {
    const game = await Game.findByPk(id);
    if (!game) {
      throw new Error("No existe el juego");
    }
    await game.destroy();
    cachedGames = cachedGames.filter((game) => game.id !== id);
    return res.status(200).json({ message: "Juego eliminado" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error interno del servidocr" });
  }
};

module.exports = {
  getVideogames,
  getVideogameById,
  addVideogame,
  deleteGame,
};
