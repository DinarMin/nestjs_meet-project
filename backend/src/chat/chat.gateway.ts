import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    console.log('New user connected.. : ', client.id);

    this.server.emit('user-joined', {
      message: `New user joined the chat: ${client.id}`,
    });
  }

  handleDisconnect(client: Socket) {
    console.log('User disconnected', client.id);
  }

  @SubscribeMessage('join-room')
  handleJoinRoom(
    @MessageBody() data: { roomId: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.join(data.roomId);
  }

  @SubscribeMessage('room-message')
  handleRoomMessage(
    @MessageBody() data: { roomId: string; message: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.to(data.roomId).emit('room-message', {
      message: data.message,
      from: client.id,
    });
  }
}
