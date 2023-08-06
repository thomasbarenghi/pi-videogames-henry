import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Platform } from './entities/platform.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios/dist';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PlatformsService {
  constructor(
    @InjectRepository(Platform)
    private platformRepository: Repository<Platform>,
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async findAll(): Promise<any> {
    try {
      const rawgApi = this.configService.get<string>('RAWG_API_URL_NEUTRAL');
      const rawgApiKey = this.configService.get<string>('RAWG_API_KEY');
      const localPlatforms = await this.platformRepository.find();
      if (localPlatforms.length > 0) {
        return localPlatforms;
      }
      const rawgGenresObservable = this.httpService.get(
        `${rawgApi}/platforms?key=${rawgApiKey}`,
      );
      const rawgPlatforms = await rawgGenresObservable
        .toPromise()
        .then((response) => response.data.results);
      const genres = await this.platformRepository.save(rawgPlatforms);
      return genres;
    } catch (error) {
      Logger.error(error);
      return { error: 'Error al obtener las plataformas.' };
    }
  }

  async findOne(id: string) {
    try {
      const platform = await this.platformRepository.findOne({
        where: { id: id },
      });
      return platform;
    } catch (error) {
      Logger.error(error);
      return { error: 'Error al obtener la plataforma.' };
    }
  }
}
