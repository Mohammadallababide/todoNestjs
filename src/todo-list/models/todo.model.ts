import { Optional } from 'sequelize';
import { Column, Table } from 'sequelize-typescript';
import { Model } from 'sequelize-typescript';
export interface TodoAttributes {
  id: number;
  title: string;
  content: string;
}
export type TodoCreationAttributes = Optional<TodoAttributes, 'id'>;

@Table({
  paranoid: true,
  timestamps: true,
  version: true,
  tableName: 'todos',
  freezeTableName: true,
})
export class Todo
  extends Model<TodoAttributes, TodoCreationAttributes>
  implements TodoAttributes
{
  @Column({
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({})
  title: string;

  @Column
  content: string;
}
