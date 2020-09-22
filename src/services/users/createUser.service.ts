import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../../models/user/user.entity';
import { CreateUserDto } from '../../dto/users/createUser.dto';
import { SigninUserDataDto } from '../../dto/users/singinUserData.dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class CreateUsersService {
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
}
