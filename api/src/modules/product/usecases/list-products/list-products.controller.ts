import { Controller, Get } from '@nestjs/common';

import { ListProductsService } from './list-products.service';

@Controller('/products')
export class ListProductsController {
  constructor(private listProductsService: ListProductsService) {}

  @Get('/')
  async listProducts() {
    const products = await this.listProductsService.execute();
    return products;
  }
}
