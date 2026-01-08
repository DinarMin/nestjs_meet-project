import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RoomsService {
  private activeRooms = new Set<string>();

  generateRoom(): { roomId: string } {
    const roomId = uuidv4();
    this.activeRooms.add(roomId);
    return { roomId };
  }

  checkRoomExists(roomId: string): boolean {
    return this.activeRooms.has(roomId);
  }
}
