var socketio = require('socket.io');
var path = require('path');
var express = require('express');
var app = express(); 
const {Tablero,db}= require('./models')


db
.sync({force:false})

.then(()=>{
		var server = app.listen(1337, function () {
		    console.log('The server is listening on port 1337!');
		});
		var io = socketio(server);
		io.on('connection', function (socket) {
			Tablero.findAll()
			.then((coordenadas)=>{
				let offset=0;
				coordenadas.forEach(function(coor){
					setTimeout(()=>{
						start=JSON.parse(coor.start)
						end=JSON.parse(coor.end)
						socket.emit('dibujar',start,end,coor.color)
						},20 + offset)
					offset+=20;
				})
			})
		    console.log('Un nuevo cliente se ha conectado!');
		    console.log(socket.id);
			socket.on('disconnect', function () {
			    console.log('Un nuevo cliente se ha desconectado!');
			    console.log(socket.id);
			});
			socket.on('dibujo',function(start,end,color){
			var startedString=JSON.stringify(start)
			var endString=JSON.stringify(end)
			if(!color){
				color='black'
			}
				Tablero.create({
					start:startedString,
					end:endString,
					color,
				})
				socket.broadcast.emit('dibujar',start,end,color)
			})
		});
	})

app.use(express.static(path.join(__dirname, 'browser')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});
