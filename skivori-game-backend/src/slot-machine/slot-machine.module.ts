import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SlotMachineController } from './slot-machine.controller';
import { SlotMachineService } from './slot-machine.service';

@Module({
  imports: [HttpModule],
  controllers: [SlotMachineController],
  providers: [SlotMachineService]
})
export class SlotMachineModule {}
