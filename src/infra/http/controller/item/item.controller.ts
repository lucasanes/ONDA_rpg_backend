import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CreateItemUsecase } from '@src/domain/usecases/item/create-item.usecase';
import { DeleteItemUsecase } from '@src/domain/usecases/item/delete-item.usecase';
import { FindItemsByUsecase } from '@src/domain/usecases/item/find-items-by.usecase';
import { UpdateItemUsecase } from '@src/domain/usecases/item/update-item.usecase';
import { AuthGuard } from '@src/infra/common/guards/auth.guard';
import { UpsertItemInputDto } from './dto/in/upsert-item.dto';
import { FindCharacterItemsOutputDto } from './dto/out/find-character-items.dto';
import { FindSessionItemsOutputDto } from './dto/out/find-session-items.dto';
import { UpsertItemOutputDto } from './dto/out/upsert-item.dto';

@ApiTags('Item')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('items')
export class ItemController {
  constructor(
    private readonly findItemsByUsecase: FindItemsByUsecase,
    private readonly createItemUsecase: CreateItemUsecase,
    private readonly updateItemUsecase: UpdateItemUsecase,
    private readonly deleteItemUsecase: DeleteItemUsecase,
  ) {}

  @Get('/session/:id')
  @ApiOperation({
    description: 'Buscar os itens da sessão.',
    summary: 'Buscar os itens da sessão.',
  })
  @ApiResponse({
    description: 'Itens da sessão encontrados.',
    status: 200,
    type: FindSessionItemsOutputDto,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden.',
  })
  @ApiNotFoundResponse({
    description: 'Not Found.',
  })
  async findSessionItems(
    @Param('id') id: number,
  ): Promise<FindSessionItemsOutputDto[]> {
    return await this.findItemsByUsecase.execute({
      sessionId: id,
    });
  }

  @Get('/character/:id')
  @ApiOperation({
    description: 'Buscar os itens do personagem.',
    summary: 'Buscar os itens do personagem.',
  })
  @ApiResponse({
    description: 'Itens do personagem encontrados.',
    status: 200,
    type: FindCharacterItemsOutputDto,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden.',
  })
  @ApiNotFoundResponse({
    description: 'Not Found.',
  })
  async findCharacterItems(
    @Param('id') id: number,
  ): Promise<FindCharacterItemsOutputDto[]> {
    return await this.findItemsByUsecase.execute({
      characterId: id,
    });
  }

  @Post()
  @ApiOperation({
    description: 'Criar um novo item.',
    summary: 'Criar um novo item.',
  })
  @ApiResponse({
    description: 'Item criado.',
    status: 201,
    type: UpsertItemOutputDto,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden.',
  })
  @ApiNotFoundResponse({
    description: 'Not Found.',
  })
  async createItem(
    @Body() body: UpsertItemInputDto,
  ): Promise<UpsertItemOutputDto> {
    console.log(body);
    return await this.createItemUsecase.execute(body);
  }

  @Put(':id')
  @ApiOperation({
    description: 'Atualizar um item.',
    summary: 'Atualizar um item.',
  })
  @ApiResponse({
    description: 'Item atualizado.',
    status: 200,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden.',
  })
  @ApiNotFoundResponse({
    description: 'Not Found.',
  })
  async updateItem(
    @Param('id') id: number,
    @Body() body: UpsertItemInputDto,
  ): Promise<void> {
    await this.updateItemUsecase.execute({
      id,
      ...body,
    });
  }

  @Delete(':id')
  @ApiOperation({
    description: 'Deletar um item.',
    summary: 'Deletar um item.',
  })
  @ApiResponse({
    description: 'Item deletado.',
    status: 204,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden.',
  })
  @ApiNotFoundResponse({
    description: 'Not Found.',
  })
  async deleteItem(@Param('id') id: number): Promise<void> {
    await this.deleteItemUsecase.execute({
      id,
    });
  }
}
