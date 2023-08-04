import { Module } from '@nestjs/common';
import { PlatformsService } from './platforms.service';
import { PlatformsController } from './platforms.controller';


@Module({
  imports: [],
  controllers: [PlatformsController],
  providers: [PlatformsService]
})
export class PlatformsModule {}
