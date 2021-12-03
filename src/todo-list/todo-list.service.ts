import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TodoList } from './models';
import { CreateTodoListDto } from './dtos';

@Injectable()
export class TodoListService {
  constructor(
    @InjectModel(TodoList)
    private readonly todoListModel: typeof TodoList,
  ) {}

  createTodoList(createTodoListDto: CreateTodoListDto) {
    return this.todoListModel.create({
      title: createTodoListDto.title,
    });
  }
}
