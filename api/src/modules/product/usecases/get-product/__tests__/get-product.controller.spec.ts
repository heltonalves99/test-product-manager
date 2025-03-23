import { Test, TestingModule } from '@nestjs/testing';
import { GetProductController } from '../get-product.controller';
import { GetProductService } from '../get-product.service';
import { Product } from '@modules/product/domain/entities/product.entity';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Prisma } from '@prisma/client';

import { ProductsRepositoryToken } from '@modules/product/domain/repositories/products.repository';

const mockProduct: Product = {
  id: 1,
  name: 'Product Test 1',
  category: 'ELECTRONICS',
  description: 'Product Test!',
  price: new Prisma.Decimal('19.99'),
  stockQuantity: 100,
  createdAt: new Date('2025-03-21T11:39:23.584Z'),
  updatedAt: new Date('2025-03-21T11:39:23.584Z'),
};

describe('GetProductController', () => {
  let app: INestApplication;

  const mockGetProductService = {
    execute: jest.fn().mockResolvedValue(mockProduct),
  };

  const mockRepository = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetProductController],
      providers: [
        {
          provide: GetProductService,
          useValue: mockGetProductService,
        },
        {
          provide: ProductsRepositoryToken,
          useValue: mockRepository,
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('should return a product by id', async () => {
    const response = await request(app.getHttpServer())
      .get('/products/1')
      .expect(200);

    expect(response.body).toEqual({
      ...mockProduct,
      price: mockProduct.price.toJSON(),
      createdAt: mockProduct.createdAt.toISOString(),
      updatedAt: mockProduct.updatedAt.toISOString(),
    });
  });
});
