import { Controller, Post, Body } from '@nestjs/common';
import { SlotMachineService } from './slot-machine.service';
import { SpinDto } from './dto/spin.dto';
import { ConvertCurrencyDto } from './dto/convert-currency.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SpinResult } from './dto/spin-result.dto';

// All the decorators for Swagger documentation were added using Github Copilot, based on the ChatGPT response in other files
@ApiTags('Slot Machine')
@Controller('slot-machine')
export class SlotMachineController {
  constructor(private readonly slotMachineService: SlotMachineService) {}

  // The startGame method is used to initialize the game with 20 coins. For mock tests, the usage of the route is not necessary. However, when the game is integrated into a database, this route will be used to start the game.
  @Post('/start')
  @ApiOperation({ summary: 'Start a new game with 20 coins' })
  @ApiResponse({
    status: 200,
    description: 'Returns the initial balance',
    type: Number,
  })
  startGame() {
    return { balance: 20 };
  }

  // The spin method is used to spin the slot machine with the given balance. The balance is passed as a parameter in the request body. The response will contain the result of the spin as requested in the PDF test document.
  @Post('spin')
  @ApiOperation({ summary: 'Spin the slot machine with the given balance' })
  @ApiResponse({
    status: 200,
    description: 'Returns the result of the spin',
    type: SpinResult,
  })
  spin(@Body() spinDto: SpinDto): SpinResult {
    return this.slotMachineService.spin(spinDto.balance);
  }

  // The convertCurrency method is used to convert the currency using real-time exchange rates. The amount and currency code are passed as parameters in the request body. The response will contain the converted currency amount.
  @Post('convert-currency')
  @ApiOperation({ summary: 'Convert currency using real-time exchange rates' })
  @ApiResponse({
    status: 200,
    description: 'Returns the converted currency amount',
    type: Number,
  })
  async convertCurrency(@Body() dto: ConvertCurrencyDto) {
    return this.slotMachineService.convertCurrency(dto);
  }
}
