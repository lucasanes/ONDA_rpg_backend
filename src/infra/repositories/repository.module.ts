import { Global, Module, Provider } from '@nestjs/common';
import { AuthRepository } from '@src/domain/repositories/auth/auth.repository';
import { CharacterRepository } from '@src/domain/repositories/character/character.repository';
import { InviteRepository } from '@src/domain/repositories/invite/invite.repository';
import { SessionRepository } from '@src/domain/repositories/session/session.repository';
import { AuthRepositoryImpl } from './auth.repository';
import { CharacterRepositoryImpl } from './character.repository';
import { InviteRepositoryImpl } from './invite.repository';
import { SessionRepositoryImpl } from './session.repository';

const repositories: Provider[] = [
  {
    provide: AuthRepository,
    useClass: AuthRepositoryImpl,
  },
  {
    provide: CharacterRepository,
    useClass: CharacterRepositoryImpl,
  },
  {
    provide: SessionRepository,
    useClass: SessionRepositoryImpl,
  },
  {
    provide: InviteRepository,
    useClass: InviteRepositoryImpl,
  },
];

@Global()
@Module({
  exports: [...repositories],
  providers: [...repositories],
})
export class RepositoryModule {}
