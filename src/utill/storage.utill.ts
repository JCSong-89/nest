import { createReadStream, existsSync, unlinkSync } from 'fs';
import { resolve } from 'path';
import { BadRequestException } from '@nestjs/common';
import {
  BlobServiceClient,
  StorageSharedKeyCredential,
  newPipeline,
} from '@azure/storage-blob';
import { UploadeWeedleMetaDto } from '../dto/storage/uploadeWeedleMeta.dto';
import { AzureDataDto } from '../dto/storage/azureData.dto';

export const putObject = async (file: UploadeWeedleMetaDto) => {
  if (!file) {
    // file 이 정의되지 않았으면 동작을 수행하지 않고 undefined 반환
    return Promise.resolve(undefined);
  }

  const containerName = <string>process.env.AZURE_STORAGE_CONTAINER_NAME;
  const sharedKeyCredential = new StorageSharedKeyCredential(
    <string>process.env.AZURE_STORAGE_ACCOUNT,
    <string>process.env.AZURE_STORAGE_SAS_KEY,
  );

  const pipeline = newPipeline(sharedKeyCredential);
  const blobServiceClient = new BlobServiceClient(
    `https://${process.env.AZURE_STORAGE_ACCOUNT}.blob.core.windows.net`,
    pipeline,
  );

  const blobName = <string>file.path;
  const fileStream = createReadStream(resolve('.', file.path));
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  // 업로드 후 결과 반환
  const result = await blockBlobClient.uploadStream(fileStream);
  const response = result._response.request;
  const Etag = result.etag;
  const requestUrl = response.url.replace('?comp=blocklist', '');
  const requestData = {
    Etag: <string>Etag.replace('"', '').replace('"', ''),
    Location: requestUrl.replace('%', '/'),
    key: requestUrl
      .replace(
        `https://${process.env.AZURE_STORAGE_ACCOUNT}.blob.core.windows.net/${process.env.AZURE_STORAGE_CONTAINER_NAME}/`,
        '',
      )
      .replace('%', '/'),
    container: containerName,
  };

  //임시 캐시 삭제
  if (existsSync(resolve('.', blobName))) {
    unlinkSync(resolve('.', blobName));
  }

  return requestData;
};

export const uploadFile = async (filepath: string) => {
  const fileStream = createReadStream(resolve('.', filepath));
  const containerName = <string>process.env.AZURE_STORAGE_CONTAINER_NAME;
  const sharedKeyCredential = new StorageSharedKeyCredential(
    <string>process.env.AZURE_STORAGE_ACCOUNT,
    <string>process.env.AZURE_STORAGE_SAS_KEY,
  );

  const pipeline = newPipeline(sharedKeyCredential);
  const blobServiceClient = new BlobServiceClient(
    `https://${process.env.AZURE_STORAGE_ACCOUNT}.blob.core.windows.net`,
    pipeline,
  );

  const blobName = filepath;
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  // 업로드 후 결과 반환
  const result = await blockBlobClient.uploadStream(fileStream);
  const response = result._response.request;
  const Etag = result.etag;
  const requestUrl = response.url.replace('?comp=blocklist', '');
  const requestData = {
    Etag: <string>Etag.replace('"', '').replace('"', ''),
    Location: requestUrl.replace('%', '/'),
    key: requestUrl
      .replace(
        `https://${process.env.AZURE_STORAGE_ACCOUNT}.blob.core.windows.net/${process.env.AZURE_STORAGE_CONTAINER_NAME}/`,
        '',
      )
      .replace('%', '/'),
    container: containerName,
  };

  //임시 캐시 삭제
  if (existsSync(resolve('.', blobName))) {
    unlinkSync(resolve('.', blobName));
  }

  return requestData;
};

export const deleteObject = async (azureData: AzureDataDto) => {
  if (!azureData) {
    return Promise.reject(
      new BadRequestException({
        code: 'bad_request',
        message: '삭제 대상 파일정보가 정의되지 않았습니다',
      }),
    );
  }
  if (!azureData.key) {
    return Promise.reject(
      new BadRequestException({
        code: 'bad_request',
        message: '삭제 대상 파일정보가 정의되지 않았습니다',
      }),
    );
  }

  const containerName = azureData.container;
  const sharedKeyCredential = new StorageSharedKeyCredential(
    <string>process.env.AZURE_STORAGE_ACCOUNT,
    <string>process.env.AZURE_STORAGE_SAS_KEY,
  );

  const pipeline = newPipeline(sharedKeyCredential);
  const blobServiceClient = new BlobServiceClient(
    `https://${process.env.AZURE_STORAGE_ACCOUNT}.blob.core.windows.net`,
    pipeline,
  );

  const blobName = azureData.key;
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  const result = await blockBlobClient.delete();

  return {
    statusCode: result._response.status,
    deleteObjectUrl: result._response.request.url,
  };
};
