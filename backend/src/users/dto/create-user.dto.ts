import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly username: string;

  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}
