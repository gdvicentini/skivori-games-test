import { Test, TestingModule } from '@nestjs/testing';
import { SlotMachineController } from './slot-machine.controller';
import { SlotMachineService } from './slot-machine.service';
import { HttpModule } from '@nestjs/axios';

describe('SlotMachineController', () => {
  let controller: SlotMachineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [SlotMachineController],
      providers: [SlotMachineService],
    }).compile();

    controller = module.get<SlotMachineController>(SlotMachineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
