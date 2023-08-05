import { Injectable, Logger } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Repository } from 'typeorm';
import { Game } from './entities/game.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios/dist';
import { ConfigService } from '@nestjs/config';
import { GenresService } from 'src/genres/genres.service';
import { gamesFormater } from 'src/utils/gamesFormater.utils';
import { PlatformsService } from 'src/platforms/platforms.service';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game) private gameRepository: Repository<Game>,
    private readonly httpService: HttpService,
    private configService: ConfigService,
    private genresService: GenresService,
    private platformsService: PlatformsService,
  ) {}

  async create(createGameDto: CreateGameDto) {
    let genresToAssign = [];
    let platformsToAssign = [];

    if (createGameDto.genres) {
      for (let i = 0; i < createGameDto.genres.length; i++) {
        const genre = await this.genresService.findOne(createGameDto.genres[i]);
        if (genre) {
          genresToAssign = [...genresToAssign, genre];
        }
      }
    }

    if (createGameDto.platforms) {
      for (let i = 0; i < createGameDto.platforms.length; i++) {
        const platform = await this.platformsService.findOne(
          createGameDto.platforms[i],
        );
        if (platform) {
          platformsToAssign = [...platformsToAssign, platform];
        }
      }
    }

    createGameDto.genres = genresToAssign as any;
    createGameDto.platforms = platformsToAssign as any;
    createGameDto.source = 'local';
    createGameDto.createdAt = new Date();
    createGameDto.updatedAt = new Date();

    const game = this.gameRepository.create(createGameDto);
    return this.gameRepository.save(game);
  }

  async findAll(): Promise<any> {
    try {
      const rawgApi = this.configService.get<string>('RAWG_API_URL');
      const rawgApiKey = this.configService.get<string>('RAWG_API_KEY');

      const localGames = await this.gameRepository.find();
      let games = [];
      for (let currentPage = 1; games.length < 100; currentPage++) {
        const rawgGamesObservable = this.httpService.get(
          `${rawgApi}?key=${rawgApiKey}&page=${currentPage}&page_size=50`,
        );

        const rawgGames = await rawgGamesObservable
          .toPromise()
          .then((response) => response.data.results);
        const formatedGames = await gamesFormater(rawgGames);
        games = games.concat(formatedGames).slice(0, 100);
      }

      games = games.concat(localGames);
      const genres = await this.genresService.findAll();
      const platforms = await this.platformsService.findAll();
      return {
        gamesCount: games.length,
        games: games,
        genres: genres,
        platforms: platforms,
      };
    } catch (error) {
      Logger.error(error);
      return { error: 'Error al obtener los juegos.' };
    }
  }

  async findOne(id: string) {
    try {
      const rawgApi = this.configService.get<string>('RAWG_API_URL');
      const rawgApiKey = this.configService.get<string>('RAWG_API_KEY');
      const hasLetter = /[a-zA-Z]/.test(id);

      if (hasLetter) {
        const localGame = await this.gameRepository.findOne({ where: { id } });
        return localGame;
      } else {
        const rawgGameObservable = this.httpService.get(
          `${rawgApi}/${id}?key=${rawgApiKey}`,
        );

        const rawgGame = await rawgGameObservable
          .toPromise()
          .then((response) => response.data);

        const formatedGame = await gamesFormater([rawgGame]);

        return formatedGame[0];
      }
    } catch (error) {
      Logger.error(error);
      return { error: 'Error al obtener el juego.' };
    }
  }

  update(id: number, updateGameDto: UpdateGameDto) {
    return `This action updates a #${id} game`;
  }

  remove(id: number) {
    return `This action removes a #${id} game`;
  }
}
