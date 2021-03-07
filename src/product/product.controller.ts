import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { ProductsService } from './product.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  /**
   * Create a new product
   * @param productName : String
   * @param productDescription : String
   * @param productPrice : Number
   */
  @Post()
  async addProduct(
    @Body('name') productName: string,
    @Body('description') productDescription: string,
    @Body('price') productPrice: number,
  ) {
    const product = await this.productsService.createProduct(
      productName,
      productDescription,
      productPrice,
    );
    return { product };
  }

  /**
   * Get list of all products
   */
  @Get()
  async getAllProducts() {
    const products = await this.productsService.getProducts();
    return products;
  }

  /**
   * Get a specific product by ID
   * @param prodId : String
   */
  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productsService.getProductById(prodId);
  }

  /**
   * Update a specific product by ID
   * @param productId : String
   * @param productName : String
   * @param productDesc : String
   * @param productPrice : Number
   */
  @Patch(':id')
  async updateProduct(
    @Param('id') productId: string,
    @Body('name') productName: string,
    @Body('description') productDesc: string,
    @Body('price') productPrice: number,
  ) {
    const result = await this.productsService.updateProduct(
      productId,
      productName,
      productDesc,
      productPrice,
    );
    return result;
  }

  /**
   * Delete a specific product by ID
   * @param productId : String
   */
  @Delete(':id')
  async removeProduct(@Param('id') productId: string) {
    const res = await this.productsService.deleteProduct(productId);
    return res;
  }
}
