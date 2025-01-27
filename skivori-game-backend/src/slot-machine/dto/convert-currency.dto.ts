// Purpose: DTO for converting currency in slot machine controller.
// Used Github Copilot to generate the class
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ConvertCurrencyDto {
  // For all the ApiProperty decorators, I used the example provided in the PDF test instructions
  @ApiProperty({
    description: 'Amount of money to convert',
    example: 100,
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    description: 'Currency to convert from',
    example: 'USD',
  })
  @IsString()
  @IsNotEmpty()
  from: string;

  @ApiProperty({
    description: 'Currency to convert to',
    example: 'EUR',
  })
  @IsString()
  @IsNotEmpty()
  to: string;
}
