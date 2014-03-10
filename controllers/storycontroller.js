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
    var id = req.params.id;
    stories.findOne({storyid : id}, function(err, ans) {
      //Make code that show the story and stuffz
    });
  });

  app.get('/createstory', function(req, res) {
    var result = stories.find().sort({storyid:-1}).limit(1);
  });
}
