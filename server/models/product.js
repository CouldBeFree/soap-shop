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
      'жіноче',
      'чоловіче',
      'дитяче',
      'букети',
      'набори',
      'натуральне'
    ]
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  slug: {
    type: String
  },
  images: [ {url: String} ]
});

ProductSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Product', ProductSchema);
