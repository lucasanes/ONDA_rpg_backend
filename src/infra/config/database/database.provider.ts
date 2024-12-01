import { Provider } from '@nestjs/common';
import { Datasources } from '@src/domain/constants/datasource';
import { User } from '@src/infra/entities/user.entity';
import { DataSource } from 'typeorm';

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
];
