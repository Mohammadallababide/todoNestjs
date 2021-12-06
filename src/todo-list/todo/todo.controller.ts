import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CreateTodoDto, UpdateTodoDto } from './dtos';
import { ApiHeaders, ApiTags } from '@nestjs/swagger';
import { TodoService } from './todo.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { TodoList } from '../models';
import { CreateTodoListDto, UpdateTodoListDto } from '../dtos';
import { CrudWrapperInterceptor } from '../../shared';
import { Todo } from './models';
@ApiTags('Todo-List Controller')
@ApiHeaders([
  {
    name: 'Authorization',
    required: true,
    description: 'JWT token is required for authentication',
  },
])
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
