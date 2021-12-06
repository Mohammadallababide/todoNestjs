import { Module } from '@nestjs/common';
import { TodoListModule } from './todo-list';
import { AppConfigModule } from './app-config';
import { DatabaseModule } from './database';
import { AuthenticationModule } from './authentication';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    TodoListModule,
    AuthenticationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
