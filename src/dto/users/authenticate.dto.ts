export class AuthenticateDto {
  authentication: string;
  constructor(token: string) {
    this.authentication = token;
  }
}
