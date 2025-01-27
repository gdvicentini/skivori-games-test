import { Test, TestingModule } from '@nestjs/testing';
import { GamesService } from './games.service';
import { GameDTO } from './dto/games.dto';

jest.mock('./mock-data/game-data.json', () => [
  {
    id: 'playngo_legacy-of-dead',
    slug: 'playngo-legacy-of-dead',
    title: 'Legacy of Dead',
    providerName: "Play'n GO",
    thumb: {
      url: '//images.ctfassets.net/5acrbcz937qe/3tqUiWTXh5AbOmcyQoR7zJ/606fcd268a6a24c14ba86ad55dc8d4cd/LegacyOfDead_280x280.jpg',
    },
  },
]);

describe('GamesService', () => {
  let service: GamesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GamesService],
    }).compile();

    service = module.get<GamesService>(GamesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have games data', () => {
    expect(service.getAllGames()).toHaveLength(26);
    expect(service.getAllGames()[0]).toBeInstanceOf(GameDTO);
    expect(service.getAllGames()[0].id).toBe('playngo_legacy-of-dead');
  });
});