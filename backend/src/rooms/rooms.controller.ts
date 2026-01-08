import { Controller, Post } from '@nestjs/common';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post('create')
  createRoom() {
    return this.roomsService.generateRoom();
  }
}
