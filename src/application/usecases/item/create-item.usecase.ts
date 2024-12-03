import { Injectable } from '@nestjs/common';
import { ExceptionService } from '@src/domain/exceptions/exception.interface';
import { CharacterRepository } from '@src/domain/repositories/character/character.repository';
import { ItemRepository } from '@src/domain/repositories/item/item.repository';
import { SessionRepository } from '@src/domain/repositories/session/session.repository';
import {
  CreateItemUsecase,
  CreateItemUsecaseInput,
  CreateItemUsecaseOutput,
} from '@src/domain/usecases/item/create-item.usecase';

@Injectable()
export class CreateItemUsecaseImpl implements CreateItemUsecase {
  constructor(
    private readonly itemRepository: ItemRepository,
    private readonly characterRepository: CharacterRepository,
    private readonly sessionRepository: SessionRepository,
    private readonly exceptionService: ExceptionService,
  ) {}

  async execute(
    params: CreateItemUsecaseInput,
  ): Promise<CreateItemUsecaseOutput> {
    const { characterId, sessionId } = params;

    if (!characterId && !sessionId) {
      throw this.exceptionService.businessException(
        {
          code_error: 'INVALID_PARAMS',
          message:
            'Você precisa enviar ao menos um destes campos: {characterId, sessionId}.',
        },
        400,
      );
    }

    if (characterId) {
      const character = await this.characterRepository.getById(characterId);

      if (!character) {
        throw this.exceptionService.notFoundException({
          code_error: 'NOT_FOUND',
          message: 'Personagem não encontrado.',
        });
      }
    }

    if (sessionId) {
      const session = await this.sessionRepository.getById(sessionId);

      if (!session) {
        throw this.exceptionService.notFoundException({
          code_error: 'NOT_FOUND',
          message: 'Sessão não encontrada.',
        });
      }
    }

    return await this.itemRepository.save(params);
  }
}
