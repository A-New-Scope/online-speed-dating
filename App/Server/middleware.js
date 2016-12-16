const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;

const findOrCreate = require('mongoose-findorcreate');
plugin(findOrCreate);

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
  // app.use('/dist', express.static(path.join(__dirname, '../../compiled/transpiled')));
/*  app.get('/dist/main.js', function(req, res) {
    console.log('called');
    res.sendFile(path.join(__dirname, '../../compiled/transpiled/main.js'));
  });*/
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(session(sessionOptions));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function(user, done) {
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
      User.findOrCreate({
        facebookId: profile.id,
      }, function(err, user) {
        if (err) { return done(err); }
        done(null, user);
      });
    }
  ));

  passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: '/auth/twitter/callback'
  },
    function(token, tokenSecret, profile, done) {
      User.findOrCreate({
        twitterId: profile.id
      }, function(err, user) {
        if (err) { return done(err); }
        done(null, user);
      });
    }
  ));
};

