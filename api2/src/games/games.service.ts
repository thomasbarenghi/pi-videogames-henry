import { Injectable, Logger } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Repository } from 'typeorm';
import { Game } from './entities/game.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios/dist';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game) private gameRepository: Repository<Game>,
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  //   const dbUser = this.configService.get<string>('DATABASE_USER')
  //   const rawgApi = process.env.RAWG_API_URL;
  // const rawgApiKey = process.env.RAWG_API_KEY;

  create(createGameDto: CreateGameDto) {
    return 'This action adds a new game';
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

        games = games.concat(rawgGames).slice(0, 100);
      }

      games = games.concat(localGames);

      return {
        count: games.length,
        results: games,
      }
    } catch (error) {
      Logger.error(error);
      // En caso de error, deberías devolver una respuesta adecuada (p. ej., un objeto con el mensaje de error).
      return { error: 'Error al obtener los juegos.' };
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} game`;
  }

  update(id: number, updateGameDto: UpdateGameDto) {
    return `This action updates a #${id} game`;
  }

  remove(id: number) {
    return `This action removes a #${id} game`;
  }
}
