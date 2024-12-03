import { Injectable } from '@nestjs/common';
import { ExceptionService } from '@src/domain/exceptions/exception.interface';
import { CharacterRepository } from '@src/domain/repositories/character/character.repository';
import {
  GetCharacterUsecase,
  GetCharacterUsecaseInput,
  GetCharacterUsecaseOutput,
} from '@src/domain/usecases/character/get-character.usecase';

@Injectable()
export class GetCharacterUsecaseImpl implements GetCharacterUsecase {
  constructor(
    private readonly characterRepository: CharacterRepository,
    private readonly exceptionService: ExceptionService,
  ) {}

  async execute(
    params: GetCharacterUsecaseInput,
  ): Promise<GetCharacterUsecaseOutput> {
    const { id, userId } = params;

    const character = await this.characterRepository.getById(id);

    if (!character) {
      throw this.exceptionService.notFoundException({
        code_error: 'NOT_FOUND',
        message: 'Personagem não encontrado.',
      });
    }

    let hasPermission = false;

    if (character.userId === userId || character.session.userId === userId) {
      hasPermission = true;
    }

    return { character, hasPermission };
  }
}
