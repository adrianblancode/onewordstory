var mongoose = require('mongoose');
var userModel = require('../models/UserModel');
mongoose.connect('mongodb://localhost/oneword');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error when opening database'));
db.once('open', function callback () {
//Do nothing special here
});
var users = mongoose.model('Users', userModel);

function hashgen(password, salt) {
  var crypto = require('crypto');
  var shasum = crypto.createHash('sha1');
  shasum.update(password + salt);
  return(shasum.digest('hex'));
}

module.exports.controller = function(app) {
  /**
   * User wants to log in or register
   */
  app.get('/login', function(req, res) {
    res.render('login', {
       title : 'login - onewordstory'
      ,description : 'Log in to your story account'
      ,author : 'adrianblp, cwinsnes, robinng'
    });
  });

  /**
   * User wants to log in with an account
   */
  app.post('/login/login', function(req, res) {
    console.log(req.body.user.username + ' wants to log in');
    users.findOne({username : req.body.user.username}, function(err, us) {
      if(err) { 
        console.log('Error when trying to find users in database');
      }
      //Find users with same username
      if(us) {
        if(hashgen(req.body.user.password, us.salt) === us.password) {
          console.log(req.body.user.username + ' logged in');
          req.session.username = req.body.user.username;
          console.log(req.session.username);
          res.redirect('/');
        }
      } else {
        console.log('Can not find user ' + req.body.user.username);
      }
    });
  });

  /**
   * User wants to register an account
   */
  app.post('/login/register', function(req, res) {
    console.log(req.body.user.username + ' wants to be registred');
    users.findOne({username : req.body.user.username}, function(err, us) {
      if(err) { 
        console.log('Error when trying to find users in database'); 
      }

      //Check if username already exists
      if(us) {
        console.log(req.body.user.username + ' already exists');
        return us;
      } else {
        console.log('Creating user ' + req.body.user.username);
        var salt  = (Math.random()+1).toString(36);
        var hash = hashgen(req.body.user.password, salt);
        var color = '000000';

        var newUser = new users();
        newUser.username = req.body.user.username;
        newUser.color = color;
        newUser.password = hash;
        newUser.salt = salt;
        newUser.save(function(err) {
          if(err) {
            console.log('Error when trying to save user');
          }
        });
        req.session.username = req.body.user.username;
        res.redirect('/');
      }

    });
  });


  app.get('/logout', function(req, res) {
    if(req.session.username) {
      console.log(req.session.username + ' wants to log out');
      delete req.session.username;
      res.redirect('/');
    } else {
      res.send('Nothing to log out from?\nYou should probably leave');
    }
  });
}
