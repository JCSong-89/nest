import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../../database/models/user/user.entity';
import { CreateUserDto } from '../../dto/users/createUser.dto';
import { SigninUserDataDto } from '../../dto/users/singinUserData.dto';
import { LoginUserDataDto } from '../../dto/users/LoginUserData.dto';
import { AuthenticateDto } from '../../dto/users/Authenticate.Dto';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async createUser(data: SigninUserDataDto): Promise<CreateUserDto> {
    const user = await this.userModel.findOne({
      where: { username: data.username },
    });

    if (user) {
      throw new HttpException('Already Joind username', HttpStatus.BAD_REQUEST);
    }

    const hashpassword = await hash(data.password, 10);
    data.password = hashpassword;
    this.userModel.create(data);
    const response = { code: 'SUCCESS', message: 'Created NEW USER' };

    return new CreateUserDto(response);
  }

  async signupUser(data: LoginUserDataDto): Promise<AuthenticateDto> {
    const user = await this.userModel.findOne({
      where: { username: data.username },
    });

    if (!user) {
      throw new NotFoundException({
        code: 'not_found',
        message: 'User not found',
      });
    }

    const result = await compare(data.password, user.password);

    if (result === false) {
      throw new HttpException('Pssword Not Correct', HttpStatus.BAD_REQUEST);
    }

    const userInfo = {
      id: user.id,
      username: user.username,
    };
    const token = sign(userInfo, 'songhnm');

    return new AuthenticateDto(token);
  }

  async findOneUser(data: AuthenticateDto): CreateUserDto {
    const token = data.Authentication;
  }
}
