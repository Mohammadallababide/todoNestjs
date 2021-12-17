import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { AuthModule } from 'src/auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    AuthModule
  ],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}