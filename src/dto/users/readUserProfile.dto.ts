export class UserProfileDto {
  username: string;
  name: string;
  constructor(data: { [key: string]: any }) {
    this.username = data.username;
    this.name = data.name;
  }
}
