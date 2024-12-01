import { Global, Module, Provider } from '@nestjs/common';
import { UserRepository } from '@src/domain/repositories/user/user.repository';
import { UserRepositoryImpl } from './user/user.repository';

const repositories: Provider[] = [
  {
    provide: UserRepository,
    useClass: UserRepositoryImpl,
  },
];

@Global()
@Module({
  exports: [...repositories],
  providers: [...repositories],
})
export class RepositoryModule {}
