import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';
import { StatusCharacterDto } from '../dto/status-character.dto';

@Injectable()
export class SocketService {
  handleStatusEvent(server: Server, data: StatusCharacterDto) {
    const { characterId, key, value } = data;
    console.log(data);
    server.emit(`status-character?${characterId}`, {
      key,
      value,
    });
  }

  handleItemImage(
    server: Server,
    data: { fichaId?: string; payload: any; sessaoId?: string },
  ) {
    if (data.fichaId) {
      server.emit(`enviado.itemImg?${data.fichaId}`, data.payload);
    }
    if (data.sessaoId) {
      server.emit(`enviado.itemImg?${data.sessaoId}`, data.payload);
    }
  }

  handleDiceRoll(server: Server, data: { fichaId: string; payload: any }) {
    server.emit('dado.rolado', data.payload);
    server.emit(`dado.rolado?${data.fichaId}`, data.payload);
  }
}
