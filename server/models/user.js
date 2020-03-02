const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const validateEmail = email =>  {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

const userSchema = new Schema({
  method: {
    type: String,
    enum: ['local', 'google', 'facebook'],
    required: true
  },
  local: {
    name: {
      type: String
    },
    email: {
      type: String,
      trim: true,
      validate: [validateEmail, 'Please fill a valid email address']
    },
    password: {
      type: String,
    },
  },
  google: {
    id: {
      type: String
    },
    name: {
      type: String
    },
    email: {
      type: String,
      lowercase: true
    },
  },
  facebook: {
    id: {
      type: String
    },
    name: {
      type: String
    },
    email: {
      type: String,
      lowercase: true
    },
  },
  basket: {
    type: Array
  },
  selectedProducts: {
    type: Array
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Encrypt password
userSchema.pre('save', async function (next) {
  if(!this.method.includes('local')){
    next();
  }
  //the user schema is instantiated
  const user = this;
  //check if the user has been modified to know if the password has already been hashed
  if (!user.isModified('local.password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);

  // Re-assign hashed version over original, plain text password
  this.local.password = await bcrypt.hash(this.local.password, salt);

  next();
});

// Sign JWT and return
userSchema.methods.getSignedJwtToken = function(){
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  })
};

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function(password){
  return await bcrypt.compare(password, this.local.password);
};

// Generate and reset password token
userSchema.methods.getResetPasswordToken = async function(){
  // Generate token
  const resetToken = crypto.randomBytes(20).toLocaleString('hex');

  // Hash token  and set to resetPasswordToken field
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  // Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model('User', userSchema);
