import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTodoDto, UpdateTodoDto } from './dtos';
import { ApiHeaders, ApiTags } from '@nestjs/swagger';
import { TodoService } from './todo.service';
const dummyTodoLists = [];
@ApiTags('Todo-List Controller')
@ApiHeaders([
  {
    name: 'Authorization',
    required: true,
    description: 'JWT token is required for authentication',
  },
])
@Controller({
  path: 'todo',
})
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  /***
   * Creating todo list with providing title
   * @param createTodoDto
   */
  @Post()
  createTodo(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.createOne(createTodoDto);
  }

  /***
   * Updating one todo list providing title as an optional field
   * @param updateTodoListDto
   */
  @Put(':id')
  updateTodoList(
    @Param('id') id: string,
    @Body() updateTodoListDto: UpdateTodoDto,
  ) {
    const todoList = dummyTodoLists.filter((tl) => tl.id === id)[0];

    if (!todoList) {
      throw new NotFoundException('Todo list does not exist');
    }
    todoList.title = updateTodoListDto.title;
    return todoList;
  }

  /***
   * Deleting todo list by id
   * @param id
   */
  @Delete(':id')
  deleteTodoList(@Param('id') id: string) {
    return 'deleted ' + id;
  }

  /***
   * Getting all todo lists in the system
   */
  @Get()
  findAllTodoLists() {
    return dummyTodoLists;
  }
}
