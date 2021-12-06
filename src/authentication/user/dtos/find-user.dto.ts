import { PickType } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class FindUserDto extends PickType<UserDto, 'id'>(UserDto, ['id']) {}
