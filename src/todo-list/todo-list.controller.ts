import { Body, Controller, Post } from '@nestjs/common';
import { TodoListService } from './todo-list.service';
import { CreateTodoListDto } from './dtos';

@Controller('todo-list')
export class TodoListController {
  constructor(private readonly todoListService: TodoListService) {}
  @Post()
  createTodoList(@Body() createTodoList: CreateTodoListDto) {
    return this.todoListService.createTodoList(createTodoList);
  }
}
