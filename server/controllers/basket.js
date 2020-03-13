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

  //const foundUser = await User.find({"_id": req.body.user});

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
  const user = await User.findById(req.body.user);
  const basketProduct = await Basket.find({ $and: [{ product: req.body.product }, { "user": req.body.user }]  });

  /*const basket = [
    {
      _id: '5e6a2c737b2417168ebb3e97'
    },
    {
      _id: '5e6a2c927b2417168ebb3e99'
    }
  ]

    const userBasket = ["5e6a2c737b2417168ebb3e97","5e6a2c927b2417168ebb3e99","5e6a2cf17b2417168ebb3e9a","5e6a2d0f7b2417168ebb3e9b","5e6a2d107b2417168ebb3e9c","5e6a2d297b2417168ebb3e9d"]
  */

  console.log(user.basket);

  res.status(200).json({
    success: true
  })
});
