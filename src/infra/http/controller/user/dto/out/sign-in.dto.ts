import { ApiProperty } from '@nestjs/swagger';

export class SignInOutputDto {
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
}
