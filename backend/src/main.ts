import io, {Socket} from 'socket.io';

const socket = io();

socket.on('connection', (con: Socket) => {
	console.log("New Connection");

	con.on('echo', (echoText) => {
		console.log("received test");
		con.emit('echo', echoText);
	});
});

console.log("Starting Socket Connection");
socket.listen(8080);
