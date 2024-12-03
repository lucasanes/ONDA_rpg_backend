import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class FindCharacterItemsOutputDto {
  @ApiProperty({
    description: 'ID da sessão',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'Nome do item',
    example: 'Nome do item',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Imagem do item',
    example: 'Imagem do item',
  })
  @IsNotEmpty()
  @IsUrl()
  image: string;

  @ApiProperty({
    description: 'Personagem associado ao item',
    example: 'Personagem associado ao item',
  })
  @IsNotEmpty()
  @IsNumber()
  characterId: number;

  @ApiProperty({
    description: 'Data de criação da sessão',
    example: '2021-08-07T00:00:00.000Z',
  })
  @IsString()
  createdAt: Date;

  @ApiProperty({
    description: 'Data de atualização da sessão',
    example: '2021-08-07T00:00:00.000Z',
  })
  @IsString()
  updatedAt: Date;
}
