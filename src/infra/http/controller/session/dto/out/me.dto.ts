import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

export class GetDashboardOutputDto {
  @IsArray()
  @Type(() => Session)
  @ValidateNested({ each: true })
  sessions: Session[];

  @IsArray()
  @Type(() => Character)
  @ValidateNested({ each: true })
  characters: Character[];

  @IsArray()
  @Type(() => Invite)
  @ValidateNested({ each: true })
  invites: Invite[];
}

class Session {
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: '2021-08-07T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2021-08-07T00:00:00.000Z',
  })
  updatedAt: Date;
}

class Character {
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: '2021-08-07T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2021-08-07T00:00:00.000Z',
  })
  updatedAt: Date;
}

class Invite {
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: '2021-08-07T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2021-08-07T00:00:00.000Z',
  })
  updatedAt: Date;
}
