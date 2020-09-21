import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../../database/models/user/user.entity';
import { CreateUserDto } from '../../dto/users/createUser.dto';
import { SigninUserDataDto } from '../../dto/users/singinUserData.dto';
import { LoginUserDataDto } from '../../dto/users/LoginUserData.dto';
import { AuthenticateDto } from '../../dto/users/Authenticate.Dto';
import { AuthService } from '../../decorators/auth/auth.service';
import { UserProfileDto } from './../../dto/users/readUserProfile.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private authService: AuthService,
  ) {}

  async createUser(data: SigninUserDataDto): Promise<CreateUserDto> {
    const user = await this.userModel.findOne({
      where: { username: data.username },
    });

    if (user) {
      throw new HttpException('Already Joind username', HttpStatus.BAD_REQUEST);
    }

    data.password = await this.authService.hashPassword(data.password);

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

    const result = await this.authService.comparePassword(
      data.password,
      user.password,
    );

    if (result === false) {
      throw new HttpException('Pssword Not Correct', HttpStatus.BAD_REQUEST);
    }

    const token = await this.authService.generateJWT(user);

    return new AuthenticateDto(token);
  }

  async findOneUser(data: AuthenticateDto): Promise<UserProfileDto> {
    const token = data.authentication;
    const payload = this.authService.decodeJWT(token);

    if (!payload) {
      throw new UnauthorizedException({
        code: 'token_wrong',
        message: 'Unauthorized',
      });
    }
    const user = await this.userModel.findOne({
      where: { id: payload.user.id, username: payload.user.username },
    });

    if (!user) {
      throw new NotFoundException({
        code: 'not_found',
        message: 'User not found',
      });
    }

    return new UserProfileDto(user);
  }
}
