import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoDto {
  /***
   * Todo list title
   */
  @IsString()
  @IsNotEmpty()
  title: string;

  /***
   * Todo list content
   */
  @IsString()
  @IsNotEmpty()
  content: string;
}
