import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rooms } from './entities/enity.rooms';
import { DataSource, Repository } from 'typeorm';
import { CreateRoomsDto } from './dto/create-room.dto';
import { Participant, RoleType } from './entities/enity.participant';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Rooms)
    private roomsRepository: Repository<Rooms>,
    private dataSource: DataSource,
  ) {}

  async create(RoomDto: CreateRoomsDto, userId, memberId) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const roomRepo = queryRunner.manager.getRepository(Rooms);
      const participantRepo = queryRunner.manager.getRepository(Participant);

      const room = roomRepo.create({ ...RoomDto });
      const savedRoom = await roomRepo.save(room);

      const participant = participantRepo.create([
        {
          user: { id: userId },
          rooms: savedRoom,
          role: RoleType.ADMIN,
          lastReadMessageId: 0,
        },
        {
          user: { id: memberId },
          rooms: savedRoom,
          lastReadMessageId: 0,
        },
      ]);

      await participantRepo.save(participant);

      await queryRunner.commitTransaction();
      return {
        room: { ...room },
        participant: { ...participant },
      };
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
