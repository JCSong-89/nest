export class CreateUserDto {
  message: string;
  code: string;
  constructor(data: any) {
    this.message = data.message;
    this.code = data.code;
  }
}
