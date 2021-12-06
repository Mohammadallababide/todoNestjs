import { Controller, UseInterceptors } from '@nestjs/common';
import { CreateTodoDto, UpdateTodoDto } from './dtos';
import { TodoService } from './todo.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { CrudWrapperInterceptor } from '../../shared';
import { Todo } from './models';
@Crud({
  model: {
    type: Todo,
  },
  dto: {
    create: CreateTodoDto,
    update: UpdateTodoDto,
  },
  serialize: {
    get: Todo,
    create: Todo,
  },
  query: {
    alwaysPaginate: true,
  },
})
@UseInterceptors(CrudWrapperInterceptor)
@Controller({
  path: 'todo',
})
export class TodoController implements CrudController<Todo> {
  constructor(public readonly service: TodoService) {}
}
