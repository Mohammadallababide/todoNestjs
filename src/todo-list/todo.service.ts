import { Inject, Injectable } from '@nestjs/common';
import { Todo } from './models';
import { CreateTodoDto } from './dtos';

@Injectable()
export class TodoService {
  constructor(
    @Inject('TODO_REPOSITORY')
    private todoModel: typeof Todo,
  ) {}

  createOne(createTodoDto: CreateTodoDto) {
    return this.todoModel.create({
      title: createTodoDto.title,
      content: createTodoDto.content,
    });
  }
}
