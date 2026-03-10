import { IsString, IsNumber, IsInt, Min } from 'class-validator';

export class CreateCarDto {
  @IsString()
  brand: string;

  @IsString()
  model: string;

  @IsInt()
  @Min(1900)
  year: number;

  @IsNumber()
  categoryId: number; // ID категорії, до якої належить авто
}
