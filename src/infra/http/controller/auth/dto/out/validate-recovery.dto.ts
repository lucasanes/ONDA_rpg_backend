import { ApiProperty } from '@nestjs/swagger';

export class ValidateRecoveryOutputDto {
  @ApiProperty({
    example: 1,
  })
  userId: number;
}
