import { Injectable } from '@nestjs/common';
import { ExceptionService } from '@src/domain/exceptions/exception.interface';
import { AuthRepository } from '@src/domain/repositories/auth/auth.repository';
import { InviteRepository } from '@src/domain/repositories/invite/invite.repository';
import { SessionRepository } from '@src/domain/repositories/session/session.repository';
import {
  CreateInviteUsecase,
  CreateInviteUsecaseInput,
  CreateInviteUsecaseOutput,
} from '@src/domain/usecases/invite/create-invite.usecase';

@Injectable()
export class CreateInviteUsecaseImpl implements CreateInviteUsecase {
  constructor(
    private readonly inviteRepository: InviteRepository,
    private readonly authRepository: AuthRepository,
    private readonly sessionRepository: SessionRepository,
    private readonly exceptionService: ExceptionService,
  ) {}

  async execute(
    params: CreateInviteUsecaseInput,
  ): Promise<CreateInviteUsecaseOutput> {
    const session = await this.sessionRepository.getById(params.sessionId);

    if (!session) {
      throw this.exceptionService.notFoundException({
        code_error: 'NOT_FOUND',
        message: 'Sessão não encontrada.',
      });
    }

    const user = await this.authRepository.getUserBy({ email: params.email });

    if (!user) {
      throw this.exceptionService.notFoundException({
        code_error: 'NOT_FOUND',
        message: 'Usuário não encontrado.',
      });
    }

    return await this.inviteRepository.save(params);
  }
}
