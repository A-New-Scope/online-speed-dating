const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;

const userHandler = require('./handlers/userHandler.js');
const User = require('../Database/models/userModel.js');

const sessionOptions = { 
  secret: 'keyboard cat',
  saveUninitialized: true,
  resave: false
};

module.exports = function(app, express) { 
  app.use('/', express.static(path.join(__dirname, '../../dist')));
  console.log('__dirname is ', __dirname);
  console.log('serving static on ', path.join(__dirname, '../../dist'));

  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(session(sessionOptions));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function(user, done) {
    console.log('serializeUser is ', user);
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  }); 
  
  passport.use(new LocalStrategy(
    function(username, password, done) {
      userHandler.getUserDB(username, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          console.log('failed username');
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (password !== user.password) {
          console.log('failed password');
          return done(null, false, { message: 'Incorrect password.' });
        } 
        console.log('success');
        return done(null, user);
      }); 
    }
  ));

  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: '/auth/facebook/callback'
  },
    function(accessToken, refreshToken, profile, done) {
      console.log('profile is ', profile);
      User.findOne({
        'facebook.id': profile.id 
      },
      function(err, user) {
        if (err) {
          return done(err);
        }
        //No user was found... so create a new user with values from Facebook (all the profile. stuff)
        if (!user) {
          user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            username: profile.username,
            provider: 'facebook',
            //now in the future searching on User.findOne({'facebook.id': profile.id } will match because of this next line
            facebook: profile._json
          });
          user.save(function(err) {
            if (err) { 
              console.log(err);
            }
            return done(err, user);
          });
        } else {
          //found user. Return
          return done(err, user);
        }
      });
    }
  ));

  passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: '/auth/twitter/callback'
  },
    function(accessToken, tokenSecret, profile, done) {
      console.log('accessToken is ', accessToken);
      console.log('tokenSecret is ', tokenSecret);
      console.log('profile is ', profile);
      console.log('done is ', done);
      User.findOne({
        'twitterId': profile.id 
      },
      function(err, user) {
        if (err) {
          console.log('error is ', err);
          return done(err);
        }
        //No user was found... so create a new user with values from Twitter (all the profile. stuff)
        if (!user) {
          console.log('user does not exist... creating new user...');
          user = new User({
            name: profile.name,
            username: profile.username,
            provider: 'twitter',
            twitterId: profile.id,
            profileImg: profile._json.profile_img_url
          });
          user.save(function(err) {
            if (err) { 
              console.log(err);
            }
            return done(err, user);
          });
        } else {
          //found user. Return
          console.log('user found. user is ', user);
          return done(err, user);
        }
      });
    }
  ));
};

