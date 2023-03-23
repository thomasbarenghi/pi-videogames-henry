const { DataTypes } = require('sequelize');
const sequelize = require('../data/connection');
const Genre = require('./genre');
const Platforms = require('./platforms');

const Videogame = sequelize.define('videogames', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    background_image: {
        type: DataTypes.STRING(255)
    },
    released: {
        type: DataTypes.DATEONLY
    },
    rating: {
        type: DataTypes.DECIMAL(3, 1)
    },
    source: {
        type: DataTypes.STRING(10),
        defaultValue: 'own'
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

Videogame.belongsToMany(Genre, { through: 'videogames_genres' });
Videogame.belongsToMany(Platforms, { through: 'videogames_platforms' });
Genre.belongsToMany(Videogame, { through: 'videogames_genres' });
Platforms.belongsToMany(Videogame, { through: 'videogames_platforms' });


module.exports = Videogame;