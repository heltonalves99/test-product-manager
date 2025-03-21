import { Test, TestingModule } from '@nestjs/testing';
import { ListProductsController } from '../list-products.controller';
import { ListProductsService } from '../list-products.service';
import { Product } from '@modules/product/domain/entities/product.entity';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Prisma } from '@prisma/client';

import { ProductsRepositoryToken } from '@modules/product/domain/repositories/products.repository';

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Product Test 1',
    category: 'ELECTRONICS',
    description: 'Product Test!',
    price: new Prisma.Decimal('19.99'),
    stockQuantity: 100,
    createdAt: new Date('2025-03-21T11:39:23.584Z'),
    updatedAt: new Date('2025-03-21T11:39:23.584Z'),
  },
  {
    id: 2,
    name: 'T-Shirt',
    category: 'CLOTHING',
    description: 'Cotton t-shirt',
    price: new Prisma.Decimal('25.99'),
    stockQuantity: 50,
    createdAt: new Date('2025-03-21T12:19:40.034Z'),
    updatedAt: new Date('2025-03-21T12:19:40.034Z'),
  },
];

describe('ListProductController', () => {
  let app: INestApplication;

  const mockListProductsService = {
    execute: jest.fn().mockResolvedValue(mockProducts),
  };

  const mockRepository = {
    list: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListProductsController],
      providers: [
        {
          provide: ListProductsService,
          useValue: mockListProductsService,
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

  it('should return an array of products', async () => {
    const response = await request(app.getHttpServer())
      .get('/products')
      .expect(200);

    expect(response.body).toEqual(
      mockProducts.map((product) => ({
        ...product,
        price: product.price.toJSON(),
        createdAt: product.createdAt.toISOString(),
        updatedAt: product.updatedAt.toISOString(),
      })),
    );
  });
});
