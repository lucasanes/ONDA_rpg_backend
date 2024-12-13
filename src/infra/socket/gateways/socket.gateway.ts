import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { AudioPlayAndPauseDto } from '../dto/audio-play-and-pause.dto';
import { AudioVolumeDto } from '../dto/audio-volume.dto';
import { CleanImageDto } from '../dto/clean-image.dto';
import { ImageDto } from '../dto/image.dto';
import { InviteDto } from '../dto/invite.dto';
import { ItemDto } from '../dto/item.dto';
import { RollDiceDto } from '../dto/roll-dice.dto';
import { StatusCharacterDto } from '../dto/status-character.dto';
import { XPDto } from '../dto/xp.dto';
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

  @SubscribeMessage('xp')
  handleXPUpdate(
    @MessageBody()
    data: XPDto,
    // @ConnectedSocket() client: Socket,
  ) {
    this.socketService.handleXPEvent(this.server, data);
  }

  @SubscribeMessage('invite')
  handleSendInvite(
    @MessageBody()
    data: InviteDto,
  ) {
    this.socketService.handleSendInvite(this.server, data);
  }

  @SubscribeMessage('item')
  handleSendItem(
    @MessageBody()
    data: ItemDto,
  ) {
    this.socketService.handleSendItem(this.server, data);
  }

  @SubscribeMessage('image')
  handleSendImage(
    @MessageBody()
    data: ImageDto,
  ) {
    this.socketService.handleSendImage(this.server, data);
  }

  @SubscribeMessage('clean-image')
  handleCleanImage(
    @MessageBody()
    data: CleanImageDto,
  ) {
    this.socketService.handleCleanImage(this.server, data);
  }

  @SubscribeMessage('roll-dice')
  handleRollDice(
    @MessageBody()
    data: RollDiceDto,
  ) {
    this.socketService.handleRollDice(this.server, data);
  }

  @SubscribeMessage('audio-play')
  handlePlayAudio(
    @MessageBody()
    data: AudioPlayAndPauseDto,
  ) {
    this.socketService.handlePlayAudio(this.server, data);
  }

  @SubscribeMessage('audio-pause')
  handlePauseAudio(
    @MessageBody()
    data: AudioPlayAndPauseDto,
  ) {
    this.socketService.handlePauseAudio(this.server, data);
  }

  @SubscribeMessage('audio-volume')
  handleChangeAudioVolume(
    @MessageBody()
    data: AudioVolumeDto,
  ) {
    this.socketService.handleChangeAudioVolume(this.server, data);
  }
}
