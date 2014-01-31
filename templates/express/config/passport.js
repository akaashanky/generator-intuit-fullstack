'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    IntuitStrategy = require('passport-intuit-oauth').Strategy;

var INTUIT_CONSUMER_KEY = "--insert your app consumer key here--";
var INTUIT_CONSUMER_SECRET = "--insert your app consumer secret here--";

/**
 * Passport configuration
 */
module.exports = function() {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function(id, done) {
    User.findOne({
      _id: id
    }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
      done(err, user);
    });
  });

// add other strategies for more authentication flexibility
passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password' // this is the virtual field on the model
    },
    function(email, password, done) {
      User.findOne({
        email: email
      }, function(err, user) {
        if (err) return done(err);
        
        if (!user) {
          return done(null, false, {
            message: 'This email is not registered.'
          });
        }
        if (!user.authenticate(password)) {
          return done(null, false, {
            message: 'This password is not correct.'
          });
        }
        return done(null, user);
      });
    }
  ));

// Use the IntuitStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Intuit profile), and
//   invoke a callback with a user object.
passport.use(new IntuitStrategy({
    consumerKey: INTUIT_CONSUMER_KEY,
    consumerSecret: INTUIT_CONSUMER_SECRET,
    callbackURL: "http://127.0.0.1:3000/signup"
  },
  function(token, tokenSecret, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      
      // To keep the example simple, the user's Intuit profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Intuit account with a user record in your database,
      // and return that user instead.
      console.log(profile);
      return done(null, profile);
    });
  }
));
};