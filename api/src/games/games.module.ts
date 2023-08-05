import { Module, forwardRef } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from 'src/games/entities/game.entity';
import { HttpModule } from '@nestjs/axios';
import { GenresModule } from 'src/genres/genres.module';
import { PlatformsModule } from 'src/platforms/platforms.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Game]),
    HttpModule,
    forwardRef(() => GenresModule),
    forwardRef(() => PlatformsModule),
  ],
  controllers: [GamesController],
  providers: [GamesService],
  exports: [GamesService],
})
export class GamesModule {}
