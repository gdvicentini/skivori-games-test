import { Controller, Post, Body } from '@nestjs/common';
import { SlotMachineService } from './slot-machine.service';
import { SpinDto } from './dto/spin.dto';
import { ConvertCurrencyDto } from './dto/convert-currency.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SpinResult } from './dto/spin-result.dto';

@ApiTags('Slot Machine')
@Controller('slot-machine')
export class SlotMachineController {
  constructor(private readonly slotMachineService: SlotMachineService) {}

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
