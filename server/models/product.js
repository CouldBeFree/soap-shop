const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const ModelSchema = new Schema({
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
      'kits'
    ]
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  thumb: {
    type: Buffer,
    contentType: String
  }
});

ModelSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Product', ModelSchema);
