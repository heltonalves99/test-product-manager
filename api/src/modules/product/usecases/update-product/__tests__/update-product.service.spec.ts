import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { UpdateProductService } from '../update-product.service';
import {
  ProductsRepository,
  ProductsRepositoryToken,
} from '@modules/product/domain/repositories/products.repository';
import { UpdateProductDTO } from '@modules/product/domain/dtos/update-product.dto';
import { Product } from '@modules/product/domain/entities/product.entity';

describe('UpdateProductService', () => {
  let service: UpdateProductService;
  let repository: ProductsRepository;

  const mockProductRepository = {
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateProductService,
        {
          provide: ProductsRepositoryToken,
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    service = module.get<UpdateProductService>(UpdateProductService);
    repository = module.get<ProductsRepository>(ProductsRepositoryToken);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should update a product', async () => {
    const productData: UpdateProductDTO = {
      name: 'Updated Product',
      stockQuantity: 50,
    };

    const expectedProduct: Product = {
      id: 1,
      name: 'Product Test',
      category: 'ELECTRONICS',
      description: 'Product Test!',
      price: new Prisma.Decimal('19.99'),
      stockQuantity: 100,
      createdAt: new Date('2025-03-21T11:39:23.584Z'),
      updatedAt: new Date('2025-03-21T11:39:23.584Z'),
    };

    (repository.update as jest.Mock).mockResolvedValue(expectedProduct);

    const result = await service.execute(1, productData);

    expect(repository.update).toHaveBeenCalledWith(1, productData);
    expect(result).toEqual(expectedProduct);
  });
});
