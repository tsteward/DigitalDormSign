import io, {Socket} from 'socket.io';
import mongoose from 'mongoose';
import {TitleActivity} from "./activities/title_activity";
import {PhraseActivity} from "./activities/phrase_activity";
import Title, {ITitle, TitleSchema} from "./models/title";
import {BeforeHourRule, TimeConstraint} from "./constraints/time_constraint";

const socket = io();

mongoose.connect('mongodb://localhost:27017/digitaldormsign', {useNewUrlParser: true}, () => {
	console.log("Connected to Mongoose Database");

	new Title({
		text: 'testing2',
		constraint: new TimeConstraint(new BeforeHourRule(23, true))
	}).save();
});

socket.on('connection', (con: Socket) => {
	console.log("New Connection");
});

// Create activities
new TitleActivity(socket.of('/title'));
new PhraseActivity(socket.of('/phrase'));

console.log("Starting Socket Connection");
socket.listen(8080);
