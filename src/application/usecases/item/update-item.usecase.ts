import { Injectable } from '@nestjs/common';
import { ExceptionService } from '@src/domain/exceptions/exception.interface';
import { ItemRepository } from '@src/domain/repositories/item/item.repository';
import {
  UpdateItemUsecase,
  UpdateItemUsecaseInput,
  UpdateItemUsecaseOutput,
} from '@src/domain/usecases/item/update-item.usecase';

@Injectable()
export class UpdateItemUsecaseImpl implements UpdateItemUsecase {
  constructor(
    private readonly itemRepository: ItemRepository,
    private readonly exceptionService: ExceptionService,
  ) {}

  async execute(
    params: UpdateItemUsecaseInput,
  ): Promise<UpdateItemUsecaseOutput> {
    const item = await this.itemRepository.getById(params.id);

    if (!item) {
      throw this.exceptionService.notFoundException({
        code_error: 'NOT_FOUND',
        message: 'Sessão não encontrada.',
      });
    }

    await this.itemRepository.update({
      ...params,
      id: params.id,
    });
  }
}
