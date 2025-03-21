import { IsNotEmpty, IsNumber, IsEnum, Min } from 'class-validator';
import { ProductCategory } from '@prisma/client';

export class CreateProductDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEnum(ProductCategory)
  category: string;

  description?: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  stockQuantity: number;
}
