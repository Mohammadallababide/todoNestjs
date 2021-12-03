import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class TodoListDto {
  @IsPositive()
  id: number;
  /***
   * Todo list title
   */
  @IsString()
  @IsNotEmpty()
  title: string;

  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}
