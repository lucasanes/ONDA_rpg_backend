import { Provider } from '@nestjs/common';
import { Datasources } from '@src/domain/constants/datasource';
import { User } from '@src/infra/entities/user.entity';
import { DataSource } from 'typeorm';

import { Character } from '@src/infra/entities/character.entity';
import { Invite } from '@src/infra/entities/invite.entity';
import { Session } from 'inspector/promises';
import AppDataSource from './datasource';

export const databaseProviders: Provider[] = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      if (!AppDataSource.isInitialized) {
        const datasource = await AppDataSource.initialize();

        datasource.runMigrations();
        return datasource;
      }

      return AppDataSource;
    },
  },
  {
    inject: ['DATA_SOURCE'],
    provide: Datasources.USER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
  },
  {
    inject: ['DATA_SOURCE'],
    provide: Datasources.SESSION_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Session),
  },
  {
    inject: ['DATA_SOURCE'],
    provide: Datasources.CHARACTER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Character),
  },
  {
    inject: ['DATA_SOURCE'],
    provide: Datasources.INVITE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Invite),
  },
];
