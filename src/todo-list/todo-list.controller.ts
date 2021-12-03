import {
  ClassSerializerInterceptor,
  Controller,
  UseInterceptors,
} from '@nestjs/common';
import { TodoListService } from './todo-list.service';
import { CreateTodoListDto, UpdateTodoListDto } from './dtos';
import { Crud, CrudController } from '@nestjsx/crud';
import { TodoList } from './models';
import { CrudWrapperInterceptor } from '../shared';
@Crud({
  model: {
    type: TodoList,
  },
  dto: {
    create: CreateTodoListDto,
    update: UpdateTodoListDto,
  },
  serialize: {
    get: TodoList,
    create: TodoList,
  },
  query: {
    alwaysPaginate: true,
  },
  validation: {},
})
@UseInterceptors(CrudWrapperInterceptor)
@Controller('todo-list')
export class TodoListController implements CrudController<TodoList> {
  constructor(public readonly service: TodoListService) {}
}
