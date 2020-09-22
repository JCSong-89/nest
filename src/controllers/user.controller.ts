import { Controller, Get, Post, HttpCode, Body, Headers } from '@nestjs/common';
//import { UsersService } from '../services/users.service';
import { CreateUsersService } from '../services/users/createUser.service';
import { SignupUsersService } from '../services/users/sginupUser.service';
import { FindOneUsersService } from '../services/users/findOneUser.service';
import { SigninUserDataDto } from '../dto/users/singinUserData.dto';
import { CreateUserDto } from '../dto/users/createUser.dto';
import { LoginUserDataDto } from '../dto/users/LoginUserData.dto';
import { AuthenticateDto } from '../dto/auth/authenticate.dto';
import { UserProfileDto } from '../dto/users/readUserProfile.dto';
@Controller('users')
export class UserController {
  constructor(
    private readonly createUserService: CreateUsersService,
    private readonly signupUsersService: SignupUsersService,
    private readonly findOneUsersService: FindOneUsersService,
  ) {}

  @Post()
  @HttpCode(201)
  async createUser(@Body() data: SigninUserDataDto): Promise<CreateUserDto> {
    const result = await this.createUserService.createUser(data);

    return result;
  }

  @Post('/login')
  async loginUser(@Body() data: LoginUserDataDto): Promise<AuthenticateDto> {
    const result = await this.signupUsersService.signupUser(data);

    return result;
  }

  @Get()
  async profile(
    @Headers() Authentication: AuthenticateDto,
  ): Promise<UserProfileDto> {
    const result = await this.findOneUsersService.findOneUser(Authentication);

    return result;
  }
}
