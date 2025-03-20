import { ProductCategory } from '../enums/product-category.enum';

export class Product {
  id: number;
  name: string;
  category: ProductCategory;
  description?: string;
  price: number;
  stockQuantity: number;
  createdAt: Date;
  updatedAt: Date;
}
