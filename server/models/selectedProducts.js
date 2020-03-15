const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const selectedSchema = new Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  user: {
    type: Object
  }
});

// Populate products
selectedSchema.pre('find', async function() {
  this.populate('product');
});

module.exports = mongoose.model('Selected', selectedSchema);
