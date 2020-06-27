const User = require('../models/user');
const asyncHandler = require('../middleware/async');
const errorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

// @desc Register new user
// @route POST api/v1/register/
// @access Public
exports.registerUser = asyncHandler(async (req, res, next) => {
  const { email, password, name } = req.body;

  //Check if user exists by email or nickname
  const isUserEmailExists = await User.findOne({ "local.email": email });
  if(isUserEmailExists) {
     return next(new errorResponse(`User with email ${email} already exists`, 200))
  }

  const isUserNicknameExists = await User.findOne({ "local.name": name });
  if(isUserNicknameExists) {
     return next(new errorResponse(`User with nick ${name} already exists`, 200))
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
  const user = await User.find({"_id": req.user._id});

  sendTokenResponse(user[0], 200, res);
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
  const user = await User.find({ "_id": req.user._id });

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

// @desc    Forgot password
// @route   PUT /api/v1/auth/forgot-password
// @access  Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {

  const user = await User.findOne({ $and: [ {method: 'local'}, { "local.email": req.body.email } ] });

  // Check if user exists
  if(!user){
    return next(new errorResponse(`There is no user with email ${req.body.email}`, 404))
  }

  // Get reset token
  const resetToken = await user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // Create reset url
  const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/reset-password/${resetToken}`;

  const message = `Please make PUT request to: \n\n ${resetUrl}`;

  try{
    await sendEmail({
      email: user.local.email,
      subject: 'Password reset token',
      message
    });

    res.status(200).json({ success: true, data: 'Email sent' })
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new errorResponse('Email could not be sent', 500))
  }

  sendTokenResponse(user, 200, res);
});

// @desc    Reset password
// @route   PUT /api/v1/auth/reset-password/:resettoken
// @access  Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  // Get hashed token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if(!user){
    return next(new errorResponse('Invalid token', 400))
  }

  // Set new password
  user.local.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
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
      user,
      token
    })
};
