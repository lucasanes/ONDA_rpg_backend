import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';
import { ImageDto } from '../dto/image.dto';
import { InviteDto } from '../dto/invite.dto';
import { ItemDto } from '../dto/item.dto';
import { RollDiceDto } from '../dto/roll-dice.dto';
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

  handleSendInvite(server: Server, data: InviteDto) {
    const { userId, id, sessionId, session } = data;

    server.emit(`invite?${userId}`, {
      id,
      session,
      sessionId,
    });
  }

  handleSendItem(server: Server, data: ItemDto) {
    const { characterId, sessionId, senderName } = data;

    const isSession = !!sessionId;
    const id = isSession ? sessionId : characterId;

    server.emit(`item?isSession=${isSession}?${id}`, {
      senderName,
    });
  }

  handleSendImage(server: Server, data: ImageDto) {
    const { sessionId, image } = data;

    server.emit(`image?${sessionId}`, {
      image,
    });
  }

  handleCleanImage(server: Server, data: ImageDto) {
    const { sessionId } = data;

    server.emit(`clean-image?${sessionId}`);
  }

  handleRollDice(server: Server, data: RollDiceDto) {
    const {
      name,
      portrait,
      sessionId,
      characterId,
      isCritical,
      isDisaster,
      dice,
      isD20,
    } = data;

    if (!sessionId && !characterId) return;

    if (characterId) {
      server.emit(`roll-dice?${characterId}`, {
        dice,
        isCritical,
        isD20,
        isDisaster,
        name,
        portrait,
      });
      return;
    }

    if (sessionId) {
      server.emit(`roll-dice?${sessionId}`, {
        dice,
        isCritical,
        isD20,
        isDisaster,
        name,
        portrait,
      });
    }
  }
}
