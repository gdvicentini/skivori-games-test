import { ApiProperty } from '@nestjs/swagger';

export class SpinResult {
  @ApiProperty({
    description: 'Result of the slot machine spin (symbols on each reel)',
    example: ['cherry', 'lemon', 'apple'],
  })
  reels: string[];

  @ApiProperty({
    description: 'The reward based on the symbols spun',
    example: 50,
  })
  reward: number;

  @ApiProperty({
    description: 'The updated balance after the spin',
    example: 150,
  })
  balance: number;
}
