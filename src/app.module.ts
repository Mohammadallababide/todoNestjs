import { Module } from '@nestjs/common';
import { TodoListModule } from './todo-list';
import { AppConfigModule } from './app-config';
import { DatabaseModule } from './database';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';


@Module({
  imports: [
    AppConfigModule, DatabaseModule, TodoListModule,AuthModule, UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
