import { Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { DataSource, EntityManager, ObjectLiteral, Repository } from 'typeorm';

import {
  ENTITY_MANAGER_KEY,
  RequestWithEntityManager,
} from '../types/request-with-entity.manager.type';

export class BaseRepository {
  constructor(
    @Inject('DATA_SOURCE')
    private dataSource: DataSource,
    @Inject(REQUEST)
    private request: RequestWithEntityManager,
  ) {}

  protected getRepository<T extends ObjectLiteral>(
    entityCls: new () => T,
  ): Repository<T> {
    const entityManager: EntityManager =
      this.request[ENTITY_MANAGER_KEY] ?? this.dataSource.manager;
    return entityManager.getRepository(entityCls);
  }
}
