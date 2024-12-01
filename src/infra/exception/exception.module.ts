import { Global, Module, Provider } from '@nestjs/common';
import { ExceptionService } from '@src/domain/exceptions/exception.interface';

import { ExceptionServiceImpl } from './exception.service';

const exceptions: Provider[] = [
  {
    provide: ExceptionService,
    useClass: ExceptionServiceImpl,
  },
];

@Global()
@Module({
  exports: [...exceptions],
  providers: [...exceptions],
})
export class ExceptionsModule {}
