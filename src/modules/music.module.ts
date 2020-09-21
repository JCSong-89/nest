import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { MusicController } from '../controllers/music.controller';
import { MusicsService } from '../services/musics.service';
import { musicsProviders } from '../models/music/musics.providers';
import { Music } from '../models/music/music.entity';

@Module({
  imports: [SequelizeModule.forFeature([Music])],
  controllers: [MusicController],
  providers: [MusicsService, ...musicsProviders],
})
export class MusicModule {}
