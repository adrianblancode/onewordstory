var mongoose = require('mongoose');
var userModel = require('../models/UserModel');
var storyModel = require('../models/StoryModel');
var logModel = require('../models/LogModel');
var wordModel = require('../models/WordModel');
mongoose.connect('mongodb://localhost/oneword');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error when opening database'));
db.once('open', function callback () {
//Do nothing special here
});
var users = mongoose.model('Users', userModel);
var stories = mongoose.model('Stories', storyModel);
var logs = mongoose.model('Logs', logModel);
var words = mongoose.model('Words', wordModel);

module.exports.controller = function (app) {
  /**
   * stats
   */
  app.get('/stats', function(req, res) {
    var loggedIn = false;
    if(req.session.user) {
      loggedIn = true;
    } 
    users.count(function (err, ucount){
      if(err){
        console.log('cant fetch number of users');
      }
      stories.count(function (err, scount){
        if(err){
          console.log('cant fetch number of stories');
        }
        words.find.distinct(function(err, distwcount){
          console.log('DISTW' + distwcount);
          if(err){
            console.log('cant count distinct words');
          }
          if(loggedIn){
            stories.find({admin : req.session.user._id}, function(err, ustories){
              if(err){
                console.log('cant find user stories')
              }
              logs.find({userId : req.session.user._id}, function(err, ulogs){
              if(err){
                console.log('cant find user logs')
              }
              res.render('stats', {
              title : 'onewordstory'
              ,description : 'The most epic story ever written'
              ,author : 'adrianblp, cwinsnes, robineng'
              ,ucount : ucount
              ,scount : scount
              ,ustories : ustories
              ,ulogs : ulogs
              });
            });
          });
        } else {
          res.render('stats', {
              title : 'onewordstory'
              ,description : 'The most epic story ever written'
              ,author : 'adrianblp, cwinsnes, robineng'
              ,ucount : ucount
              ,scount : scount
          });
        }
        });
      });
    });
  });

}
