import { Injectable } from '@nestjs/common';
import { ExceptionService } from '@src/domain/exceptions/exception.interface';
import { CharacterRepository } from '@src/domain/repositories/character/character.repository';
import { InviteRepository } from '@src/domain/repositories/invite/invite.repository';
import {
  AcceptInviteUsecase,
  AcceptInviteUsecaseInput,
  AcceptInviteUsecaseOutput,
} from '@src/domain/usecases/invite/accept-invite.usecase';

@Injectable()
export class AcceptInviteUsecaseImpl implements AcceptInviteUsecase {
  constructor(
    private readonly inviteRepository: InviteRepository,
    private readonly characterRepository: CharacterRepository,
    private readonly exceptionService: ExceptionService,
  ) {}

  async execute(
    params: AcceptInviteUsecaseInput,
  ): Promise<AcceptInviteUsecaseOutput> {
    const { id, characterId } = params;

    const invite = await this.inviteRepository.getById(id);

    if (!invite) {
      throw this.exceptionService.notFoundException({
        code_error: 'NOT_FOUND',
        message: 'Invite not found',
      });
    }

    await this.characterRepository.update({
      id: characterId,
      sessionId: invite.sessionId,
    });

    await this.inviteRepository.delete(id);
  }
}
