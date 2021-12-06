import { IsEmail, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class UserDto {
  @IsPositive()
  id: number;
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  name: string;
}
