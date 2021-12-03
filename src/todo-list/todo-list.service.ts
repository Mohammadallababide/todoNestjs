import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TodoList } from './models';
import { SequelizeCrudService } from '../shared';

@Injectable()
export class TodoListService extends SequelizeCrudService<TodoList> {
  constructor(
    @InjectModel(TodoList)
    private readonly todoListModel,
  ) {
    super(todoListModel);
  }
}
