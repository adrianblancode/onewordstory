//$(document).ready(function() {   

  /*var socket = io.connect();

  $('#sender').bind('click', function() {
   socket.emit('message', document.getElementById('message').value);     
  });

  socket.on('server_message', function(data){
    var content = document.createTextNode(data + ' ');
    document.getElementById('message').value = '';
    document.getElementById('reciever').appendChild(content);
  });
});*/

function changeColor(c, input){
  input.value = input.value.toUpperCase();

  if(/[0-9A-F]{6}$/i.test(c)){
      document.getElementById('color').style.background = '#' + c;
  }
}

function initColor(c){
  document.getElementById('color').style.background = c;
  document.getElementById('colorinput').value = document.getElementById('colorinput').value.toUpperCase().replace("#", "");
}
//});
