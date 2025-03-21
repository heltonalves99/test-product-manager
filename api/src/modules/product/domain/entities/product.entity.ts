import { ProductCategory, Prisma } from '@prisma/client';

export class Product {
  id: number;
  name: string;
  category: ProductCategory;
  description?: string | null;
  price: Prisma.Decimal;
  stockQuantity: number;
  createdAt: Date;
  updatedAt: Date;
}
