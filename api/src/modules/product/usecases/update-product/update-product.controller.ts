import { Controller, Put, Param, Body } from '@nestjs/common';
import { UpdateProductService } from './update-product.service';
import { UpdateProductDTO } from '../../domain/dtos/update-product.dto';

@Controller('products')
export class UpdateProductController {
  constructor(private readonly updateProductService: UpdateProductService) {}

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDTO,
  ) {
    return this.updateProductService.execute(+id, updateProductDto);
  }
}
