import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Game } from './entities/game.entity';
import { SearchGamesDto } from './dto/search-games.dto';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
  ) {}

  async getAllGames(): Promise<Game[]> {
    return this.gameRepository.find();
  }

  async searchGames(searchCriteria: Partial<SearchGamesDto>): Promise<Game[]> {
    try {
      const { query, id, slug, providerName } = searchCriteria;

      return this.gameRepository.find({
        where: [
          ...(query ? [
            { title: ILike(`%${query}%`) },
            { providerName: ILike(`%${query}%`) },
          ] : []),
          ...(id ? [{ id }] : []),
          ...(slug ? [{ slug: ILike(`%${slug}%`) }] : []),
          ...(providerName ? [{ providerName: ILike(`%${providerName}%`) }] : []),
        ],
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      console.error('Error while searching games:', message);
      throw new InternalServerErrorException('An error occurred while searching games.');
    }
  }
}