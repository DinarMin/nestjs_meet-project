import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/entity.user';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from 'src/users/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async signUp(userDto: CreateUserDto) {
    const candidate = await this.userService.findOneByEmail(userDto.email);
    if (candidate) return null;

    const hashedPassword: string = await bcrypt.hash(userDto.password, 7);

    const user: User = await this.userService.create({
      ...userDto,
      password: hashedPassword,
    });
    return {
      message: 'Пользователь зарегистрирован',
      email: user.email,
    };
  }

  async singIn(userDto: LoginUserDto) {
    
  }
}
