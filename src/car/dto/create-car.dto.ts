import { IsString, IsInt, Min } from 'class-validator';

export class CreateCarDto {
  @IsString()
  brand: string;

  @IsString()
  model: string;

  @IsInt()
  @Min(1900)
  year: number;

  @IsString()
  categoryId: string; // ID категорії, до якої належить авто
}
