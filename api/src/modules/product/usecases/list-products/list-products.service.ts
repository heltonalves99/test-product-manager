import { Inject, Injectable } from '@nestjs/common';

import { Product } from '../../domain/entities/product.entity';
import {
  ProductsRepository,
  ProductsRepositoryToken,
} from '@modules/product/domain/repositories/products.repository';

@Injectable()
export class ListProductsService {
  constructor(
    @Inject(ProductsRepositoryToken)
    private productsRepository: ProductsRepository,
  ) {}

  async execute(): Promise<Product[]> {
    const products = await this.productsRepository.list();
    return products;
  }
}
