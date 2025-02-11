import { Controller, Get, Query, InternalServerErrorException } from '@nestjs/common';
import { GamesService } from './games.service';
import { SearchGamesDto } from './dto/search-games.dto';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';

// All the decorators for Swagger documentation were added using Github Copilot, based on the ChatGPT response in other files
@ApiTags('Games')
@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  // Simple getAll method to use in the /games frontend route
  @Get()
  @ApiOperation({ summary: 'Get all games' })
  getAllGames() {
    return this.gamesService.getAllGames();
  }

  // The idea of this method is to search games by various criteria, thinking that the use would want to search by title, ID, slug, or provider name
  @Get('search')
  @ApiOperation({ summary: 'Search games by various criteria' })
  @ApiQuery({
    name: 'query',
    required: false,
    description: 'Search games by title or provider name',
    example: 'Legacy of Dead',
  })
  @ApiQuery({
    name: 'id',
    required: false,
    description: 'Search games by ID',
    example: 'playngo_legacy-of-dead',
  })
  @ApiQuery({
    name: 'slug',
    required: false,
    description: 'Search games by slug',
    example: 'playngo-legacy-of-dead',
  })
  @ApiQuery({
    name: 'providerName',
    required: false,
    description: 'Search games by provider name',
    example: 'Play\'n GO',
  })
  searchGames(@Query() searchGamesDto: SearchGamesDto) {
    try {
      return this.gamesService.searchGames(searchGamesDto);
    } catch (error) {
      console.error('Error in searchGames:', error.message);
      throw new InternalServerErrorException('Failed to search games. Please try again later.');
    }
  }
}
