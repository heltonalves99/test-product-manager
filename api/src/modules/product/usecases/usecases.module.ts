import { Module } from '@nestjs/common';

import { CreateProductController } from './create-product/create-product.controller';
import { CreateProductService } from './create-product/create-product.service';

import { RepositoriesModule } from '../infrastructure/orm/repositories/repositories.module';

@Module({
  imports: [RepositoriesModule],
  controllers: [CreateProductController],
  providers: [CreateProductService],
})
export class UseCasesModule {}
