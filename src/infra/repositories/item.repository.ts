import { Injectable } from '@nestjs/common';
import { ItemRepository } from '@src/domain/repositories/item/item.repository';

import { ItemModel } from '@src/domain/model/item.model';
import {
  FindItemByParams,
  SaveItemParams,
  UpdateItemParams,
} from '@src/domain/repositories/item/types';
import { Item } from '../entities/item.entity';
import { BaseRepository } from './base.repository';

@Injectable()
export class ItemRepositoryImpl
  extends BaseRepository
  implements ItemRepository
{
  async getById(id: number): Promise<ItemModel> {
    const item = await this.getRepository(Item).findOneBy({
      id,
    });

    return new ItemModel(item);
  }

  async findBy(params: FindItemByParams): Promise<ItemModel[]> {
    const items = await this.getRepository(Item).findBy(params);

    return items.map((item) => new ItemModel(item));
  }

  async save(params: SaveItemParams): Promise<ItemModel> {
    const item = await this.getRepository(Item).save(params);

    return new ItemModel(item);
  }

  async update(params: UpdateItemParams): Promise<void> {
    const { id, ...updateFields } = params;

    await this.getRepository(Item).update(id, updateFields);
  }

  async delete(id: number): Promise<void> {
    await this.getRepository(Item).delete(id);
  }
}
