import { Music } from '../models/music/music.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class MusicsService {
  constructor(
    @InjectModel(Music)
    private readonly musicModel: typeof Music,
  ) {}

  async find(musicId: number): Promise<Music> {
    const music = await this.musicModel.findOne({
      where: { id: musicId },
    });
    if (!music) {
      throw new NotFoundException({
        code: 'not_found',
        message: 'Music not found',
      });
    }

    return music;
  }
}
