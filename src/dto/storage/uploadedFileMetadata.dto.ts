export class UploadedFileMetadataDto {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: string;
  /*constructor(file: any) {
    this.fieldname = file.fieldname;
    this.originalname = file.originalname;
    this.encoding = file.encoding;
    this.mimetype = file.mimetype;
    this.buffer = file.buffer;
    this.size = file.size;
  }*/
}
