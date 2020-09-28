import { Module } from '@nestjs/common';
import { StorageController } from '../controllers/storage.controller';
import { StorageUploadService } from '../services/storage/storageUpload.service';
import { StorageDownloadService } from '../services/storage/storageDownload.service';
import { MulterModule } from '@nestjs/platform-express';
import { BadRequestException } from '@nestjs/common';

@Module({
  controllers: [StorageController],
  providers: [StorageUploadService, StorageDownloadService],
  imports: [
    MulterModule.register({
      dest: './upload',
      fileFilter: (
        req: Express.Request,
        file: any,
        callback: (error: Error, acceptFile: boolean) => void,
      ) => {
        const mimetype = file.mimetype;
        if (!mimetype) {
          callback(
            new BadRequestException({
              code: 'bad_request',
              message: 'mimetype is not defined',
            }),
            false,
          );
        } else {
          const type = mimetype.split('/')[0];
          if (type !== 'image') {
            callback(
              new BadRequestException({
                code: 'bad_request',
                message: 'only image files can be uploaded',
              }),
              false,
            );
          }
        }
        callback(null, true);
      },
      limits: { fileSize: 10 * 1024 * 1024 }, // [413] 파일 사이즈는 10 MBytes 를 넘지 않는다
    }),
  ],
})
export class StorageModule {}
