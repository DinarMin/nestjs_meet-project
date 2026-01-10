/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/entity.user';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

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

  async singIn(userData) {
    // const user = await this.userService.findOneByEmail();

    const tokens = await this.genereatedTokens(userData);

    return tokens;
  }

  async validateUser(userDto: LoginUserDto) {
    const user = await this.userService.findOneByEmail(userDto.email);

    if (!user) {
      throw new NotFoundException('Пользователь не существует!');
    }

    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );

    if (passwordEquals) return user;

    throw new UnauthorizedException({
      message: 'Не правильный логин или пароль!',
    });
  }

  private async genereatedTokens(id: string) {
    const payload = { id };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.getOrThrow('JWT_ACCESS_SECRET'),
      expiresIn: this.configService.getOrThrow('JWT_ACCESS_EXPIRE'),
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.getOrThrow('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.getOrThrow('JWT_REFRESH_EXPIRE'),
    });

    const tokens = { accessToken, refreshToken };

    return tokens;
  }

  verifyRefreshToken(refreshToken: string) {
    const payload = this.jwtService.verify(refreshToken, {
      secret: this.configService.getOrThrow('JWT_REFRESH_SECRET'),
    });

    return payload;
  }

  async updateAccessToken(refreshToken: string) {
    try {
      const userId = this.verifyRefreshToken(refreshToken);

      const tokens = await this.genereatedTokens(userId);

      return tokens.accessToken;
    } catch (e) {
      return null;
    }
  }
}
