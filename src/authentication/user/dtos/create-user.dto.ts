import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsString()
  email: string;
  @IsNotEmpty()
  @IsString()
  name: string;
}
