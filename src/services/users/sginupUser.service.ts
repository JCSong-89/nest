import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../../models/user/user.entity';
import { LoginUserDataDto } from '../../dto/users/LoginUserData.dto';
import { AuthenticateDto } from '../../dto/auth/authenticate.dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class SignupUsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private authService: AuthService,
  ) {}

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
}
