import { Module } from '@nestjs/common';
import { TodoListModule } from './todo-list';

@Module({
  imports: [TodoListModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
