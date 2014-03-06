/* Author: YOUR NAME HERE
*/

$(document).ready(function() {   

  var socket = io.connect();

  $('#sender').bind('click', function() {
   socket.emit('message', document.getElementById('message').value);     
  });

  socket.on('server_message', function(data){
    var content = document.createTextNode(data + ' ');
    document.getElementById('reciever').appendChild(content);
  });
});
