var mongoose = require('mongoose');

mongoURI = 'mongodb://localhost/speeddatingdb';
mongoose.connect(mongoURI);

var db = mongoose.connection; 

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Mongodb connection open');
}); 