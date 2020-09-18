export class AuthenticateDto {
  Authentication: string;
  constructor(token: string) {
    this.Authentication = token;
  }
}
