/* Author: YOUR NAME HERE
*/

$(document).ready(function() {   

  var socket = io.connect();

  $('#sender').bind('click', function() {
   socket.emit('message', document.getElementById('message').value);     
  });

  socket.on('server_message', function(data){
    var content = document.createTextNode(data + ' ');
    document.getElementById('message').value = '';
    document.getElementById('reciever').appendChild(content);
  });
});

function changeColor(color){
    if(/^#[0-9A-F]{6}$/i.test(color)){
        document.getElementById('color').style.background = color;
    }
}