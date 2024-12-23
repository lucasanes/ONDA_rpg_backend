import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateMainCharacterInputDto {
  @ApiProperty({
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 25,
  })
  @IsNumber()
  @IsNotEmpty()
  age: number;

  @ApiProperty({
    example: 100,
  })
  @IsNumber()
  @IsNotEmpty()
  xp: number;

  @ApiProperty({
    example: 10,
  })
  @IsNumber()
  @IsNotEmpty()
  weightLimit: number;

  @ApiProperty({
    example: 'Arcanista',
  })
  @IsString()
  @IsNotEmpty()
  class: string;

  @ApiProperty({
    example: 'Charlatão',
  })
  @IsString()
  @IsNotEmpty()
  origin: string;

  @ApiProperty({
    example: 'Humano',
  })
  @IsString()
  @IsNotEmpty()
  race: string;

  @ApiProperty({
    example: 'Nimb',
  })
  @IsString()
  @IsNotEmpty()
  divinity: string;

  @ApiProperty({
    example: 18,
  })
  @IsNumber()
  @IsNotEmpty()
  tp: number;

  @ApiProperty({
    example: 16,
  })
  @IsNumber()
  @IsNotEmpty()
  tc: number;

  @ApiProperty({
    example: 14,
  })
  @IsNumber()
  @IsNotEmpty()
  to: number;
}
