import { Body, Controller, Post, Res, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth-guard';
import type { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() userDto: CreateUserDto) {
    const user = await this.authService.signUp(userDto);
    return user;
  }

  @Post('signin')
  @UseGuards(LocalAuthGuard)
  async signIn(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const tokens = await this.authService.singIn(req.user!);
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return { accessToken: tokens.accessToken };
  }
}
