//setup Dependencies
var connect = require('connect')
    , express = require('express')
    , io = require('socket.io')
    , port = (process.env.PORT || 9001);

//Setup Express
var server = module.exports = express.createServer();
server.configure(function(){
    server.set('views', __dirname + '/views');
    server.set('view options', { layout: false });
    server.use(connect.bodyParser());
    server.use(express.cookieParser());
    server.use(express.session({ secret: "shhhhhhhhh!"}));
    server.use(connect.static(__dirname + '/static'));
    server.use(server.router);
});

//setup the errors
server.error(function(err, req, res, next){
    if (err instanceof NotFound) {
        res.render('404.jade', { locals: { 
                  title : '404 - Not Found'
                 ,description: ''
                 ,author: ''
                 ,analyticssiteid: 'XXXXXXX' 
                },status: 404 });
    } else {
        res.render('500.jade', { locals: { 
                  title : 'The Server Encountered an Error'
                 ,description: ''
                 ,author: ''
                 ,analyticssiteid: 'XXXXXXX'
                 ,error: err 
                },status: 500 });
    }
});
server.listen( port);

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

//Setup Socket.IO
var io = io.listen(server);
io.sockets.on('connection', function(socket){
  console.log('Client Connected');
  socket.on('message', function(data){
    socket.broadcast.emit('server_message',data);
    socket.emit('server_message',data);
  });
  socket.on('disconnect', function(){
    console.log('Client Disconnected.');
  });
});


///////////////////////////////////////////
//              Routes                   //
///////////////////////////////////////////

/////// ADD ALL YOUR ROUTES HERE  /////////

server.get('/', function(req,res){
  res.render('index.jade', {
    locals : { 
              title : 'onewordstory'
             ,description: 'The most epic story of them all has just begun.'
             ,author: 'adrianblp, robineng, cwinsnes'
             ,analyticssiteid: 'XXXXXXX' 
            }
  });
});

server.get('/login', function(req,res){
  res.render('login.jade', {
    locals : { 
              title : 'onewordstory'
             ,description: 'The most epic story of them all has just begun.'
             ,author: 'adrianblp, robineng, cwinsnes'
             ,analyticssiteid: 'XXXXXXX' 
            }
  });
});

server.get('/settings', function(req,res){
  res.render('settings.jade', {
    locals : { 
              title : 'onewordstory'
             ,description: 'The most epic story of them all has just begun.'
             ,author: 'adrianblp, robineng, cwinsnes'
             ,analyticssiteid: 'XXXXXXX' 
            }
  });
});


//A Route for Creating a 500 Error (Useful to keep around)
server.get('/500', function(req, res){
    throw new Error('This is a 500 Error');
});

//The 404 Route (ALWAYS Keep this as the last route)
server.get('/*', function(req, res){
    throw new NotFound;
});

function NotFound(msg){
    this.name = 'NotFound';
    Error.call(this, msg);
    Error.captureStackTrace(this, arguments.callee);
}


console.log('Listening on http://0.0.0.0:' + port );
