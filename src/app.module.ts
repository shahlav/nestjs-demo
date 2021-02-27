import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './product/product.module';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forRoot(
      'mongodb+srv://db-admin:IModmYva4cXbgcaG@cluster0.m3i8w.mongodb.net/products?retryWrites=true&w=majority',
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
