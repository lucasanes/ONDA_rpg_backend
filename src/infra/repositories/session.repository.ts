import { Injectable } from '@nestjs/common';
import { SessionRepository } from '@src/domain/repositories/session/session.repository';

import { SessionModel } from '@src/domain/model/session.model';
import { Session } from '../entities/session.entity';
import { BaseRepository } from './base.repository';

@Injectable()
export class SessionRepositoryImpl
  extends BaseRepository
  implements SessionRepository
{
  async findByUserId(userId: number): Promise<SessionModel[]> {
    const sessions = await this.getRepository(Session).find({
      where: {
        userId,
      },
    });

    return sessions.map((session) => new SessionModel(session));
  }
}
