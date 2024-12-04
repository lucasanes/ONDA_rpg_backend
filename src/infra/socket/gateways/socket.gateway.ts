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
    origin: '*',
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

  @SubscribeMessage('enviado.itemImg')
  handleItemImg(
    @MessageBody() data: { fichaId?: string; payload: any; sessaoId?: string },
  ) {
    this.socketService.handleItemImage(this.server, data);
  }

  @SubscribeMessage('dado.rolado')
  handleDiceRoll(@MessageBody() data: { fichaId: string; payload: any }) {
    this.socketService.handleDiceRoll(this.server, data);
  }
}
