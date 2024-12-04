import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';
import { StatusCharacterDto } from '../dto/status-character.dto';

@Injectable()
export class SocketService {
  handleStatusEvent(server: Server, data: StatusCharacterDto) {
    const { characterId, key, value } = data;

    server.emit(`status-character?${characterId}`, {
      key,
      value,
    });
  }
}
