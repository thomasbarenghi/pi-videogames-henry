
export class CreateGameDto {
name: string;
description: string;
background_image: string;
released: string;
//numero float
rating: number;
source: "local";
genres: [];
platforms: []
createdAt?: Date;
updatedAt?: Date;
}
