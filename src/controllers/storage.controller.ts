import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { StorageUploadService } from '../services/storage/storageUpload.service';
import { StorageDownloadService } from '../services/storage/storageDownload.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class StorageController {
  constructor(
    private storageUploadService: StorageUploadService,
    private storageDownloadService: StorageDownloadService,
  ) {}

  @Post('azure/upload')
  @UseInterceptors(FileInterceptor('file'))
  UploadedFilesUsingInterceptor(
    @UploadedFile()
    file,
  ) {
    console.log(file);
    return this.storageUploadService.upload(file);
  }

  @Get('azure/download')
  DownloadedFilesUsingInterceptor() {
    return this.storageDownloadService.download();
  }
}
