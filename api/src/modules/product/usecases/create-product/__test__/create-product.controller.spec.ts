import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CreateProductController } from '../create-product.controller';
import { CreateProductService } from '../create-product.service';
import { CreateProductDTO } from '@modules/product/domain/dtos/create-product.dto';
import { Product } from '@modules/product/domain/entities/product.entity';
import { ProductCategory } from '@prisma/client';
import {
  ProductsRepository,
  ProductsRepositoryToken,
} from '@modules/product/domain/repositories/products.repository';

describe('CreateProductController (INTEGRATION)', () => {
  let app: INestApplication;
  let controller: CreateProductController;
  let service: CreateProductService;
  let repository: ProductsRepository;

  const mockRepository = {
    create: jest.fn(),
  };

  const mockProductService = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [CreateProductController],
      providers: [
        {
          provide: CreateProductService,
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
    controller = moduleFixture.get<CreateProductController>(
      CreateProductController,
    );
    service = moduleFixture.get<CreateProductService>(CreateProductService);
    repository = moduleFixture.get<ProductsRepository>(ProductsRepositoryToken);
  });

  afterEach(async () => {
    await app.close();
  });

  it('@POST /products should create a product', async () => {
    const productData: CreateProductDTO = {
      name: 'Test Product',
      category: ProductCategory.ELECTRONICS,
      price: 10.99,
      stockQuantity: 100,
    };

    const expectedProduct: Product = {
      id: 1,
      name: productData.name,
      category: ProductCategory.ELECTRONICS,
      price: productData.price,
      stockQuantity: productData.stockQuantity,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    (service.execute as jest.Mock).mockResolvedValue(expectedProduct);

    return request(app.getHttpServer())
      .post('/products')
      .send(productData)
      .expect(201)
      .expect((response) => {
        expect(response.body).toEqual({
          ...expectedProduct,
          createdAt: expectedProduct.createdAt.toISOString(),
          updatedAt: expectedProduct.updatedAt.toISOString(),
        });
        expect(service.execute).toHaveBeenCalledWith(productData);
      });
  });
});
