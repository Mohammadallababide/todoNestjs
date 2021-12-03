import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateTodoDto {
  /***
   * Todo title
   */
  @IsString()
  @IsNotEmpty()
  title: string;

  /***
   * Todo content
   */
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsPositive()
  todoListId: number;
}
