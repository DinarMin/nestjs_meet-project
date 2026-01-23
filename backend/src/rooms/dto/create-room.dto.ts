import { IsEnum, IsNumber, IsString } from 'class-validator';
import { RoomType } from '../entities/enity.rooms';

export class CreateRoomsDto {
  @IsString()
  readonly name: string;

  @IsEnum(RoomType)
  type: RoomType;

  @IsNumber()
  deleted_at: number;

  @IsString()
  memberId: string;
}
