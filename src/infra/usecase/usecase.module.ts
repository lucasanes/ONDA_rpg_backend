import { Global, Module, Provider } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ChangePasswordUsecaseImpl } from '@src/application/usecases/auth/change-password.usecase';
import { SendRecoveryUsecaseImpl } from '@src/application/usecases/auth/send-recovery.usecase';
import { SignInUsecaseImpl } from '@src/application/usecases/auth/sign-in.usecase';
import { SignUpUsecaseImpl } from '@src/application/usecases/auth/sign-up.usecase';
import { ValidateRecoveryUsecaseImpl } from '@src/application/usecases/auth/validate-recovery.usecase';
import { ValidateTokenUsecaseImpl } from '@src/application/usecases/auth/validate-token.usecase';
import { ChangePasswordUsecase } from '@src/domain/usecases/auth/change-password.usecase';
import { SendRecoveryUsecase } from '@src/domain/usecases/auth/send-recovery.usecase';
import { SignInUsecase } from '@src/domain/usecases/auth/sign-in.usecase';
import { SignUpUsecase } from '@src/domain/usecases/auth/sign-up.usecase';
import { ValidateRecoveryUsecase } from '@src/domain/usecases/auth/validate-recovery.usecase';
import { ValidateTokenUsecase } from '@src/domain/usecases/auth/validate-token.usecase';

const usecases: Provider[] = [
  JwtService,
  {
    provide: SignInUsecase,
    useClass: SignInUsecaseImpl,
  },
  {
    provide: SignUpUsecase,
    useClass: SignUpUsecaseImpl,
  },
  {
    provide: SendRecoveryUsecase,
    useClass: SendRecoveryUsecaseImpl,
  },
  {
    provide: ValidateRecoveryUsecase,
    useClass: ValidateRecoveryUsecaseImpl,
  },
  {
    provide: ChangePasswordUsecase,
    useClass: ChangePasswordUsecaseImpl,
  },
  {
    provide: ValidateTokenUsecase,
    useClass: ValidateTokenUsecaseImpl,
  },
];

@Global()
@Module({
  exports: [...usecases],
  providers: [...usecases],
})
export class UsecaseModule {}
