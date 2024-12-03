import { Injectable } from '@nestjs/common';
import { SessionRepository } from '@src/domain/repositories/session/session.repository';
import {
  CreateSessionUsecase,
  CreateSessionUsecaseInput,
  CreateSessionUsecaseOutput,
} from '@src/domain/usecases/session/create-session.usecase';

@Injectable()
export class CreateSessionUsecaseImpl implements CreateSessionUsecase {
  constructor(private readonly sessionRepository: SessionRepository) {}

  async execute(
    params: CreateSessionUsecaseInput,
  ): Promise<CreateSessionUsecaseOutput> {
    return await this.sessionRepository.save(params);
  }
}
