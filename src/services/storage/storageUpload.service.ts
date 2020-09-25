import { Injectable } from '@nestjs/common';
import {
  BlobServiceClient,
  StorageSharedKeyCredential,
  newPipeline,
} from '@azure/storage-blob';
import { UploadedFileMetadataDto } from '../../dto/storage/uploadedFileMetadata.dto';
import { ResponesMessageDto } from '../../dto/responesMessage.dto';
import { Readable as ReadableStream } from 'stream';

@Injectable()
export class StorageUploadService {
  async upload(file: UploadedFileMetadataDto): Promise<ResponesMessageDto> {
    const containerName = 'testsongtest';
    const sharedKeyCredential = new StorageSharedKeyCredential(
      <string>process.env.AZURE_STORAGE_ACCOUNT,
      <string>process.env.AZURE_STORAGE_SAS_KEY,
    );
    const pipeline = newPipeline(sharedKeyCredential);
    const blobServiceClient = new BlobServiceClient(
      `https://${process.env.AZURE_STORAGE_ACCOUNT}.blob.core.windows.net`,
      pipeline,
    );

    const getBlobName = (originalName: string) => {
      const identifier = Math.random()
        .toString()
        .replace(/0\./, '');
      return `${identifier}-${originalName}`;
    };

    const blobName = getBlobName(file.originalname);
    const stream = ReadableStream.from(file.buffer);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // 업로드 후 결과 반환
    const result = (await blockBlobClient.uploadStream(stream))._response;
    const response = { code: 'SUCCESS', message: 'Uploaded File' };

    return new ResponesMessageDto(response);
  }
}
