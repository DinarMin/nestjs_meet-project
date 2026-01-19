import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Rooms } from 'src/rooms/entities/enity.rooms';
import { User } from 'src/users/entities/entity.user';

export enum MessageType {
  TEXT = 'text',
  IMAGE = 'image',
  CALL_LOG = 'call_log',
}

@Entity()
export class Messages {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Rooms, (rooms) => rooms.messages)
  @JoinColumn({ name: 'roomId' })
  rooms: Rooms;

  @ManyToOne(() => User, (user) => user.messages)
  @JoinColumn({ name: 'senderId' })
  user: User;

  @Column()
  text: string;

  @Column({
    type: 'enum',
    enum: MessageType,
  })
  type: MessageType;

  @CreateDateColumn({ name: 'created' })
  createdAt!: Date;

  @CreateDateColumn({ name: 'deleted_at' })
  deltedAt?: Date | null;
}
