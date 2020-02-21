const User = require('../models/user');
const asyncHandler = require('../middleware/async');
const errorResponse = require('../utils/errorResponse');

// @desc Remove product
// @route Remove api/v1/user/:id
// @access Private
exports.removeUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if(!user) {
    return next(new errorResponse(`No user with the id of ${req.params.id}`), 404)
  }

  await user.remove();

  res.status(200).json({
    success: true,
    data: {}
  })
});
