import {
  Body,
  Controller,
  Post,
  Res,
  Req,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { Request, Response } from 'express';

import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth-guard';
import type { LoginUser } from '../users/interfaces/login-user.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() userDto: CreateUserDto) {
    const user = await this.authService.signUp(userDto);

    if (!user) {
      throw new HttpException(
        'Пользователь с таким email уже зарегистрирован!',
        HttpStatus.BAD_REQUEST,
      );
    }
    return user;
  }

  @Post('signin')
  @UseGuards(LocalAuthGuard)
  async signIn(
    @Req() req: Request & { user: LoginUser },
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.authService.singIn(req.user);
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return { accessToken: tokens.accessToken };
  }

  @Post('update')
  async updateTokens(@Req() req: Request) {
    const refreshToken: string = req.cookies.refreshToken;
    const accessToken: string | null =
      await this.authService.updateAccessToken(refreshToken);

    if (!accessToken) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    return { accessToken };
  }
}
