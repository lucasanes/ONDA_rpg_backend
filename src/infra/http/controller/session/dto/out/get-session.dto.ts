import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

class MainCharacter {
  @ApiProperty({
    description: 'Nome do personagem principal',
    example: 'Nome do personagem',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Idade do personagem principal',
    example: 20,
  })
  @IsNumber()
  age: number;

  @ApiProperty({
    description: 'Classe do personagem principal',
    example: 'Mago',
  })
  @IsString()
  class: string;

  @ApiProperty({
    description: 'Raça do personagem principal',
    example: 'Elfo',
  })
  @IsString()
  race: string;

  @ApiProperty({
    description: 'Divindade do personagem principal',
    example: 'Deus do Fogo',
  })
  @IsString()
  divinity: string;

  @ApiProperty({
    description: 'Origem do personagem principal',
    example: 'Reino da Magia',
  })
  @IsString()
  origin: string;

  @ApiProperty({
    description: 'Experiência do personagem principal',
    example: 100,
  })
  @IsNumber()
  xp: number;

  @ApiProperty({
    description: 'Moedas de Tibar do personagem',
    example: 10,
  })
  @IsNumber()
  tp: number;

  @ApiProperty({
    description: 'Moedas de Tibar de Prata do personagem',
    example: 5,
  })
  @IsNumber()
  tc: number;

  @ApiProperty({
    description: 'Moedas de Tibar de Ouro do personagem',
    example: 2,
  })
  @IsNumber()
  to: number;

  @ApiProperty({
    description: 'Retrato do personagem',
    example: 'portrait.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  portrait?: string;
}

class StatusCharacter {
  @ApiProperty({
    description: 'HP total do personagem',
    example: 100,
  })
  @IsNumber()
  hp: number;

  @ApiProperty({
    description: 'HP atual do personagem',
    example: 50,
  })
  @IsNumber()
  currentHp: number;

  @ApiProperty({
    description: 'MP total do personagem',
    example: 50,
  })
  @IsNumber()
  mp: number;

  @ApiProperty({
    description: 'MP atual do personagem',
    example: 25,
  })
  @IsNumber()
  currentMp: number;

  @ApiProperty({
    description: 'Munição total do personagem',
    example: 50,
  })
  @IsNumber()
  mun: number;

  @ApiProperty({
    description: 'Munição atual do personagem',
    example: 25,
  })
  @IsNumber()
  currentMun: number;
}

class Character {
  @ApiProperty({
    description: 'ID do personagem',
    example: 1,
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'Indica se o personagem é público',
    example: true,
  })
  @IsBoolean()
  isPublic: boolean;

  @ApiProperty({
    description: 'ID do usuário proprietário do personagem',
    example: 1,
  })
  @IsNumber()
  userId: number;

  @ApiProperty({
    description: 'ID da sessão associada ao personagem',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  sessionId?: number;

  @ApiProperty({
    description: 'Itens do personagem',
    example: 'Itens do personagem',
  })
  @IsNotEmpty()
  @IsArray()
  @Type(() => Item)
  items: Item[];

  @ApiProperty({
    description: 'Personagem principal',
    type: MainCharacter,
  })
  @Type(() => MainCharacter)
  mainCharacter: MainCharacter;

  @ApiProperty({
    description: 'Status do personagem',
    type: StatusCharacter,
  })
  @Type(() => StatusCharacter)
  statusCharacter: StatusCharacter;

  @ApiProperty({
    description: 'Data de criação do personagem',
    example: '2021-08-07T00:00:00.000Z',
  })
  @IsString()
  createdAt: Date;

  @ApiProperty({
    description: 'Data de atualização do personagem',
    example: '2021-08-07T00:00:00.000Z',
  })
  @IsString()
  updatedAt: Date;
}

class Item {
  @ApiProperty({
    description: 'ID do item',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    description: 'Nome do item',
    example: 'Espada',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Imagem do item',
    example: 'http://item.jpg',
  })
  @IsUrl()
  @IsNotEmpty()
  image: string;

  @ApiProperty({
    description: 'Personagem associado ao item',
    example: 'Personagem associado ao item',
  })
  @IsNumber()
  @IsNotEmpty()
  characterId?: number;

  @ApiProperty({
    description: 'Sessão associada ao item',
    example: 'Sessão associada ao item',
  })
  @IsNumber()
  @IsNotEmpty()
  sessionId?: number;

  @ApiProperty({
    description: 'Data de criação do item',
    example: '2021-08-07T00:00:00.000Z',
  })
  @IsDateString()
  @IsNotEmpty()
  createdAt: Date;

  @ApiProperty({
    description: 'Data de atualização do item',
    example: '2021-08-07T00:00:00.000Z',
  })
  @IsDateString()
  @IsNotEmpty()
  updatedAt: Date;
}

export class GetSessionOutputDto {
  @ApiProperty({
    description: 'ID da sessão',
    example: 1,
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'Nome da sessão',
    example: 'Nome da sessão',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Descrição da sessão',
    example: 'Descrição da sessão',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'ID do usuário criador da sessão',
    example: 1,
  })
  @IsNumber()
  userId: number;

  @ApiProperty({
    description: 'Personagens da sessão',
    type: [Character],
  })
  @IsArray()
  @IsNotEmpty()
  @Type(() => Character)
  characters: Character[];

  @ApiProperty({
    description: 'Itens da sessão',
    type: [Item],
  })
  @IsArray()
  @IsNotEmpty()
  @Type(() => Item)
  items: Item[];

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
