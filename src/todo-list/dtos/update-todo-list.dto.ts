import { CreateTodoListDto } from './create-todo-list.dto';
import { PartialType } from '@nestjs/swagger';
export class UpdateTodoListDto extends PartialType<CreateTodoListDto>(
  CreateTodoListDto,
) {}
