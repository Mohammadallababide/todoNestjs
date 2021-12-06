import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models';
import { UserController } from './controllers';
import { UserService } from './services';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, SequelizeModule.forFeature([User])],
})
export class UserModule {}
