//export const SERVER_URL = 'https://pi-videogames-henry.onrender.com/api/';
//export const SERVER_URL = 'http://127.0.0.1:3001/api/';
export const SERVER_URL = process.env.REACT_APP_SERVER_URL;
export const headers = {"authorization": process.env.REACT_APP_SERVER_TOKEN};