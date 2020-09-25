import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user.module';
import { MusicModule } from './modules/music.module';
import { StorageModule } from './modules/storage.module';

@Module({
  imports: [DatabaseModule, UserModule, MusicModule, StorageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
