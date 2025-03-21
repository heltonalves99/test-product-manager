import { Module } from '@nestjs/common';

import { CreateProductController } from './create-product/create-product.controller';
import { CreateProductService } from './create-product/create-product.service';
import { ListProductsController } from './list-products/list-products.controller';
import { ListProductsService } from './list-products/list-products.service';

import { RepositoriesModule } from '../infrastructure/orm/repositories/repositories.module';

@Module({
  imports: [RepositoriesModule],
  controllers: [CreateProductController, ListProductsController],
  providers: [CreateProductService, ListProductsService],
})
export class UseCasesModule {}
