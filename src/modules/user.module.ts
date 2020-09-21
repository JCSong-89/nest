import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AuthModule } from './auth.module';
import { UserController } from '../controllers/user.controller';
import { UsersService } from '../services/users.service';
import { usersProviders } from '../models/user/users.providers';
import { User } from '../models/user/user.entity';

@Module({
  imports: [SequelizeModule.forFeature([User]), AuthModule],
  controllers: [UserController],
  providers: [UsersService, ...usersProviders],
})
export class UserModule {}
