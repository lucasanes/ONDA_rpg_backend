import { Injectable } from '@nestjs/common';
import { CharacterRepository } from '@src/domain/repositories/character/character.repository';
import { InviteRepository } from '@src/domain/repositories/invite/invite.repository';
import { SessionRepository } from '@src/domain/repositories/session/session.repository';
import {
  GetDashboardUsecase,
  GetDashboardUsecaseInput,
  GetDashboardUsecaseOutput,
} from '@src/domain/usecases/dashboard/get-dashboard.usecase';

@Injectable()
export class GetDashboardUsecaseImpl implements GetDashboardUsecase {
  constructor(
    private readonly sessionRepository: SessionRepository,
    private readonly characterRepository: CharacterRepository,
    private readonly inviteRepository: InviteRepository,
  ) {}

  async execute(
    params: GetDashboardUsecaseInput,
  ): Promise<GetDashboardUsecaseOutput> {
    const { userId } = params;

    const sessions = await this.sessionRepository.findByUserId(userId);

    const characters = await this.characterRepository.findByUserId(userId);

    const invites = await this.inviteRepository.findByUserId(userId);

    return {
      characters,
      invites,
      sessions,
    };
  }
}
