import { Global, Module, Provider } from '@nestjs/common';
import { SignInUsecaseImpl } from '@src/application/usecases/user/sign-in.usecase';
import { SignInUsecase } from '@src/domain/usecases/user/sign-in.usecase';

const usecases: Provider[] = [
  {
    provide: SignInUsecase,
    useClass: SignInUsecaseImpl,
  },
];

@Global()
@Module({
  exports: [...usecases],
  providers: [...usecases],
})
export class UsecaseModule {}
