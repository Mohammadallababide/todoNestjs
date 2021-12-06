import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user/models';
import { CreateUserDto } from './user/dtos';
import { FindOptions } from 'sequelize';

@Injectable()
export class AuthenticationService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}
  createUser(createUserDto: CreateUserDto) {
    return this.userModel.create({
      ...createUserDto,
    });
  }
  async findUser<T extends User>(findOptions: FindOptions) {
    const user = await this.userModel.findOne(findOptions);
    if (!user) {
      throw {
        message: 'User not found',
      };
    }
    return user;
  }
}
