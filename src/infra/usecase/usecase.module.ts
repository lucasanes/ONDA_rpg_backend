import { Global, Module, Provider } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInUsecaseImpl } from '@src/application/usecases/auth/sign-in.usecase';
import { SignUpUsecaseImpl } from '@src/application/usecases/auth/sign-up.usecase';
import { SignInUsecase } from '@src/domain/usecases/auth/sign-in.usecase';
import { SignUpUsecase } from '@src/domain/usecases/auth/sign-up.usecase';

const usecases: Provider[] = [
  {
    provide: SignInUsecase,
    useClass: SignInUsecaseImpl,
  },
  {
    provide: SignUpUsecase,
    useClass: SignUpUsecaseImpl,
  },
  JwtService,
];

@Global()
@Module({
  exports: [...usecases],
  providers: [...usecases],
})
export class UsecaseModule {}
