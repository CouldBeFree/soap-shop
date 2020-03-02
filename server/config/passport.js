const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;
const localStrategy = require('passport-local').Strategy;
const googlePlusTokenStrategy = require('passport-google-plus-token');
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

// GOOGLE OAUTH STRATEGY
passport.use('googleToken', new googlePlusTokenStrategy({
  clientID: '59305806445-6du20q97skt3i8djdhtqgfcgtv185b76.apps.googleusercontent.com',
  clientSecret: 'wUJ6mBkAwHSJxmdnnUUQAMIC'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    /*console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);
    console.log('profile', profile);*/

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
