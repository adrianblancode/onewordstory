var mongoose = require('mongoose');
var userModel = require('../models/UserModel');
mongoose.connect('mongodb://localhost/oneword');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error when opening database'));
db.once('open', function callback () {
//Do nothing special here
});
var users = mongoose.model('Users', userModel);

module.exports.controller = function(app) {
  app.get('/settings', function(req, res) {
    if(req.session.user.colors) {
      res.locals.colors = req.session.user.colors;
      console.log('color 2: ' + req.session.user.colors);
    }
    else{
      res.redirect('/login');
    }
    res.render('settings', {
       title : 'settings - onewordstory'
      ,description : 'Account settings'
      ,author : 'adrianblp, cwinsnes, robineng'
    });
  });

//req.session.user är satt
//req.session.user.color
  app.post('/settings/color', function(req, res) {
    if(req.session.user && /[0-9A-F]{6}$/i.test(req.body.user.colors)){
      console.log('color: ' + req.body.user.colors)
      users.update(
        {name : req.session.user.username},
        {$set: {'color' : + req.body.user.colors}});
      req.session.user.colors = req.body.user.colors;
    }
    res.redirect('/settings');
  });
}
