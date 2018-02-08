whiteboard.on('draw',function(start,end,color){
	socket.emit('dibujo',start,end,color)
});
var socket = io(window.location.origin);
socket.on('connect', function () {
    console.log('Tengo hecho una conexión persistente bilateral al servidor!');
});
socket.on('dibujar',function(start,end,color){
	whiteboard.draw(start,end,color)
})