import { Injectable } from '@nestjs/common';
import { SessionRepository } from '@src/domain/repositories/session/session.repository';
import {
  DeleteSessionUsecase,
  DeleteSessionUsecaseInput,
  DeleteSessionUsecaseOutput,
} from '@src/domain/usecases/session/delete-session.usecase';

@Injectable()
export class DeleteSessionUsecaseImpl implements DeleteSessionUsecase {
  constructor(private readonly sessionRepository: SessionRepository) {}

  async execute(
    params: DeleteSessionUsecaseInput,
  ): Promise<DeleteSessionUsecaseOutput> {
    const { sessionId } = params;

    await this.sessionRepository.delete(sessionId);
  }
}
