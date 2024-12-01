import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { DataSource } from 'typeorm';
import { ExceptionService } from './domain/exceptions/exception.interface';
import { AuthGuard } from './infra/common/guards/auth.guard';
import { DatabaseModule } from './infra/config/database/database.module';
import { ExceptionsModule } from './infra/exception/exception.module';
import { HttpModule } from './infra/http/http.module';
import { RepositoryModule } from './infra/repositories/repository.module';
import { UsecaseModule } from './infra/usecase/usecase.module';

@Module({
  imports: [
    HttpModule,
    DatabaseModule,
    UsecaseModule,
    RepositoryModule,
    ExceptionsModule,
  ],
  providers: [
    JwtService,
    {
      provide: APP_GUARD,
      useFactory: (
        configService: ConfigService,
        dataSource: DataSource,
        exceptionService: ExceptionService,
      ) => {
        return new AuthGuard(configService, dataSource, exceptionService);
      },
      inject: [ConfigService, DataSource, ExceptionService],
    },
  ],
})
export class AppModule {}
