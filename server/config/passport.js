const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;
const localStrategy = require('passport-local').Strategy;
const googlePlusTokenStrategy = require('passport-google-plus-token');
const { ExtractJwt } = require('passport-jwt');
const facebookTokenStrategy = require('passport-facebook-token');
const User = require('../models/user');

// JSON WEB TOKEN STRATEGY
passport.use('jwt', new jwtStrategy({
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

// GOOGLE OAUTH STRATEGY
passport.use('googleToken', new googlePlusTokenStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Check whether this current user exists in our DB
    const existingUser = await User.findOne({ "google.id": profile.id });
    if(existingUser){
      return done(null, existingUser)
    }

    const newUser = new User({
      method: 'google',
      google: {
        id: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName
      }
    });

    await newUser.save();
    done(null, newUser);
  } catch(error) {
    done(error, false, error.message)
  }

}));

// FACEBOOK OAUTH STRATEGY
passport.use('facebookToken', new facebookTokenStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const existingUser = await User.findOne({ "facebook.id": profile.id });
    if(existingUser) {
      return done(null, existingUser)
    }

    const newUser = new User({
      method: 'facebook',
      facebook: {
        id: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName
      }
    });

    await newUser.save();
    done(null, newUser);
  } catch (error) {
    done(error, false, error.message)
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
