import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { GetProductService } from './get-product.service';

@Controller('products')
export class GetProductController {
  constructor(private readonly getProductService: GetProductService) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.getProductService.execute(+id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }
}
