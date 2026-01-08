import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() userDto: CreateUserDto) {
    const user = await this.authService.signUp(userDto);
    return user;
  }

  @UseGuards(AuthGuard('local'))
  @Post('signin')
  async signIn(@Body() userDto: LoginUserDto) {
    const user = await this.authService.singIn(userDto);
    console.log(user);
    return user;
  }
}
