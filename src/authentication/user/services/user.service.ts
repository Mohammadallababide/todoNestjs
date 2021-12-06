import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models';
import { SequelizeCrudService } from '../../../shared';
import { SpaAuthConstants } from '../../user-auth/shared';
import { SpaAuthService } from '../../user-auth/services';

@Injectable()
export class UserService extends SequelizeCrudService<User> {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    @Inject(SpaAuthConstants.SPA_AUTH_SERVICE_TOKEN)
    private userAuthService: SpaAuthService,
  ) {
    super(userModel);
  }
}
