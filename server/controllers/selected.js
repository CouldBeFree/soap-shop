const User = require('../models/user');
const Product = require('../models/product');
const Selected = require('../models/selectedProducts');
const asyncHandler = require('../middleware/async');
const errorResponse = require('../utils/errorResponse');

// @desc Add product to selected
// @route POST api/v1/select
// @access Private
exports.addSelectedProduct = asyncHandler(async (req, res, next) => {
  // Find the user
  const user = await User.findById(req.user._id);
  if(!user) {
    return next(new errorResponse('User not found', 404))
  }

  const product = await Product.findById(req.body.product);
  if(!product) {
    return next(new errorResponse('Product not found', 404))
  }

  const existingSelect = await Selected.find({ $and: [{"user":req.user._id}, {"product":req.body.product}] });
  if(existingSelect.length) {
    return next(new errorResponse('This user is already selected this product', 400))
  }

  const newProduct = {
    user: req.user._id,
    product: req.body.product
  };

  // Create new select document
  const newSelectedProduct = new Selected(newProduct);

  await newSelectedProduct.save();

  user.selectedProducts.push(newSelectedProduct);
  await user.save();

  const foundUser = await User.find({_id: req.user._id});
  const { selectedProducts } = foundUser[0];

  res.status(200).json({
    success: true,
    data: selectedProducts
  })
});
