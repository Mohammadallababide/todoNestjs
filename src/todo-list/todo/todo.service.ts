import { Injectable } from '@nestjs/common';
import { Todo } from './models';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeCrudService } from '../../shared';

@Injectable()
export class TodoService extends SequelizeCrudService<Todo> {
  constructor(
    @InjectModel(Todo)
    private todoModel: typeof Todo,
  ) {
    super(todoModel);
  }
}
