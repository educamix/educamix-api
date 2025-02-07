import { Test, TestingModule } from '@nestjs/testing';
import { OperationalService } from './operational.service';

describe('OperationalService', () => {
  let service: OperationalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OperationalService],
    }).compile();

    service = module.get<OperationalService>(OperationalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
