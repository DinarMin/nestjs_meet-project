import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rooms } from './entities/enity.rooms';
import { Participant } from './entities/enity.participant';

@Module({
  imports: [TypeOrmModule.forFeature([Rooms, Participant])],
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class RoomsModule {}
