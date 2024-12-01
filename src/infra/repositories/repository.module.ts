import { Global, Module, Provider } from '@nestjs/common';
import { AuthRepository } from '@src/domain/repositories/auth/auth.repository';
import { AuthRepositoryImpl } from './auth/auth.repository';

const repositories: Provider[] = [
  {
    provide: AuthRepository,
    useClass: AuthRepositoryImpl,
  },
];

@Global()
@Module({
  exports: [...repositories],
  providers: [...repositories],
})
export class RepositoryModule {}
