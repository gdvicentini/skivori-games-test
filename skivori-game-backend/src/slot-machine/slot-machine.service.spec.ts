import { Test, TestingModule } from '@nestjs/testing';
import { SlotMachineService } from './slot-machine.service';
import { HttpModule } from '@nestjs/axios';

describe('SlotMachineService', () => {
  let service: SlotMachineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [SlotMachineService],
    }).compile();

    service = module.get<SlotMachineService>(SlotMachineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
