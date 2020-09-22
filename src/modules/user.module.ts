import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AuthModule } from './auth.module';
import { UserController } from '../controllers/user.controller';
//import { UsersService } from '../services/users.service';
import { usersProviders } from '../models/user/users.providers';
import { User } from '../models/user/user.entity';
import { CreateUsersService } from '../services/users/createUser.service';
import { SignupUsersService } from '../services/users/sginupUser.service';
import { FindOneUsersService } from '../services/users/findOneUser.service';

@Module({
  imports: [SequelizeModule.forFeature([User]), AuthModule],
  controllers: [UserController],
  providers: [
    CreateUsersService,
    SignupUsersService,
    FindOneUsersService,
    ...usersProviders,
  ],
})
export class UserModule {}
