import { Injectable, BadRequestException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { SpinResult } from './dto/spin-result.dto';
import { ConvertCurrencyDto } from './dto/convert-currency.dto';

@Injectable()
export class SlotMachineService {
  constructor(private readonly httpService: HttpService) {}

  private reels = [
    ['cherry', 'lemon', 'apple', 'lemon', 'banana', 'banana', 'lemon', 'lemon'],
    ['lemon', 'apple', 'lemon', 'lemon', 'cherry', 'apple', 'banana', 'lemon'],
    ['lemon', 'apple', 'lemon', 'apple', 'cherry', 'lemon', 'banana', 'lemon'],
  ];

  spin(balance: number): SpinResult {
    if (balance < 1) {
      throw new BadRequestException('Not enough coins to spin.');
    }

    const reels = this.reels.map(
      reel => reel[Math.floor(Math.random() * reel.length)],
    );

    const reward = this.calculateReward(reels);
    const updatedBalance = balance - 1 + reward;

    return { reels, reward, balance: updatedBalance };
  }

  private calculateReward(reels: string[]): number {
    const rewards = {
      cherry: [0, 40, 50],
      apple: [0, 10, 20],
      banana: [0, 5, 15],
      lemon: [0, 0, 3],
    };

    const counts = reels.reduce((acc: { [key: string]: number }, reel) => {
      acc[reel] = (acc[reel] || 0) + 1;
      return acc;
    }, {});

    for (const [key, value] of Object.entries(counts)) {
      if (value > 1) {
        return rewards[key][value - 1];
      }
    }

    return 0;
  }

  async convertCurrency(dto: ConvertCurrencyDto): Promise<number> {
    const { amount, from, to } = dto;

    const response = await this.httpService
      .get(`https://open.er-api.com/v6/latest/${from}`)
      .toPromise();

    const exchangeRate = response.data.rates[to];
    return amount * exchangeRate;
  }
}
