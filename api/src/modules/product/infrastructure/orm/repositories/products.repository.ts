import { Injectable } from '@nestjs/common';

import { CreateProductDTO } from '@modules/product/domain/dtos/create-product.dto';
import { Product } from '@modules/product/domain/entities/product.entity';
import { ProductsRepository } from '@modules/product/domain/repositories/products.repository';
import { ProductCategory } from '@prisma/client';

@Injectable()
class ProductsRepositoryImpl implements ProductsRepository {
  async create(data: CreateProductDTO): Promise<Product> {
    const { name, category, description, price, stockQuantity } = data;

    const productMock = {
      id: 1,
      name: 'Product 1',
      category: ProductCategory.ELECTRONICS,
      description: 'Product 1',
      price: 10,
      stockQuantity: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      console.log(
        'Product data: ',
        name,
        category,
        description,
        price,
        stockQuantity,
      );

      await new Promise((resolve) => setTimeout(resolve, 1000));

      return productMock;
    } catch (e) {
      console.log(e);
      return productMock;
    }
  }
}

export { ProductsRepositoryImpl };
