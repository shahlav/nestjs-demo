import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from './product.model';
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async createProduct(name: string, desc: string, price: number) {
    console.log(name);
    const newProduct = new this.productModel({
      name,
      description: desc,
      price,
    });
    const result = await newProduct.save();
    return result;
  }

  async getProducts() {
    const products = await this.productModel.find().exec();
    return products;
  }

  async getProductById(productId: string) {
    const product = await this.findProduct(productId);
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
    };
  }

  async updateProduct(
    productId: string,
    name: string,
    desc: string,
    price: number,
  ) {
    const product = await this.findProduct(productId);
    const result = await product.updateOne({
      $set: {
        name: name ? name : product.name,
        description: desc ? desc : product.description,
        price: price ? price : product.price,
      },
    });
    if (result.n === 0) {
      throw new NotFoundException(
        `Product with ID: ${productId} does not exist.`,
      );
    }
    return {
      message: `A product with ID: ${productId} has been updated successfully`,
    };
  }

  async deleteProduct(prodId: string) {
    const result = await this.productModel.deleteOne({ _id: prodId }).exec();
    if (result.n === 0) {
      throw new NotFoundException(`Product with ID: ${prodId} does not exist.`);
    }
    return {
      message: `A product with ID: ${prodId} has been deleted successfully`,
    };
  }

  private async findProduct(id: string): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException(`Product with ID: ${id} does not exist.`);
    }
    if (!product) {
      throw new NotFoundException(`Product with ID: ${id} does not exist.`);
    }
    return product;
  }
}
