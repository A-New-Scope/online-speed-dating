const router = require('express').Router();
const userHandler = require('../handlers/userHandler.js');
const passport = require('passport');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.status(200).json(req.user);
});

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
router.get('/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get('/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/#/events',
    failureRedirect: '/'
  })
);

// Redirect the user to Twitter for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/twitter/callback
router.get('/twitter', passport.authenticate('twitter'));

router.get('/twitter/callback',
function(req, res, next) {
  console.log('alkjsd;f');
  next();
}, 
  passport.authenticate('twitter', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log('success');
    res.redirect('/#/events');
  });

router.post('/authorize', ensureLoggedIn({ redirectTo: '/error', setReturnTo: false }), function(req, res) {
  console.log('user was authorized');
  res.send(req.user);
});

router.get('/logout', function(req, res) {
  req.logout();
  res.status(200).send('logged out');
});

module.exports = router;