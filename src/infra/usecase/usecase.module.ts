import { Global, Module, Provider } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ChangePasswordUsecaseImpl } from '@src/application/usecases/auth/change-password.usecase';
import { SendRecoveryUsecaseImpl } from '@src/application/usecases/auth/send-recovery.usecase';
import { SignInUsecaseImpl } from '@src/application/usecases/auth/sign-in.usecase';
import { SignUpUsecaseImpl } from '@src/application/usecases/auth/sign-up.usecase';
import { ValidateRecoveryUsecaseImpl } from '@src/application/usecases/auth/validate-recovery.usecase';
import { ValidateTokenUsecaseImpl } from '@src/application/usecases/auth/validate-token.usecase';
import { CreateCharacterUsecaseImpl } from '@src/application/usecases/character/create-character.usecase';
import { DeleteCharacterUsecaseImpl } from '@src/application/usecases/character/delete-character.usecase';
import { GetCharacterPortraitUsecaseImpl } from '@src/application/usecases/character/get-character-portrait.usecase';
import { GetCharacterUsecaseImpl } from '@src/application/usecases/character/get-character.usecase';
import { UpdateCharacterUsecaseImpl } from '@src/application/usecases/character/update-character.usecase';
import { UpdateMainCharacterUsecaseImpl } from '@src/application/usecases/character/update-main-character.usecase';
import { UpdateStatusCharacterUsecaseImpl } from '@src/application/usecases/character/update-status-character.usecase';
import { GetDashboardUsecaseImpl } from '@src/application/usecases/dashboard/get-dashboard.usecase';
import { AcceptInviteUsecaseImpl } from '@src/application/usecases/invite/accept-invite.usecase';
import { CreateInviteUsecaseImpl } from '@src/application/usecases/invite/create-invite.usecase';
import { DeleteInviteUsecaseImpl } from '@src/application/usecases/invite/delete-invite.usecase';
import { CreateItemUsecaseImpl } from '@src/application/usecases/item/create-item.usecase';
import { DeleteItemUsecaseImpl } from '@src/application/usecases/item/delete-item.usecase';
import { FindItemsByUsecaseImpl } from '@src/application/usecases/item/find-items-by.usecase';
import { UpdateItemUsecaseImpl } from '@src/application/usecases/item/update-item.usecase';
import { CreateSessionUsecaseImpl } from '@src/application/usecases/session/create-session.usecase';
import { DeleteSessionUsecaseImpl } from '@src/application/usecases/session/delete-session.usecase';
import { GetSessionUsecaseImpl } from '@src/application/usecases/session/get-session.usecase';
import { UpdateSessionUsecaseImpl } from '@src/application/usecases/session/update-session.usecase';
import { UpdateUserUsecaseImpl } from '@src/application/usecases/user/update-user.usecase';
import { ChangePasswordUsecase } from '@src/domain/usecases/auth/change-password.usecase';
import { SendRecoveryUsecase } from '@src/domain/usecases/auth/send-recovery.usecase';
import { SignInUsecase } from '@src/domain/usecases/auth/sign-in.usecase';
import { SignUpUsecase } from '@src/domain/usecases/auth/sign-up.usecase';
import { ValidateRecoveryUsecase } from '@src/domain/usecases/auth/validate-recovery.usecase';
import { ValidateTokenUsecase } from '@src/domain/usecases/auth/validate-token.usecase';
import { CreateCharacterUsecase } from '@src/domain/usecases/character/create-character.usecase';
import { DeleteCharacterUsecase } from '@src/domain/usecases/character/delete-character.usecase';
import { GetCharacterPortraitUsecase } from '@src/domain/usecases/character/get-character-portrait.usecase';
import { GetCharacterUsecase } from '@src/domain/usecases/character/get-character.usecase';
import { UpdateCharacterUsecase } from '@src/domain/usecases/character/update-character.usecase';
import { UpdateMainCharacterUsecase } from '@src/domain/usecases/character/update-main-character.usecase';
import { UpdateStatusCharacterUsecase } from '@src/domain/usecases/character/update-status-character.usecase';
import { GetDashboardUsecase } from '@src/domain/usecases/dashboard/get-dashboard.usecase';
import { AcceptInviteUsecase } from '@src/domain/usecases/invite/accept-invite.usecase';
import { CreateInviteUsecase } from '@src/domain/usecases/invite/create-invite.usecase';
import { DeleteInviteUsecase } from '@src/domain/usecases/invite/delete-invite.usecase';
import { CreateItemUsecase } from '@src/domain/usecases/item/create-item.usecase';
import { DeleteItemUsecase } from '@src/domain/usecases/item/delete-item.usecase';
import { FindItemsByUsecase } from '@src/domain/usecases/item/find-items-by.usecase';
import { UpdateItemUsecase } from '@src/domain/usecases/item/update-item.usecase';
import { CreateSessionUsecase } from '@src/domain/usecases/session/create-session.usecase';
import { DeleteSessionUsecase } from '@src/domain/usecases/session/delete-session.usecase';
import { GetSessionUsecase } from '@src/domain/usecases/session/get-session.usecase';
import { UpdateSessionUsecase } from '@src/domain/usecases/session/update-session.usecase';
import { UpdateUserUsecase } from '@src/domain/usecases/user/update-user.usecase';

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
  {
    provide: GetDashboardUsecase,
    useClass: GetDashboardUsecaseImpl,
  },
  {
    provide: CreateSessionUsecase,
    useClass: CreateSessionUsecaseImpl,
  },
  {
    provide: UpdateSessionUsecase,
    useClass: UpdateSessionUsecaseImpl,
  },
  {
    provide: DeleteSessionUsecase,
    useClass: DeleteSessionUsecaseImpl,
  },
  {
    provide: CreateCharacterUsecase,
    useClass: CreateCharacterUsecaseImpl,
  },
  {
    provide: UpdateCharacterUsecase,
    useClass: UpdateCharacterUsecaseImpl,
  },
  {
    provide: DeleteCharacterUsecase,
    useClass: DeleteCharacterUsecaseImpl,
  },
  {
    provide: CreateInviteUsecase,
    useClass: CreateInviteUsecaseImpl,
  },
  {
    provide: AcceptInviteUsecase,
    useClass: AcceptInviteUsecaseImpl,
  },
  {
    provide: DeleteInviteUsecase,
    useClass: DeleteInviteUsecaseImpl,
  },
  {
    provide: GetCharacterUsecase,
    useClass: GetCharacterUsecaseImpl,
  },
  {
    provide: GetSessionUsecase,
    useClass: GetSessionUsecaseImpl,
  },
  {
    provide: UpdateMainCharacterUsecase,
    useClass: UpdateMainCharacterUsecaseImpl,
  },
  {
    provide: UpdateStatusCharacterUsecase,
    useClass: UpdateStatusCharacterUsecaseImpl,
  },
  {
    provide: GetCharacterPortraitUsecase,
    useClass: GetCharacterPortraitUsecaseImpl,
  },
  {
    provide: CreateItemUsecase,
    useClass: CreateItemUsecaseImpl,
  },
  {
    provide: UpdateItemUsecase,
    useClass: UpdateItemUsecaseImpl,
  },
  {
    provide: DeleteItemUsecase,
    useClass: DeleteItemUsecaseImpl,
  },
  {
    provide: FindItemsByUsecase,
    useClass: FindItemsByUsecaseImpl,
  },
  {
    provide: UpdateUserUsecase,
    useClass: UpdateUserUsecaseImpl,
  },
];

@Global()
@Module({
  exports: [...usecases],
  providers: [...usecases],
})
export class UsecaseModule {}
