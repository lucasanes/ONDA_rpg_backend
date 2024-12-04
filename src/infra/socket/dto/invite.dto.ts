import { SessionModel } from '@src/domain/model/session.model';

export interface InviteDto {
  id: number;
  session: SessionModel;
  sessionId: number;
  userId: number;
}
