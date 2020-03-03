const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const basketSchema = new Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  user: {
    type: Object
  },
  /*user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },*/
});

// Populate products
basketSchema.pre('find', async function() {
  this.populate('product');
});

module.exports = mongoose.model('Basket', basketSchema);
