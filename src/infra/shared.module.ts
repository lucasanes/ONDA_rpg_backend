import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ExceptionService } from '@src/domain/exceptions/exception.interface';
import { ExceptionServiceImpl } from './exception/exception.service';

@Global()
@Module({
  imports: [ConfigModule], // Importa o ConfigModule globalmente
  providers: [
    ConfigService,
    {
      provide: ExceptionService,
      useClass: ExceptionServiceImpl,
    },
  ],
  exports: [ConfigService, ExceptionService], // Exporta para outros módulos
})
export class SharedModule {}
