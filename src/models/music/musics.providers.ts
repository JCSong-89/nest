import { Music } from './music.entity';

export const musicsProviders = [
  {
    provide: 'MUSICS_REPOSITORY',
    useValue: Music,
  },
];
