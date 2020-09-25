import {
  BlobServiceClient,
  StorageSharedKeyCredential,
  newPipeline,
} from '@azure/storage-blob';
import { Injectable } from '@nestjs/common';
import { ResponesMessageDto } from '../../dto/responesMessage.dto';

@Injectable()
export class StorageDownloadService {
  async download(): Promise<ResponesMessageDto> {
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
    const blobName = '10148240261438102-5736_8210_5653.jpg';
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlobClient(blobName);

    // 다운로드 후 결과 반환
    const result = (
      await blobClient.downloadToFile(`./download/${blobName}.jpg`)
    )._response;
    const response = { code: 'SUCCESS', message: 'Downloaded File' };

    return new ResponesMessageDto(response);
  }
}
