import { CreateProductDTO } from '../dtos/create-product.dto';
import { Product } from '../entities/product.entity';

export const ProductsRepositoryToken = 'ProductsRepository';

export interface ProductsRepository {
  create(data: CreateProductDTO): Promise<Product>;
}
