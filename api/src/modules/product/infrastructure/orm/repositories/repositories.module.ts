import { Module } from '@nestjs/common';

import { ProductsRepositoryToken } from '@modules/product/domain/repositories/products.repository';
import { ProductsRepositoryImpl } from './products.repository';

const ProductsRepository = {
  useClass: ProductsRepositoryImpl,
  provide: ProductsRepositoryToken,
};

@Module({
  providers: [ProductsRepository],
  exports: [ProductsRepository],
})
export class RepositoriesModule {}
