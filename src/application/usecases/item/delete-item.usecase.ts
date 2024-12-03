import { Injectable } from '@nestjs/common';
import { ItemRepository } from '@src/domain/repositories/item/item.repository';
import {
  DeleteItemUsecase,
  DeleteItemUsecaseInput,
  DeleteItemUsecaseOutput,
} from '@src/domain/usecases/item/delete-item.usecase';

@Injectable()
export class DeleteItemUsecaseImpl implements DeleteItemUsecase {
  constructor(private readonly itemRepository: ItemRepository) {}

  async execute(
    params: DeleteItemUsecaseInput,
  ): Promise<DeleteItemUsecaseOutput> {
    const { id } = params;

    await this.itemRepository.delete(id);
  }
}
