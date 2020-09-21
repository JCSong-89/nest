import { Controller, Get, Param, HttpCode } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { ErrorDto } from '../error.dto';
import { ReadMusicDto } from '../dto/musics/readMusic.dto';
import { MusicsService } from '../services/musics.service';

@ApiTags('음악')
@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicsService) {}

  @Get('/:musicId')
  @HttpCode(200)
  @ApiOperation({ summary: '상세보기' })
  @ApiOkResponse({ type: ReadMusicDto })
  @ApiNotFoundResponse({ description: 'not_found', type: ErrorDto })
  async showMusicDetail(
    @Param('musicId') musicId: number,
  ): Promise<ReadMusicDto> {
    const music = await this.musicService.find(musicId);

    return music;
  }
}
