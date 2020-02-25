const errorResponse = require('../utils/errorResponse');
const asyncHandler = require('./async');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    token = req.headers.authorization.split(' ')[1];
  } else if(req.cookies.token){
    token = req.cookies.token
  }

  // Make sure token exists
  if(!token){
    return next(new errorResponse('Not authorized to access this route', 401))
  }

  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    console.info('user', req.user);
    next();
  }catch (e) {
    return next(new errorResponse('Not authorized to access this route', 401))
  }
});
