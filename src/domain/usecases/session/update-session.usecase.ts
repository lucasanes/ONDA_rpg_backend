import { Usecase } from '../usecase';

export type UpdateSessionUsecaseInput = {
  description: string;
  name: string;
  sessionId: number;
};

export type UpdateSessionUsecaseOutput = void;

export abstract class UpdateSessionUsecase extends Usecase<
  UpdateSessionUsecaseInput,
  UpdateSessionUsecaseOutput
> {
  abstract execute(
    input: UpdateSessionUsecaseInput,
  ): Promise<UpdateSessionUsecaseOutput>;
}
