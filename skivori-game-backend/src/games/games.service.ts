import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { GameDTO } from './dto/games.dto';
import { readFileSync } from 'fs';
import { join } from 'path';
import { SearchGamesDto } from './dto/search-games.dto';

@Injectable()
export class GamesService {
  private readonly games: GameDTO[] = [];
  constructor() {
    const filePath = join(__dirname, 'mock-data', 'game-data.json');
    const gamesData = JSON.parse(readFileSync(filePath, 'utf-8'));
    this.games = (gamesData as any[]).map(
      (game) => new GameDTO(game.id, game.slug, game.title, game.providerName, game.thumb.url)
    );
  }

  getAllGames(): GameDTO[] {
    return this.games;
  }
  
  searchGames(searchCriteria: Partial<SearchGamesDto>): GameDTO[] {
    try {
      return this.games.filter((game) => {
        const { query, id, slug, providerName } = searchCriteria;
  
        const matchesQuery =
          query &&
          (game.title.toLowerCase().includes(query.toLowerCase()) ||
            game.providerName.toLowerCase().includes(query.toLowerCase()));
  
        const matchesId = id && game.id === id;
        const matchesSlug = slug && game.slug.toLowerCase() === slug.toLowerCase();
        const matchesProviderName =
          providerName && game.providerName.toLowerCase() === providerName.toLowerCase();
  
        return matchesQuery || matchesId || matchesSlug || matchesProviderName;
      });
    } catch (error) {
      console.error('Error while searching games:', error.message);
      throw new InternalServerErrorException('An error occurred while searching games.');
    }
  }
}
