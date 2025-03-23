import { Module } from '@nestjs/common';

import { CreateProductController } from './create-product/create-product.controller';
import { CreateProductService } from './create-product/create-product.service';
import { GetProductController } from './get-product/get-product.controller';
import { GetProductService } from './get-product/get-product.service';
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
    GetProductController,
  ],
  providers: [
    CreateProductService,
    ListProductsService,
    UpdateProductService,
    GetProductService,
  ],
})
export class UseCasesModule {}
