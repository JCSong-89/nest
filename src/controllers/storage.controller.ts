import {
  Controller,
  Delete,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { StorageUploadService } from '../services/storage/storageUpload.service';
import { StorageDownloadService } from '../services/storage/storageDownload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { uploadFile, deleteObject, putObject } from '../utill/storage.utill';

@Controller()
export class StorageController {
  constructor(
    private storageUploadService: StorageUploadService,
    private storageDownloadService: StorageDownloadService,
  ) {}

  @Post('azure')
  @UseInterceptors(FileInterceptor('file'))
  UploadedFilesUsingInterceptor(
    @UploadedFile()
    file,
  ) {
    return putObject(file);
  }

  @Get('azure')
  DownloadedFilesUsingInterceptor() {
    return this.storageDownloadService.download();
  }

  @Post('azure/weedleUploadTest')
  @UseInterceptors(FileInterceptor('file'))
  weedleTestUpload(
    @UploadedFile()
    file,
  ) {
    return uploadFile(<string>file.path);
  }

  @Delete('azure')
  weedleDeleteFile() {
    const azureDate = {
      Etag: '0x8D86378FB0B2F60',
      Location:
        'https://songtest.blob.core.windows.net/testsongtest/upload%5C88a47475b33be3eb74e6e84f1e5261de',
      key: 'upload/5C88a47475b33be3eb74e6e84f1e5261de',
      container: 'testsongtest',
    };
    return deleteObject(azureDate);
  }
}
