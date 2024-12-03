import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateStatusCharacterInputDto {
  @ApiProperty({
    description: 'Portrait do personagem.',
    example: 'https://example.com/image.jpg',
  })
  portrait: string | null;

  @ApiProperty({
    description: 'Defesa do personagem.',
    example: 10,
  })
  @IsNumber()
  @IsNotEmpty()
  defense: number;

  @ApiProperty({
    description: 'Classe de Dificuldade do personagem.',
    example: 10,
  })
  @IsNumber()
  @IsNotEmpty()
  cd: number;

  @ApiProperty({
    description: 'Vida total do personagem.',
    example: 100,
  })
  @IsNumber()
  @IsNotEmpty()
  hp: number;

  @ApiProperty({
    description: 'Vida atual do personagem.',
    example: 100,
  })
  @IsNumber()
  @IsNotEmpty()
  currentHp: number;

  @ApiProperty({
    description: 'Mana total do personagem.',
    example: 100,
  })
  @IsNumber()
  @IsNotEmpty()
  mp: number;

  @ApiProperty({
    description: 'Mana atual do personagem.',
    example: 100,
  })
  @IsNumber()
  @IsNotEmpty()
  currentMp: number;

  @ApiProperty({
    description: 'Munição total do personagem.',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  mun: number;

  @ApiProperty({
    description: 'Munição atual do personagem.',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  currentMun: number;
}
