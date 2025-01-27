// Purpose: Data transfer object for the spin endpoint.
// Used Github Copilot to generate the class
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