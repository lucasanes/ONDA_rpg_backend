import { ApiProperty } from '@nestjs/swagger';

export class MeOutputDto {
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: 'John Doe',
  })
  username: string;

  @ApiProperty({
    example: 'onda@gmail.com',
  })
  email: string;

  @ApiProperty({
    example: '2021-08-07T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2021-08-07T00:00:00.000Z',
  })
  updatedAt: Date;
}
