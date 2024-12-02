import { SessionModel } from '@src/domain/model/session.model';

export abstract class SessionRepository {
  abstract findByUserId(userId: number): Promise<SessionModel[]>;
}
