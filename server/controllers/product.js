const Product       = require('../models/product');
const asyncHandler  = require('../middleware/async');
const errorResponse = require('../utils/errorResponse');
const updateImages  = require('../utils/updateImages');

// @desc Add a product
// @route POST api/v1/product/
// @access Private
exports.postProduct = asyncHandler(async (req, res) => {

  const product = {
    name: req.body.name,
    category: req.body.category,
    price: req.body.price
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
  let product = await Product.findById(req.params.id);
  const files = req.files['images'];
  const imagesFromClient = req.body.images;

  const images = updateImages(files, imagesFromClient);

  const newProduct = {
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    images: images,
    description: req.body.description,
    compare_at_price: req.body.compare_at_price
  };

  if(!product) {
    return next(new errorResponse(`No product with the id of ${req.params.id}`), 404)
  }

  await Product.findOneAndUpdate({'_id': req.params.id}, newProduct, {
    runValidators: true
  });

  product = await Product.findOne({'_id': req.params.id});

  res.status(200).json({
    success: true,
    data: product
  })
});

// @desc Get products
// @route GET api/v1/product
// @access Public
exports.getProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find({});

  res.status(200).json({
    success: true,
    data: products
  })
});

// @desc Get product
// @route GET api/v1/product/:id
// @access Public
exports.getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if(!product) {
    return next(new errorResponse(`No product with the id of ${req.params.id}`), 200)
  }

  res.status(200).json({
    success: true,
    data: product
  })
});
