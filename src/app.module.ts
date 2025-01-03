import { Module } from '@nestjs/common';
import { DatabaseModule } from './infra/config/database/database.module';
import { ExceptionsModule } from './infra/exception/exception.module';
import { HttpModule } from './infra/http/http.module';
import { RepositoryModule } from './infra/repositories/repository.module';
import { SharedModule } from './infra/shared.module';
import { SocketModule } from './infra/socket/socket.module';
import { UsecaseModule } from './infra/usecase/usecase.module';

@Module({
  exports: [],
  imports: [
    SharedModule,
    HttpModule,
    DatabaseModule,
    UsecaseModule,
    SocketModule,
    RepositoryModule,
    ExceptionsModule,
  ],
  providers: [],
})
export class AppModule {}
