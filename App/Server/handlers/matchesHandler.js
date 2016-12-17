const db = require('../../Database/config.js');
const User = require('../../Database/models/userModel.js');

exports.getMatches = function (req, res) {
  let likedUsersToUpload = [];

  User.findOne({username: req.body.sessionUser})
  // check for mutual likes
    .then(function (data) {
      data.likes.forEach(function (likedUser) {
        User.findOne({username: likedUser})
        .then(function (userRecord) {
          if (userRecord.likes.indexOf(sessionUser) !== -1) {
            // add likedUser to matches array of sessionUser
            likedUsersToUpload.push(likedUser);
            // to handle adding sessionUser to matches array of likedUser,
            // this function will run across all users
          }
        });
      })
    // .then(function () {
    //   User.findOneAndUpdate({
    //     username: req.body.sessionUser
    //   }, {$set: {matches: likedUsersToUpload}});
    // });
  });

  res.send(likedUsersToUpload);
};

exports.updateLikes = function (req, res) {
  User.findOneAndUpdate({username: req.body.sessionUser}, {push: {likes: req.body.likedUser}})
  res.end();
};