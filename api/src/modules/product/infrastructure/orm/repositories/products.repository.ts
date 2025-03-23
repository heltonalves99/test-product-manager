import { Injectable } from '@nestjs/common';
import { ProductCategory } from '@prisma/client';

import { PrismaService } from '@common/services/prisma.service';
import { CreateProductDTO } from '@modules/product/domain/dtos/create-product.dto';
import { UpdateProductDTO } from '@modules/product/domain/dtos/update-product.dto';
import { Product } from '@modules/product/domain/entities/product.entity';
import { ProductsRepository } from '@modules/product/domain/repositories/products.repository';

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

  async list(): Promise<Product[]> {
    const products = await this.prisma.product.findMany();
    return products;
  }

  async update(id: number, data: UpdateProductDTO): Promise<Product> {
    return this.prisma.product.update({
      where: { id },
      data: {
        ...data,
        category: data.category
          ? ProductCategory[
              data.category.toUpperCase() as keyof typeof ProductCategory
            ]
          : undefined,
      },
    });
  }
}

export { ProductsRepositoryImpl };
