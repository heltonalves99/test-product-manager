import { Injectable } from '@nestjs/common';

import { PrismaService } from '@common/services/prisma.service';
import { CreateProductDTO } from '@modules/product/domain/dtos/create-product.dto';
import { Product } from '@modules/product/domain/entities/product.entity';
import { ProductsRepository } from '@modules/product/domain/repositories/products.repository';
import { ProductCategory } from '@prisma/client';

@Injectable()
class ProductsRepositoryImpl implements ProductsRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateProductDTO): Promise<Product> {
    const { name, category, description, price, stockQuantity } = data;

    try {
      const product = await this.prisma.product.create({
        data: {
          name,
          category:
            ProductCategory[
              category.toUpperCase() as keyof typeof ProductCategory
            ],
          description,
          price,
          stockQuantity,
        },
      });

      return product;
    } catch (e) {
      console.log(e);
      throw new Error('Failed to create product');
    }
  }
}

export { ProductsRepositoryImpl };
