import { genresFormater } from './genresFormater.utils';
import { platformsFormater } from './platformsFormater.utils';

export const gamesFormater = (games) => {
  const formated = games.map((game) => {
    return {
      id: game.id,
      name: game.name,
      description: game?.description || 'No description',
      released : game.released || 'No release date',
      source: 'public',
      genres: genresFormater(game.genres),
      platforms: platformsFormater(game.platforms),
      background_image: game.background_image,
      rating: game.rating,
    };
  });

  return formated;
};
