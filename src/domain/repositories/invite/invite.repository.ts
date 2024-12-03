import { InviteModel } from '@src/domain/model/invite.model';
import { SaveInviteParams } from './types';

export abstract class InviteRepository {
  abstract getById(id: number): Promise<InviteModel>;
  abstract findByUserId(userId: number): Promise<InviteModel[]>;
  abstract save(invite: SaveInviteParams): Promise<InviteModel>;
  abstract delete(id: number): Promise<void>;
}
