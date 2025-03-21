import { Module } from '@nestjs/common';

import { PrismaService } from '@common/services/prisma.service';
import { ProductsRepositoryToken } from '@modules/product/domain/repositories/products.repository';
import { ProductsRepositoryImpl } from './products.repository';

const ProductsRepository = {
  useClass: ProductsRepositoryImpl,
  provide: ProductsRepositoryToken,
};

@Module({
  providers: [PrismaService, ProductsRepository],
  exports: [ProductsRepository],
})
export class RepositoriesModule {}
