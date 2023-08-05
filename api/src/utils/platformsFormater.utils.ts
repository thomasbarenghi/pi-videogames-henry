export const platformsFormater = (platforms) => {
  const formated = platforms.map((platform) => {
    return {
      id: platform.platform.id,
      name: platform.platform.name,
    };
  });

  return formated;
};
