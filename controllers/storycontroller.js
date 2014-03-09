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
  app.get('/:id([0-9]+)', function(req, res) {
    var id = req.params.id;
    stories.findOne({_id : id}, function(err, ans) {
      //Make code that show the story and stuffz
    });
  });
}
