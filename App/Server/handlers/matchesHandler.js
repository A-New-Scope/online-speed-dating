const db = require('../../Database/config.js');
const User = require('../../Database/models/userModel.js');

exports.getMatches = function (req, res) {
  let likedUsersToUpload = [];
  User.findOne({username: req.body.sessionUser})
      //check for mutual likes
    .then(function (data) {
      data.likes.forEach(function (likedUser) {
        console.log('checking', likedUser)
        User.findOne({username: likedUser})
        .then(function (userRecord) {
          console.log('user record', userRecord.likes)
          if (userRecord.likes.indexOf(req.body.sessionUser) !== -1) {
            console.log('new match!')
            // add likedUser to matches array of sessionUser
            likedUsersToUpload.push(likedUser);
            console.log("array updated", likedUsersToUpload)
            // to handle adding sessionUser to matches array of likedUser,
            // this function will run across all users
          }
        });
      })
  })

  setTimeout(function(){
    res.send(likedUsersToUpload)
  }, 5000)
};

exports.updateLikes = function (req, res) {
  console.log("updating likes with", req.body)
  // User.findOneAndUpdate({username: }, {$push: {likes: 'test'}}).then(function(){
  //   res.end()
  // })

  res.end()

};