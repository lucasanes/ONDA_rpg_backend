import { Module } from '@nestjs/common';
import { DatabaseModule } from './infra/config/database/database.module';
import { ExceptionsModule } from './infra/exception/exception.module';
import { HttpModule } from './infra/http/http.module';
import { RepositoryModule } from './infra/repositories/repository.module';
import { SharedModule } from './infra/shared.module';
import { UsecaseModule } from './infra/usecase/usecase.module';

@Module({
  imports: [
    SharedModule,
    HttpModule,
    DatabaseModule,
    UsecaseModule,
    RepositoryModule,
    ExceptionsModule,
  ],
  exports: [],
  providers: [],
})
export class AppModule {}
