var app = require('express').createServer(),
	io = require('socket.io').listen(app),
	nicknames = [];

	app.listen(3000,function(){console.log('app running in 127.0.0.1:3000 ')});

	app.get('/',function(req,res){
		res.sendfile("C:/Users/89486/Desktop/socketio/index.html");
	})
	io.sockets.on('connection',function(socket){
	socket.on('nickname',function(data,callback){
		if(nicknames.indexOf(data)!=-1){
			callback(false);
		}
		else{
			callback(true);
			nicknames.push(data);
			socket.nickname = data;
			console.log('nickname are '+data);
			io.sockets.emit('nicknames',nicknames);
		}
	})

		socket.on('user message',function(data){
		io.sockets.emit('user message',{nick:sock.nickname,message:data});
	});

		socket.on('disconnect',function(){
		if(!sock.nickname) return ;		//判断nickname是否存在,不然会报错
		if(nicknames.indexOf(socket.nickname)>-1){
			console.log('Nicknames are '+nicknames);
			io.sockets.emit('nicknames',nicknames);
		}
	})
})
