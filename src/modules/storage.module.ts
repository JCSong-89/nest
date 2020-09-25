import { Module } from '@nestjs/common';
import { StorageController } from '../controllers/storage.controller';
import { StorageUploadService } from '../services/storage/storageUpload.service';
import { StorageDownloadService } from '../services/storage/storageDownload.service';

@Module({
  controllers: [StorageController],
  providers: [StorageUploadService, StorageDownloadService],
  imports: [],
})
export class StorageModule {}
