import { GenresClass, PlatformsClass } from ".";

export class GamesClass {
  id: string;
  name: string;
  source: "public" | "own";
  rating: number;
  background_image: string;
  genres: GenresClass[];
  platforms: PlatformsClass[];

  constructor(
    id: string,
    name: string,
    source: "public" | "own",
    rating: number,
    background_image: string,
    genres: GenresClass[],
    platforms: PlatformsClass[]
  ) {
    this.id = id;
    this.name = name;
    this.source = source;
    this.rating = rating;
    this.background_image = background_image;
    this.genres = genres;
    this.platforms = platforms;
  }

  static deserialize(data: any): GamesClass {
    return new GamesClass(
      data.id,
      data.name,
      data.source,
      data.rating,
      data.background_image,
      data.genres,
      data.platforms
    );
  }

  static deserializeList(data: any): GamesClass[] {
    let games: GamesClass[] = [];
    for (let i = 0; i < data.length; i++) {
      games.push(this.deserialize(data[i]));
    }
    return games;
  }

  getID(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getSource(): "public" | "own" {
    return this.source;
  }

  getRating(): number {
    return this.rating;
  }

  getBackgroundImage(): string {
    return this.background_image;
  }

  getGenres(): GenresClass[] {
    return this.genres;
  }

  getPlatforms(): PlatformsClass[] {
    return this.platforms;
  }
}
