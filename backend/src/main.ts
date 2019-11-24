import io, {Socket} from 'socket.io';
import mongoose from 'mongoose';
import {TitleActivity} from "./activities/TitleActivity";

const socket = io();

mongoose.connect('mongodb://localhost:27017/digitaldormsign', {useNewUrlParser: true}, () => {
	console.log("Connected to Mongoose Database");
});

socket.on('connection', (con: Socket) => {
	console.log("New Connection");
});

// Create activities
new TitleActivity(socket.of('/title'));

console.log("Starting Socket Connection");
socket.listen(8080);
