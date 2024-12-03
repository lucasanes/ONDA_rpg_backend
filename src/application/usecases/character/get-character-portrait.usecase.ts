import { Injectable } from '@nestjs/common';
import { ExceptionService } from '@src/domain/exceptions/exception.interface';
import { CharacterRepository } from '@src/domain/repositories/character/character.repository';
import {
  GetCharacterPortraitUsecase,
  GetCharacterPortraitUsecaseInput,
  GetCharacterPortraitUsecaseOutput,
} from '@src/domain/usecases/character/get-character-portrait.usecase';

@Injectable()
export class GetCharacterPortraitUsecaseImpl
  implements GetCharacterPortraitUsecase
{
  constructor(
    private readonly characterRepository: CharacterRepository,
    private readonly exceptionService: ExceptionService,
  ) {}

  async execute(
    params: GetCharacterPortraitUsecaseInput,
  ): Promise<GetCharacterPortraitUsecaseOutput> {
    const { id } = params;

    const character = await this.characterRepository.getById(id);

    if (!character) {
      throw this.exceptionService.notFoundException({
        code_error: 'NOT_FOUND',
        message: 'Personagem não encontrado.',
      });
    }

    return character;
  }
}
