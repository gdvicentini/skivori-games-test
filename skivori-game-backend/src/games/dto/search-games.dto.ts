// Purpose: DTO for searching games in games controller.
// Used Github Copilot to generate the class
import { IsString, IsOptional } from 'class-validator';

export class SearchGamesDto {
  @IsOptional()
  @IsString()
  query?: string;

  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  providerName?: string;
}
