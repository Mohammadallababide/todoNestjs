import { Injectable } from '@nestjs/common';
import { Todo } from './models';
import { CreateTodoDto } from './dtos';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo)
    private todoModel: typeof Todo,
  ) {}

  createOne(createTodoDto: CreateTodoDto) {
    console.log({
      createTodoDto,
    });
    return this.todoModel.create<Todo>({
      title: createTodoDto.title,
      content: createTodoDto.content,
      todoListId: createTodoDto.todoListId,
    });
  }
}
