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
import { CreateTodoListDto, UpdateTodoListDto } from './dtos';
import { ApiHeaders, ApiTags } from '@nestjs/swagger';
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
  path: 'todo-list',
})
export class TodoListController {
  /***
   * Creating todo list with providing title
   * @param createTodoListDto
   */
  @Post()
  createTodoList(@Body() createTodoListDto: CreateTodoListDto) {
    dummyTodoLists.push({ ...createTodoListDto, id: new Date().toISOString() });
    return createTodoListDto;
  }

  /***
   * Updating one todo list providing title as an optional field
   * @param updateTodoListDto
   */
  @Put(':id')
  updateTodoList(
    @Param('id') id: string,
    @Body() updateTodoListDto: UpdateTodoListDto,
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
