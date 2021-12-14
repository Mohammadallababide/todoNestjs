// import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
// import { Optional } from 'sequelize';
// import {
//   Column,
//   DataType,
//   Table,
//   BeforeCreate,
//   Model
// } from 'sequelize-typescript';
// import { UserI } from './user.interface';

// export type UserCreationAttributes = Optional<UserI, 'id'>;

// @Table(
//     { 
//         paranoid: true,
//         timestamps: true,
//         version: true,
//         tableName: 'user',
//         freezeTableName: true,
//     }
// )
// export class User  extends Model<UserI, UserCreationAttributes>
// implements UserI {
//     @Column({
//         autoIncrement: true,
//         primaryKey: true,
//         type: DataType.INTEGER,
//       })
//     id: number; 

//     @Column
//     name: string;

//     @Column({unique: true})
//     email: string;

//     @Column
//     password: string;

//     @BeforeCreate
//     emailToLowerCase() {
//         this.email = this.email.toLowerCase();
//     }
// }
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number; 

    @Column()
    name: string;

    @Column({unique: true})
    email: string;

    @Column({select: false})
    password: string;

    @BeforeInsert()
    emailToLowerCase() {
        this.email = this.email.toLowerCase();
    }
}