var mongoose    = require('mongoose');
var userModel = require('./models/UserModel');
mongoose.connect('mongodb://localhost/oneword');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  // kek
});

var users = mongoose.model('Users', userModel);
var newUser = new users();
newUser.username = "användarn";
newUser.color = "blå";
newUser.password = "password1";
newUser.salt = "saltarN";
newUser.save(function (err) {
  if(err){
    console.log("Error");
  }
});
users.find(function (err, us) {
  if (err) return console.error(err);
  console.log(us);
});