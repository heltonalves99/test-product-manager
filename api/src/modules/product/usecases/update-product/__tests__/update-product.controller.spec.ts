import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as request from 'supertest';
import { UpdateProductController } from '../update-product.controller';
import { UpdateProductService } from '../update-product.service';
import { UpdateProductDTO } from '@modules/product/domain/dtos/update-product.dto';
import { Product } from '@modules/product/domain/entities/product.entity';
import {
  ProductsRepository,
  ProductsRepositoryToken,
} from '@modules/product/domain/repositories/products.repository';

describe('UpdateProductController (INTEGRATION)', () => {
  let app: INestApplication;
  let controller: UpdateProductController;
  let service: UpdateProductService;
  let repository: ProductsRepository;

  const mockProduct: Product = {
    id: 1,
    name: 'Product Test',
    category: 'ELECTRONICS',
    description: 'Product Test!',
    price: new Prisma.Decimal('19.99'),
    stockQuantity: 100,
    createdAt: new Date('2025-03-21T11:39:23.584Z'),
    updatedAt: new Date('2025-03-21T11:39:23.584Z'),
  };

  const mockUpdateProductData: UpdateProductDTO = {
    name: 'Updated Product',
    price: 29.99,
  };

  const mockRepository = {
    update: jest.fn(),
  };

  const mockProductService = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [UpdateProductController],
      providers: [
        {
          provide: UpdateProductService,
          useValue: mockProductService,
        },
        {
          provide: ProductsRepositoryToken,
          useValue: mockRepository,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    controller = moduleFixture.get<UpdateProductController>(
      UpdateProductController,
    );
    service = moduleFixture.get<UpdateProductService>(UpdateProductService);
    repository = moduleFixture.get<ProductsRepository>(ProductsRepositoryToken);
  });

  afterEach(async () => {
    await app.close();
  });

  it('@PUT /products should update the product', async () => {
    const expectedProduct = {
      ...mockProduct,
      ...mockUpdateProductData,
      price: new Prisma.Decimal(mockUpdateProductData.price ?? 0),
      updatedAt: new Date(),
    };

    (service.execute as jest.Mock).mockResolvedValue(expectedProduct);

    return request(app.getHttpServer())
      .put('/products/1')
      .send(mockUpdateProductData)
      .expect(200)
      .expect((response) => {
        expect(response.body).toEqual({
          ...expectedProduct,
          price: expectedProduct.price.toJSON(),
          createdAt: expectedProduct.createdAt.toISOString(),
          updatedAt: new Date(expectedProduct.updatedAt).toISOString(),
        });
        expect(service.execute).toHaveBeenCalledWith(1, mockUpdateProductData);
      });
  });
});
