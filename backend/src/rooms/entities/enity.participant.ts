import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Rooms } from './enity.rooms';
import { User } from 'src/users/entities/entity.user';

export enum RoleType {
  ADMIN = 'admin',
  MEMBER = 'member',
}

@Entity()
export class Participant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.participants)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Rooms, (rooms) => rooms.participants)
  @JoinColumn({ name: 'roomId' })
  rooms: Rooms;

  @Column({
    type: 'enum',
    enum: RoleType,
    default: RoleType.MEMBER,
  })
  role: RoleType;

  @Column('int')
  lastReadMessageId: number;
}
