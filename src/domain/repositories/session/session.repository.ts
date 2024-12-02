import { SessionModel } from '@src/domain/model/session.model';
import { SaveSessionParams, UpdateSessionParams } from './types';

export abstract class SessionRepository {
  abstract findByUserId(userId: number): Promise<SessionModel[]>;
  abstract getById(id: number): Promise<SessionModel | null>;
  abstract save(session: SaveSessionParams): Promise<SessionModel>;
  abstract update(session: UpdateSessionParams): Promise<void>;
  abstract delete(id: number): Promise<void>;
}
