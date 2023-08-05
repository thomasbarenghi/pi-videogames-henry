export const genresFormater = (genres) => {
    const formated = genres.map((genre) => {
      return {
        id: genre.id,
        name: genre.name,
      };
    });
  
    return formated;
  };