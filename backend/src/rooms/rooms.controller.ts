import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomsDto } from './dto/create-room.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import type { Request } from 'express';
import { User } from 'src/users/entities/entity.user';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Req() { user }: Request, @Body() roomDto: CreateRoomsDto) {
    const userId = (user as User).id;
    const { memberId } = roomDto;
    const room = await this.roomsService.create(roomDto, userId, memberId);
    return room;
  }
}
