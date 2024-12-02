import { Injectable } from '@nestjs/common';
import { ExceptionService } from '@src/domain/exceptions/exception.interface';
import { AuthRepository } from '@src/domain/repositories/auth/auth.repository';
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
    private readonly authRepository: AuthRepository,
    private readonly sessionRepository: SessionRepository,
    private readonly characterRepository: CharacterRepository,
    private readonly inviteRepository: InviteRepository,
    private readonly exceptionService: ExceptionService,
  ) {}

  async execute(
    params: GetDashboardUsecaseInput,
  ): Promise<GetDashboardUsecaseOutput> {
    const { userId } = params;

    const user = await this.authRepository.getUserById(userId);

    if (!user) {
      throw this.exceptionService.notFoundException({
        code_error: 'NOT_FOUND',
        message: 'Usuário não encontrado.',
      });
    }

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
