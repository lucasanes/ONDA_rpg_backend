import { ApiProperty } from '@nestjs/swagger';

export class SignInOutputDto {
  @ApiProperty({
    example: {
      id: 1,
      username: 'John Doe',
      email: 'onda@gmail.com',
    },
  })
  user: UserDto;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  })
  token: string;
}

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
