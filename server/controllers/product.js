const Product = require('../models/product');
const User = require('../models/user');
const Basket = require('../models/basketProducts');
const asyncHandler = require('../middleware/async');
const errorResponse = require('../utils/errorResponse');

// @desc Add a product
// @route POST api/v1/product/
// @access Private
exports.postProduct = asyncHandler(async (req, res) => {
  const images = [];
  const files = req.files['images'];
  if(files && files.length){
    for(const image of files){
      const imageObj = { url: image.path };
      images.push(imageObj);
    }
  }

  const product = {
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    thumb: {
      url: req.files['thumb'] ? req.files['thumb'][0].path : ''
    },
    images: images
  };

  const savedProduct = await Product.create(product);
  res.status(201).json({
    success: true,
    data: savedProduct
  })
});

// @desc Delete product
// @route DELETE api/v1/product/:id
// @access Private
exports.removeProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if(!product) {
    return next(new errorResponse(`No product with the id of ${req.params.id}`), 404)
  }

  await product.remove();

  res.status(200).json({
    success: true,
    data: {}
  })
});

// @desc Update product
// @route PUT api/v1/product/:id
// @access Private
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const images = [];
  const files = req.files['images'];
  if(files && files.length){
    for(const image of files){
      const imageObj = { url: image.path };
      images.push(imageObj);
    }
  }

  const newProduct = {
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    thumb: {
      url: req.files['thumb'] ? req.files['thumb'][0].path : ''
    },
    images: images
  };

  let product = await Product.findById(req.params.id);

  if(!product) {
    return next(new errorResponse(`No product with the id of ${req.params.id}`), 404)
  }

  product = await Product.findOneAndUpdate(req.params.id, newProduct, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: product
  })
});

// @desc Add product to basket
// @route POST api/v1/product/basket
// @access Private
exports.addProductBasket = asyncHandler(async (req, res, next) => {
  // Find the user
  const user = await User.findById(req.body.user);

  // Create new basket
  const newBasketProduct = new Basket(req.body);

  await newBasketProduct.save();

  user.basket.push(newBasketProduct);
  await user.save();

  res.status(200).json({
    success: true
  })
});

// @desc Add product to basket
// @route DELETE api/v1/product/basket
// @access Private
exports.removeProductBasket = asyncHandler(async (req, res, next) => {
  /*// Find the user
  const user = await User.findById(req.body.user);

  // Create new basket
  const newBasketProduct = new Basket(req.body);

  await newBasketProduct.save();

  user.basket.push(newBasketProduct);
  await user.save();*/
  // Find the user
  console.log('Olololololo');
  const user = await User.findById(req.body.user);

  console.log(user);
  console.log(req.body.user);
  console.log(req.body.product);

  res.status(200).json({
    success: true
  })
});
