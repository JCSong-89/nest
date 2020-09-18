import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { MusicController } from '../../controllers/music/music.controller';
import { MusicsService } from '../../services/music/music.service';
import { musicsProviders } from '../../database/models/music/musics.providers';
import { Music } from '../../database/models/music/music.entity';

@Module({
  imports: [SequelizeModule.forFeature([Music])],
  controllers: [MusicController],
  providers: [MusicsService, ...musicsProviders],
})
export class MusicModule {}
