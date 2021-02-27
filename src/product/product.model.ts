import * as mongoose from 'mongoose';
import _ from 'lodash';

export const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

ProductSchema.method({
  safeModel() {
    return _.omit(this.toObject(), ['__v']);
  },
})

export interface Product extends mongoose.Document {
  id: string;
  name: string;
  description: string;
  price: number;
}
