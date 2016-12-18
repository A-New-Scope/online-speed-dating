const db = require('../../Database/config.js');
const User = require('../../Database/models/userModel.js');

exports.getMatches = function (req, res) {
  let likedUsersToUpload = [];
  User.findOne({username: req.body.sessionUser})
  .then(function (data) { //check for mutual likes
    data.likes.forEach(function (likedUser) {
      console.log('checking', likedUser);
      User.findOne({username: likedUser})
      .then(function (userRecord) {
        if (userRecord.likes.indexOf(req.body.sessionUser) !== -1) {
          console.log('new match!');
          // add likedUser to matches array of sessionUser
          if(likedUsersToUpload.indexOf(likedUser) === -1){ //prevent duplicates
            likedUsersToUpload.push(likedUser);
            console.log("array updated", likedUsersToUpload);
          };
          // to handle adding sessionUser to matches array of likedUser,
          // this function will run across all users
        };
        if(likedUser === data.likes[data.likes.length-1]){ //if at end of list, send response
            console.log("sending array", likedUsersToUpload);
            res.send(likedUsersToUpload);
        };
      });
    });
  });
};

exports.updateLikes = function (req, res) {
  console.log("updating likes with", req.body);
  User.findOneAndUpdate({username: req.body.sessionUser}, {$push: {likes: req.body.likedUser}}).then(function(data) {
    res.end();
  });
};