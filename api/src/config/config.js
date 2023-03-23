require('dotenv').config();

const { URL_FRONT } = process.env;

const urlFront = URL_FRONT;

//const urlFront = 'https://pi-videogames-sigma-one.vercel.app';
//const urlFront = 'http://127.0.0.1:3000';
module.exports = {
    urlFront,
};