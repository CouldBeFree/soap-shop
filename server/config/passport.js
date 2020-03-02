const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;
const localStrategy = require('passport-local').Strategy;
const { ExtractJwt } = require('passport-jwt');
const User = require('../models/user');

// JSON WEB TOKEN STRATEGY
passport.use(new jwtStrategy({
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.JWT_SECRET
}, async (payload, done) => {
  try {
    // Find the user specified in token
    const user = await User.findById(payload.id);
    if(!user) {
      return done(null, false)
    }

    done(null, user);
  } catch(err) {
    done(err, false)
  }
}));

// Local strategy
passport.use(new localStrategy({
  usernameField: 'email',
}, async (email, password, done) => {
  try{
    // Find the given email
    const user = await User.findOne({ "local.email": email });
    if(!user) {
      return done(null, false)
    }

    // Check if password correct
    const isMatch = await user.matchPassword(password);

    if(!isMatch){
      return done(null, false);
    }

    // Return the user
    done(null, user);
  } catch (err) {
    done(err, false)
  }
}));
