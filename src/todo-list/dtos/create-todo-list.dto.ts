import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoListDto {
  /***
   * Todo list title
   */
  @IsString()
  @IsNotEmpty()
  title: string;
}
