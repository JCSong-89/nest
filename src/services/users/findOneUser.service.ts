import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../../models/user/user.entity';
import { AuthenticateDto } from '../../dto/auth/authenticate.dto';
import { AuthService } from '../auth/auth.service';
import { UserProfileDto } from '../../dto/users/readUserProfile.dto';

@Injectable()
export class FindOneUsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private authService: AuthService,
  ) {}

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
