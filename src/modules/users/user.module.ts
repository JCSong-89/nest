import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { UserController } from '../../controllers/user/user.controller';
import { UsersService } from '../../services/users/users.service';
import { usersProviders } from '../../database/models/user/users.providers';
import { User } from '../../database/models/user/user.entity';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [UserController],
  providers: [UsersService, ...usersProviders],
})
export class UserModule {}
