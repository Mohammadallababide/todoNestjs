import { Module } from '@nestjs/common';
import { TodoListService } from './todo-list.service';
import { TodoListController } from './todo-list.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { TodoList } from './models';
import { TodoModule } from './todo';

@Module({
  imports: [SequelizeModule.forFeature([TodoList]), TodoModule],
  providers: [TodoListService],
  controllers: [TodoListController],
})
export class TodoListModule {}
