import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';
import { User } from '../models/user/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateJWT(user: User): Promise<string> {
    return this.jwtService.signAsync({
      id: user.id,
      username: user.username,
    });
  }

  hashPassword(password: string): Promise<string> {
    return hash(password, 12);
  }

  comparePassword(password: string, hashPassword: string): Promise<boolean> {
    return compare(password, hashPassword);
  }

  decodeJWT(token: string): any | { [key: string]: any } {
    return this.jwtService.decode(token);
  }
}
