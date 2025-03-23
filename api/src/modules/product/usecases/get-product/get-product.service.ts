import { Injectable, Inject } from '@nestjs/common';

import {
  ProductsRepository,
  ProductsRepositoryToken,
} from '@modules/product/domain/repositories/products.repository';

@Injectable()
export class GetProductService {
  constructor(
    @Inject(ProductsRepositoryToken)
    private productsRepository: ProductsRepository,
  ) {}

  async execute(id: number) {
    return this.productsRepository.findOne(id);
  }
}
