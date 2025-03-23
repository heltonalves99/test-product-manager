import { Inject, Injectable } from '@nestjs/common';
import { UpdateProductDTO } from '../../domain/dtos/update-product.dto';
import {
  ProductsRepository,
  ProductsRepositoryToken,
} from '@modules/product/domain/repositories/products.repository';

@Injectable()
export class UpdateProductService {
  constructor(
    @Inject(ProductsRepositoryToken)
    private productsRepository: ProductsRepository,
  ) {}

  async execute(id: number, updateProductDTO: UpdateProductDTO) {
    return this.productsRepository.update(id, updateProductDTO);
  }
}
