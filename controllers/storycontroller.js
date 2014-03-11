var url = require('url');
var mongoose = require('mongoose');
var StoryModel = require('../models/StoryModel');
mongoose.connect('mongodb://localhost/oneword');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error when connecting to the database'));
db.once('open', function callback () {
});

var stories = mongoose.model('Stories', StoryModel);
module.exports.controller = function(app) {
  /**
   * Get story with the id 'id'
   */
  app.get('/:name([a-zA-Z]+)', function(req, res) {
    res.locals.storyname = req.params.name;
    stories.findOne({storyname : req.params.name}, function(err, ans) {
      if(err) { throw new Error('Could not find story' + req.params.name); }

    });
  });


  app.get('/createstory', function(req, res) {
    var storyArray = new Array();
    if(!req.session.user){
      res.redirect('/login');
    }else{
      stories.find(function (err, sto){
        if(err){
          console.log("can't fetch stories")
        }else{
          console.log('STORIES: ' + sto);
          res.render('createstory', {
            title : 'onewordstory'
            ,description : 'The most epic story ever written'
            ,author : 'adrianblp, cwinsnes, robineng'
            ,storyarray : sto
          });
        }
      });
    }
    var result = stories.find().sort({storyid:-1}).limit(1);
  });

  app.post('/createstory/create', function(req, res) {  
    if(!req.session.user){
      res.redirect('/login');
    }
    if(!req.body.story.title){
      res.send('No story title chosen');
    }
    var story = new stories();
    story.title = req.body.story.title;
    console.log(req.body.story.title);
    story.admin = req.session.user._id;
    story.save(function (err){
      if(err){
        console.log('could not create story');
      }else{
        console.log('created story title: ' + story.title + ' for user: ' + req.session.user.username);
      }
    });
    res.redirect('/');
  });
}
