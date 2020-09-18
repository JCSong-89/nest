import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/users/user.module';
import { MusicModule } from './modules/musics/music.module';

@Module({
  imports: [DatabaseModule, UserModule, MusicModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
