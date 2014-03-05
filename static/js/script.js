/* Author: YOUR NAME HERE
*/

$(document).ready(function() {   

  var socket = io.connect();

  $('#sender').bind('click', function() {
   socket.emit('message', document.getElementById('message').value);     
  });

  socket.on('server_message', function(data){
   $('#receiver').append('<li>' + data + '</li>');  
  });
});
