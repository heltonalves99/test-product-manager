import { CreateProductDTO } from '../dtos/create-product.dto';
import { UpdateProductDTO } from '../dtos/update-product.dto';
import { Product } from '../entities/product.entity';

export const ProductsRepositoryToken = 'ProductsRepository';

export interface ProductsRepository {
  create(data: CreateProductDTO): Promise<Product>;
  list(): Promise<Product[]>;
  update(id: number, data: UpdateProductDTO): Promise<Product>;
  findOne(id: number): Promise<Product | null>;
}
