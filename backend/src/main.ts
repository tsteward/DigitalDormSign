import io, {Socket} from 'socket.io';

const socket = io();

socket.on('test', (con: Socket) => {
	con.emit('test', 'testing123');
});
