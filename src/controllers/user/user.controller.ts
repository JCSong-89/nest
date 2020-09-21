import { Controller, Get, Post, HttpCode, Body, Headers } from '@nestjs/common';
import { UsersService } from '../../services/users/users.service';
import { SigninUserDataDto } from '../../dto/users/singinUserData.dto';
import { CreateUserDto } from '../../dto/users/createUser.dto';
import { LoginUserDataDto } from '../../dto/users/LoginUserData.dto';
import { AuthenticateDto } from '../../dto/users/Authenticate.Dto';
import { UserProfileDto } from '../../dto/users/readUserProfile.dto';
@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @HttpCode(201)
  async createUser(@Body() data: SigninUserDataDto): Promise<CreateUserDto> {
    const result = await this.userService.createUser(data);

    return result;
  }

  @Post('/login')
  async loginUser(@Body() data: LoginUserDataDto): Promise<AuthenticateDto> {
    const result = await this.userService.signupUser(data);

    return result;
  }

  @Get()
  async profile(
    @Headers() Authentication: AuthenticateDto,
  ): Promise<UserProfileDto> {
    const result = await this.userService.findOneUser(Authentication);

    return result;
  }
}
