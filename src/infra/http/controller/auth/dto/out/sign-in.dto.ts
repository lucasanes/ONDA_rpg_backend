import { ApiProperty } from '@nestjs/swagger';

class UserDto {
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

export class SignInOutputDto {
  @ApiProperty({
    example: {
      email: 'onda@gmail.com',
      id: 1,
      username: 'John Doe',
    },
  })
  user: UserDto;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  })
  token: string;
}
