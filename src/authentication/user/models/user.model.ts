import { Optional } from 'sequelize';
import { Column, DataType, Table, Unique } from 'sequelize-typescript';
import { Model } from 'sequelize-typescript';
export interface UserAttributes {
  id: number;
  name: string;
  email: string;
}
export type UserCreationAttributes = Optional<UserAttributes, 'id'>;

@Table({
  paranoid: true,
  timestamps: true,
  version: false,
  tableName: 'users',
  freezeTableName: true,
})
export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
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
  name: string;

  @Unique
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;
}
