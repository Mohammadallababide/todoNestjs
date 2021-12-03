import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { Todo } from './models';

@Module({
  imports: [],
  providers: [
    TodoService,
    {
      provide: 'TODO_REPOSITORY',
      useValue: Todo,
    },
  ],
  controllers: [TodoController],
  exports: [
    {
      provide: 'TODO_REPOSITORY',
      useValue: Todo,
    },
  ],
})
export class TodoModule {}
