import { Module } from '@nestjs/common';
import { TodoListModule } from './todo-list';
import { AppConfigModule } from './app-config';
import { DatabaseModule } from './database';
import { UserAuthModule } from '@app/user-auth/user-auth.module';
import { AuthController } from '@app/user-auth/auth.controller';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    TodoListModule,
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
  controllers: [AuthController],
  providers: [],
})
export class AppModule {}
