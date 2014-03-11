//Set up dependencies
var express = require('express');
var http = require('http');
var io = require('socket.io');
var path = require('path');
var fs = require('fs');
var port = (process.env.PORT || 9001);
var app = express();

var mongoose = require('mongoose');
var userModel = require('./models/UserModel');
var storyModel = require('./models/StoryModel');
var wordModel = require('./models/WordModel');
mongoose.connect('mongodb://localhost/oneword');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error when opening database'));
db.once('open', function callback () {
  //Do nothing special here
});
var users = mongoose.model('Users', userModel);
var stories = mongoose.model('Stories', storyModel);
var words = mongoose.model('Words', wordModel);

//Set up env variables
app.set('port', port);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('Sex is not the secret'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, '/static')));

//set up controllers
fs.readdirSync('./controllers').forEach(function (file) {
  if(file.substr(-3) == '.js') {
    console.log('Controller : ' + file);
    route = require('./controllers/' + file);
    route.controller(app);
  }
});

checkAdminStory();

var server = http.createServer(app).listen(app.get('port'), function() {
  console.log("Server now created");
  console.log('Server listening on port ' + app.get('port'));
});


var io = io.listen(server);
io.sockets.on('connection', function(socket){
  console.log('Client connected');
  socket.on('message', function(data) {
    console.log(data);
    var socketurl = socket.handshake.url;
    console.log(socketurl);
    var storyid = socketurl.split('storyname=')[1].split('&')[0];
    var userid = socketurl.split('username=')[1].split('&')[0];
    var word = new words();
    word.userId = userid;
    word.storyId = storyid;
    word.data = data;
    word.save();
    socket.emit('server_' + storyname, data);
  });
  socket.on('disconnect', function() {
    console.log('Client disconnected');
  });
});


//Check if admin and mainstory exists
function checkAdminStory(){

  users.findOne({username : 'admin'},{username : true, color : true}, function(err,obj) {  
    if(!obj){
      console.log('hittade inte admin');
      admin = new users();
      admin.username = 'admin';
      admin.colors = '000000';
      admin.password = '9acf0019f44a50f53860460e27048f45a4640214';
      admin.salt = '1.dfc7dreo5g0hpvi';
      admin.save(function(err) {
        if(err) {
          console.log('Error when trying to create admin');
        }
      });
    } else {
      console.log('hittade admin');
      admin = obj;
    }
    stories.findOne({title: 'mainstory' , admin: admin}, function(err, obj) {
      if(!obj){
        console.log('skapar story');
        mainstory = new stories();
        mainstory.title = 'mainstory';
        mainstory.admin = admin;
        mainstory.save(function(err) {
          if(err){
            console.log('error when trying to create mainstory')
          }
        });
      }
    });

  });
}
