import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { StatusCharacterDto } from '../dto/status-character.dto';
import { SocketService } from '../services/socket.service';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000', 'https://rpg.lucasanes.com'],
  },
})
export class SocketGateway {
  @WebSocketServer() server: Server;

  constructor(private readonly socketService: SocketService) {}

  @SubscribeMessage('status-character')
  handleStatusUpdate(
    @MessageBody()
    data: StatusCharacterDto,
    // @ConnectedSocket() client: Socket,
  ) {
    this.socketService.handleStatusEvent(this.server, data);
  }
}
