import { Optional } from 'sequelize';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Table,
} from 'sequelize-typescript';
import { Model } from 'sequelize-typescript';
import { TodoList } from '../../models';
export interface TodoAttributes {
  id: number;
  title: string;
  content: string;
  todoListId: number;
}
export type TodoCreationAttributes = Optional<TodoAttributes, 'id'>;

@Table({
  paranoid: true,
  timestamps: true,
  version: true,
  tableName: 'todo',
  freezeTableName: true,
})
export class Todo
  extends Model<TodoAttributes, TodoCreationAttributes>
  implements TodoAttributes
{
  @Column({
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
  })
  id: number;

  @Column
  title: string;

  @Column
  content: string;

  @Column({
    type: DataType.ENUM,
    values: ['TODO', 'DONE'],
    defaultValue: 'TODO',
  })
  status: 'TODO' | 'DONE';

  @ForeignKey(() => TodoList)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  todoListId: number;

  @BelongsTo(() => TodoList)
  todoList: TodoList;
}
