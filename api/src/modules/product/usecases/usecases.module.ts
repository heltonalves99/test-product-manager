import { Module } from '@nestjs/common';

import { CreateProductController } from './create-product/create-product.controller';
import { CreateProductService } from './create-product/create-product.service';
import { ListProductsController } from './list-products/list-products.controller';
import { ListProductsService } from './list-products/list-products.service';
import { UpdateProductController } from './update-product/update-product.controller';
import { UpdateProductService } from './update-product/update-product.service';

import { RepositoriesModule } from '../infrastructure/orm/repositories/repositories.module';

@Module({
  imports: [RepositoriesModule],
  controllers: [
    CreateProductController,
    ListProductsController,
    UpdateProductController,
  ],
  providers: [CreateProductService, ListProductsService, UpdateProductService],
})
export class UseCasesModule {}
