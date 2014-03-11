var url = require('url');
var mongoose = require('mongoose');
var StoryModel = require('../models/StoryModel');
var wordModel = require('../models/WordModel');
mongoose.connect('mongodb://localhost/oneword');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error when connecting to the database'));
db.once('open', function callback () {
});

var stories = mongoose.model('Stories', StoryModel);
var words = mongoose.model('Words', wordModel);
module.exports.controller = function(app) {

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
    story.title = escape(req.body.story.title);
    console.log(req.body.story.title);
    story.admin = req.session.user._id;
    story.save(function (err){
      if(err){
        console.log('could not create story');
      }else{
        console.log('created story title: ' + story.title + ' for user: ' + req.session.user.username);
      }
    });
    res.redirect('/story/'+story.title);
  });
  /**
   * Get story with the id 'id'
   */
  app.get('/story/:name([a-zA-Z]+)', function(req, res) {
    if(req.session.user) {
      res.locals.username = req.session.user._id; //Yeah, it's named wrong... Working on it
      res.locals.loggedin = true;
      res.locals.colors = req.session.user.colors;
    }
    stories.findOne({title : req.params.name}, function(err, ans) {
      if(ans) {
        var storyid = ans._id;
        res.locals.storyid = storyid;
        words.find({storyId : ans._id}, function(err, wordSet) {
          if(err) { 
            console.log('Something happened when fetching word set');
            throw new Error('Word set could not be found');
          }
          res.locals.wordSet = wordSet;
          res.render('index', {
            title : ans.title + '-onewordstory',
            description : 'A story made by a community',
            author : 'cwinsnes, adrianblp, robineng'
          });
        });
      } else {
        res.send('That story doesn\'t exist');
      }
    });
  });


}
