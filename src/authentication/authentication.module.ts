import { Module } from '@nestjs/common';
import { UserModule } from './user';
import { UserAuthModule } from './user-auth/user-auth.module';
import { AuthController } from './auth.controller';
import { AuthenticationService } from './authentication.service';

@Module({
  imports: [
    UserModule,
    UserAuthModule.register({
      useAccessToken: {
        jwtAccessSecretKey: 'some_secret_key',
        jwtAccessActivationPeriod: '5 minutes',
      },
      useRefreshToken: {
        jwtRefreshSecretKey: 'jwt_refresh',
        jwtRefreshActivationPeriod: '15 days',
      },
    }),
  ],
  providers: [AuthenticationService],
  controllers: [AuthController],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
