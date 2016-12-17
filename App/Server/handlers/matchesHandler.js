const db = require('../../Database/config.js');
const User = require('../../Database/models/userModel.js');

exports.getMatches = function (sessionUser, res) {
  User.findOne({username: sessionUser})
  // check for mutual likes
  .then(function (data) {
    let likedUsersToUpload = [];
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
    .then(function () {
      User.findOneAndUpdate({
        username: sessionUser
      }, {$set: {matches: likedUsersToUpload}});
    });
  });

  //compare likes across users
  //update current user's 'matches' property
  //
  // find if the likes are mutual

  //User.findOne({username: user name yo}).then(function(data){
  //   data.likes.forEach(function(item){
  //     User.find({username: item}).then(function(itemdata){
  //       if (itemData.likes.indexOf(username) !== -1) {
  //         User.findOneAndUpdate({username: username}, {push: {itemData.name})
  //         // or store to an array
  //       }
  //     })
  //   })
  // })

  //alternatively, store all matched names in an array, then call findoneandupdate with a push/each of that array
  res.end();
};

exports.updateMatches = function (req, res) {

  res.end();
};