const User = require('../models/user');
const asyncHandler = require('../middleware/async');
const errorResponse = require('../utils/errorResponse');

// @desc Register new user
// @route POST api/v1/register/
// @access Public
exports.registerUser = asyncHandler(async (req, res, next) => {
  const { email, password, name } = req.body;

  //Check if user exists
  const isUserExists = await User.findOne({ "local.email": email });
  if(isUserExists) {
     return next(new errorResponse(`User with email ${email} already exists`, 404))
  }

  // Create a new user
  const newUser = new User({
    method: 'local',
    local: {
      email: email,
      password: password,
      name: name
    }
  });

  await newUser.save();

  sendTokenResponse(newUser, 201, res);
});

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  sendTokenResponse(req.user, 200, res);
});

// @desc    Login with Google
// @route   POST /api/v1/auth/signin-google
// @access  Public
exports.googleOAuthLogin = asyncHandler(async (req, res, next) => {
  sendTokenResponse(req.user, 200, res);
});

// @desc    Login with Google
// @route   POST /api/v1/auth/signin-facebook
// @access  Public
exports.facebookLogin = asyncHandler(async (req, res, next) => {
  sendTokenResponse(req.user, 200, res);
});

// @desc    Get current logged user
// @route   GET /api/v1/me
// @access  Private
exports.getMe = asyncHandler(async (req, res) => {
  const user = req.user;

  res.status(200).json({
    success: true,
    data: user
  })
});

// @desc    Update user details
// @route   PUT /api/v1/auth/updatedetails
// @access  Private
exports.updateDetails = asyncHandler(async (req, res) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email
  };

  const user = await User.findByIdAndUpdate(req.params.id, fieldsToUpdate, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: user
  })
});

// @desc    Update password
// @route   PUT /api/v1/auth/updatepassword
// @access  Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  // Check current password
  if(!(await user.matchPassword(req.body.currentPassword))){
    return next(new errorResponse('Password is incorrect', 401))
  }

  user.password = req.body.newPassword;
  await user.save();

  sendTokenResponse(user, 200, res);
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true
  };

  if(process.env.NODE_ENV === 'production'){
    options.secure = true
  }

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token
    })
};
