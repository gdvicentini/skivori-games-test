import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SpinDto {
  @ApiProperty({
    description: 'Current balance of the user',
    example: 100,
  })
  @IsNumber()
  balance: number;
}