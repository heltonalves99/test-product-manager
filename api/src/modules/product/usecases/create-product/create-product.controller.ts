import { Body, Controller, Post } from '@nestjs/common';

import { CreateProductDTO } from '../../domain/dtos/create-product.dto';
import { CreateProductService } from './create-product.service';

@Controller('/products')
export class CreateProductController {
  constructor(private createProductService: CreateProductService) {}

  @Post('/')
  createProduct(@Body() data: CreateProductDTO) {
    const product = this.createProductService.execute(data);
    return product;
  }
}
