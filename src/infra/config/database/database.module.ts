import { Global, Module } from '@nestjs/common';

import { databaseProviders } from './database.provider';

@Global()
@Module({
  exports: [...databaseProviders],
  providers: [...databaseProviders],
})
export class DatabaseModule {}
