import { ItemModel } from '@src/domain/model/item.model';
import { FindItemByParams, SaveItemParams, UpdateItemParams } from './types';

export abstract class ItemRepository {
  abstract getById(id: number): Promise<ItemModel>;
  abstract findBy(params: FindItemByParams): Promise<ItemModel[]>;
  abstract save(item: SaveItemParams): Promise<ItemModel>;
  abstract update(item: UpdateItemParams): Promise<void>;
  abstract delete(id: number): Promise<void>;
}
