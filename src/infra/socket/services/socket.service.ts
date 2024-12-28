import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';
import { AudioPlayAndPauseDto } from '../dto/audio-play-and-pause.dto';
import { AudioVolumeDto } from '../dto/audio-volume.dto';
import { ImageDto } from '../dto/image.dto';
import { InviteDto } from '../dto/invite.dto';
import { ItemDto } from '../dto/item.dto';
import { RollDiceDto } from '../dto/roll-dice.dto';
import { StatusCharacterDto } from '../dto/status-character.dto';
import { XPDto } from '../dto/xp.dto';

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

  handleXPEvent(server: Server, data: XPDto) {
    const { characterId, xp } = data;

    server.emit(`xp?${characterId}`, {
      xp,
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

    if (characterId) {
      server.emit(`roll-dice-character?${characterId}`, {
        dice,
        isCritical,
        isD20,
        isDisaster,
        name,
        portrait,
      });
    }

    if (sessionId) {
      server.emit(`roll-dice-session?${sessionId}`, {
        dice,
        isCritical,
        isD20,
        isDisaster,
        name,
        portrait,
      });
    }
  }

  handlePlayAudio(server: Server, data: AudioPlayAndPauseDto) {
    const { userId, audioUrl, currentTime } = data;

    server.emit(`audio-play?${userId}`, {
      audioUrl,
      currentTime,
    });
  }

  handlePauseAudio(server: Server, data: AudioPlayAndPauseDto) {
    const { userId, currentTime } = data;

    server.emit(`audio-pause?${userId}`, {
      currentTime,
    });
  }

  handleChangeAudioVolume(server: Server, data: AudioVolumeDto) {
    const { userId, volume, audioUrl } = data;

    server.emit(`audio-volume?${userId}`, {
      audioUrl,
      volume,
    });
  }
}
