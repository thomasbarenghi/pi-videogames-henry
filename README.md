# PI Videogames

 This application is designed to display games and game genres to the users, as well as allow them to be uploaded.
 
Front: NextJS, SASS, Redux Toolkit

Back: NestJS

DB: PostgreSQL

## Deployment

Link to the deploy

```bash
https://pi-videogames-henry-rouge.vercel.app/games
```




## API Reference

#### Get all games

```bash
  GET /games
```

#### Get game

```bash
  GET /games/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### Delete game

```bash
  DELETE /games/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to delete |

#### Post game

```bash
  POST /games
```
```bash
{
    "name": "Game",
    "description": "Description",
    "rating": 1,
    "background_image" : "https://t0.gstatic.com/licensed-image?q=tbn:ANd9GcQkrjYxSfSHeCEA7hkPy8e2JphDsfFHZVKqx-3t37E4XKr-AT7DML8IwtwY0TnZsUcQ",
    "genres": [2, 3],
    "platforms": [2],
    "released": "2023-08-05"
}
```



## Environment Variables
### Frontend
 
   To run this project, you will need to add the following environment variables to your .env file on /client folder

`NEXT_PUBLIC_SERVER_URL=http://fronturl.com`
### Backend
 
   To run this project, you will need to add the following environment variables to your .env file on /api folder

`DB_HOST=example.db.elephantsql.com`

`DB_NAME`

`DB_PASSWORD`

`DB_USER`

`RAWG_API_KEY`

`RAWG_API_URL=https://api.rawg.io/api/games`

`RAWG_API_URL_NEUTRAL=https://api.rawg.io/api`

`URL_FRONT=https://fronturl.com`


## Authors

- [@thomasbarenghi](https://www.github.com/thomasbarenghi)

