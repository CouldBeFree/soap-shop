const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'woman',
      'man',
      'baby-soap',
      'bouquets',
      'kits',
      'natural'
    ]
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  thumb: {
    url: String
  },
  slug: {
    type: String
  },
  images: [{url: String}]
});

ProductSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Product', ProductSchema);
