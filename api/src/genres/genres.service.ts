import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Game } from 'src/games/entities/game.entity';
import { Genre } from '../genres/entities/genre.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios/dist';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre) private genreRepository: Repository<Genre>,
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async findAll(): Promise<any> {
    try {
      const rawgApi = this.configService.get<string>('RAWG_API_URL_NEUTRAL');
      const rawgApiKey = this.configService.get<string>('RAWG_API_KEY');
      const localGenres = await this.genreRepository.find();
      if (localGenres.length > 0) {
        return localGenres;
      }
      const rawgGenresObservable = this.httpService.get(
        `${rawgApi}/genres?key=${rawgApiKey}`,
      );
      const rawgGenres = await rawgGenresObservable
        .toPromise()
        .then((response) => response.data.results);
      const genres = await this.genreRepository.save(rawgGenres);
      return genres;
    } catch (error) {
      Logger.error(error);
      return { error: 'Error al obtener los generos.' };
    }
  }

  async findOne(id: string) {
    try {
      const genre = await this.genreRepository.findOne({ where: { id: id } });
      return genre;
    } catch (error) {
      Logger.error(error);
      return { error: 'Error al obtener el genero.' };
    }
  }
}
