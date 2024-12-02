import { InviteModel } from '@src/domain/model/invite.model';

export abstract class InviteRepository {
  abstract findByUserId(userId: number): Promise<InviteModel[]>;
}
