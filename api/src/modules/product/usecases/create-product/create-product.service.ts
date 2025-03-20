import { Inject, Injectable } from '@nestjs/common';

import {
  ProductsRepository,
  ProductsRepositoryToken,
} from '@modules/product/domain/repositories/products.repository';

import { CreateProductDTO } from '../../domain/dtos/create-product.dto';
import { Product } from '../../domain/entities/product.entity';

@Injectable()
export class CreateProductService {
  constructor(
    @Inject(ProductsRepositoryToken)
    private productsRepository: ProductsRepository,
  ) {}

  async execute(data: CreateProductDTO): Promise<Product> {
    const product = await this.productsRepository.create(data);
    return product;
  }
}
