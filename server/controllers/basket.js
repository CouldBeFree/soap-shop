const Product = require('../models/product');
const User = require('../models/user');
const Basket = require('../models/basketProducts');
const asyncHandler = require('../middleware/async');
const errorResponse = require('../utils/errorResponse');

// @desc Add product to basket
// @route POST api/v1/product/basket
// @access Private
exports.addProductBasket = asyncHandler(async (req, res, next) => {
  // Find the user
  const user = await User.findById(req.body.user);

  if(!user) {
    return next(new errorResponse('User not found', 404))
  }

  // Create new basket
  const newBasketProduct = new Basket(req.body);

  await newBasketProduct.save();

  user.basket.push(newBasketProduct);
  await user.save();

  const foundUser = await User.find({"_id": req.body.user});
  const { basket } = foundUser[0];

  res.status(200).json({
    success: true,
    data: basket
  })
});

// @desc Add product to basket
// @route DELETE api/v1/product/basket
// @access Private
exports.removeProductBasket = asyncHandler(async (req, res, next) => {
  // Find the user
  const user = await User.findById(req.body.user);
  // Find basket product
  const basketProduct = await Basket.find({ $and: [{ product: req.body.product }, { "user": req.body.user }]  });

  // Remove basket document
  for(const product of basketProduct){
    await Basket.findOneAndDelete({_id: product._id});
  }

  // Remove product from user document
  for(const i of basketProduct){
    const index = user.basket.findIndex((el) => {
      return el.toString() === i._id.toString()
    });
    if(index > -1){
      user.basket.splice(index, 1)
    }
  }

  await user.save();
  const foundUser = await User.find({"_id": req.body.user});
  const { basket } = foundUser[0];

  res.status(200).json({
    success: true,
    data: basket
  })
});
