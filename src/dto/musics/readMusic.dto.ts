import { Music } from '../../models/music/music.entity';

export class ReadMusicDto {
  path: string;
  artist: string;
  album: string;
  name: string;
  size: string;
  file: string;
  UserId: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(music: Music) {
    this.path = music.path;
    this.artist = music.artist;
    this.album = music.album;
    this.name = music.name;
    this.size = music.size;
    this.file = music.file;
    this.UserId = music.UserId;
    this.createdAt = music.createdAt;
    this.updatedAt = music.updatedAt;
  }
}
