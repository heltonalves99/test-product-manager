import { Test, TestingModule } from '@nestjs/testing';
import { CreateProductService } from '../create-product.service';
import {
  ProductsRepository,
  ProductsRepositoryToken,
} from '@modules/product/domain/repositories/products.repository';
import { CreateProductDTO } from '@modules/product/domain/dtos/create-product.dto';
import { Product } from '@modules/product/domain/entities/product.entity';
import { ProductCategory } from '@prisma/client';

describe('CreateProductService', () => {
  let service: CreateProductService;
  let repository: ProductsRepository;

  const mockProductRepository = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateProductService,
        {
          provide: ProductsRepositoryToken,
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    service = module.get<CreateProductService>(CreateProductService);
    repository = module.get<ProductsRepository>(ProductsRepositoryToken);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a product', async () => {
    const productData: CreateProductDTO = {
      name: 'Test Product',
      category: ProductCategory.ELECTRONICS,
      price: 10,
      stockQuantity: 10,
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

    (repository.create as jest.Mock).mockResolvedValue(expectedProduct);

    const result = await service.execute(productData);

    expect(repository.create).toHaveBeenCalledWith(productData);
    expect(result).toEqual(expectedProduct);
  });
});
