import { Optional } from 'sequelize';
import { Column, DataType, Table } from 'sequelize-typescript';
import { Model } from 'sequelize-typescript';
export interface TodoListAttributes {
  id: number;
  title: string;
}
export type TodoListCreationAttributes = Optional<TodoListAttributes, 'id'>;

@Table({
  paranoid: true,
  timestamps: true,
  version: false,
  tableName: 'todos',
  freezeTableName: true,
})
export class TodoList
  extends Model<TodoListAttributes, TodoListCreationAttributes>
  implements TodoListAttributes
{
  @Column({
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;
}
