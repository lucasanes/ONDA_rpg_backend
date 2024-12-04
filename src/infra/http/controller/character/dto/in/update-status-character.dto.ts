import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsUrl } from 'class-validator';

export class UpdateStatusCharacterInputDto {
  @ApiProperty({
    description: 'Portrait do personagem.',
    example: 'https://example.com/image.jpg',
  })
  @IsOptional()
  @IsUrl()
  portrait: string | null;

  @ApiProperty({
    description: 'Defesa do personagem.',
    example: 10,
  })
  @IsNotEmpty()
  @IsNumber()
  defense: number;

  @ApiProperty({
    description: 'Classe de Dificuldade do personagem.',
    example: 10,
  })
  @IsNotEmpty()
  @IsNumber()
  cd: number;

  @ApiProperty({
    description: 'Vida total do personagem.',
    example: 100,
  })
  @IsNotEmpty()
  @IsNumber()
  hp: number;

  @ApiProperty({
    description: 'Vida atual do personagem.',
    example: 100,
  })
  @IsNotEmpty()
  @IsNumber()
  currentHp: number;

  @ApiProperty({
    description: 'Mana total do personagem.',
    example: 100,
  })
  @IsNotEmpty()
  @IsNumber()
  mp: number;

  @ApiProperty({
    description: 'Mana atual do personagem.',
    example: 100,
  })
  @IsNotEmpty()
  @IsNumber()
  currentMp: number;

  @ApiProperty({
    description: 'Munição total do personagem.',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  mun: number;

  @ApiProperty({
    description: 'Munição atual do personagem.',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  currentMun: number;
}
