const Product = require('../models/product');
const asyncHandler = require('../middleware/async');
const errorResponse = require('../utils/errorResponse');

// @desc Add a product
// @route POST api/v1/product/
// @access Private
exports.postProduct = asyncHandler(async (req, res, next) => {
  const images = [];
  const files = req.files['products'];
  if(files.length){
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
      url: req.files['thumb'][0].path
    },
    images: images
  };

  const savedProduct = await Product.create(product);
  res.status(201).json({
    success: true,
    data: savedProduct
  })
});
