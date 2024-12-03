import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class UpdateCharacterInputDto {
  @ApiProperty({
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  isPublic?: boolean;

  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  sessionId?: number | null;
}
