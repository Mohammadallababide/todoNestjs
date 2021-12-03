import { Module } from '@nestjs/common';
import { TodoListModule } from './todo-list';
import { AppConfigModule } from './app-config';
import { DatabaseModule } from './database';

@Module({
  imports: [AppConfigModule, DatabaseModule, TodoListModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
