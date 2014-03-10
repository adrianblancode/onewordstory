var mongoose = require('mongoose');
var userModel = require('../models/UserModel');
mongoose.connect('mongodb://localhost/oneword');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error when opening database'));
db.once('open', function callback () {
//Do nothing special here
});
var users = mongoose.model('Users', userModel);

module.exports.controller = function (app) {
  /**
   * index
   */
  app.get('/', function(req, res) {
    if(req.session.user) {
      res.locals.loggedin = true;
    } else {
      res.locals.loggedin = false;
    }
    res.locals.storyname = 'mainstory';
    res.render('index', {
       title : 'onewordstory'
      ,description : 'The most epic story ever written'
      ,author : 'adrianblp, cwinsnes, robineng'
    });
  });

  app.get('/500', function(req, res) {
    res.render('500');
    throw new Error('500 error');
  });
}
