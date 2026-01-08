import { isString } from 'class-validator';

export class LoginUserDto {
  @isString()
  email: string;
  @isString()
  password: string;
}
