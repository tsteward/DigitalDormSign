import {ConstrainableSelector} from "../constraints/constrainable_selector";
import {Namespace, Socket} from "socket.io";
import Poll from "../models/poll";
import {IPoll} from "../models/poll";
import {PollModel} from "../api/models/poll-model";

export class PollActivity {
	private selector: ConstrainableSelector;

	constructor(private socket: Namespace) {
		this.selector = new ConstrainableSelector();

		this.initOnConnect();
	}

	private initOnConnect(): void {
		this.socket.on('connection', client => {
			client.on('refresh', () => this.sendPoll(client));
			client.on('add', (newPoll: PollModel) => this.add(client, newPoll));
			client.on('list', () => this.sendList(client));
			client.on('delete', (id: string) => this.delete(client, id));
			client.on('update', (updatedPoll: PollModel) => this.update(updatedPoll));
		});
	}

	private add(client: Socket, newPollData: PollModel) {
		const newPoll: IPoll = new Poll({
			question: newPollData.question,
			answers: newPollData.answers,
			answerCounts: newPollData.answerCounts,
			totalAnswers: newPollData.totalAnswers,
			constraint: newPollData.constraint
		});

		newPoll.save().then(() => this.sendList(client));
	}

	private delete(client: Socket, id: string) {
		Poll.findByIdAndDelete(id).then(() => this.sendList(client));
	}

	private update(updatedPoll: PollModel) {
		Poll.findById(updatedPoll.id, (err, res) => {
			if (res) {
				res.updateFromModel(updatedPoll);
			}
		});
	}

	private sendPoll(client: Socket): void {
		Poll.find((err, res) => {
			const toSend = this.selector.pick(res);
			if (toSend) {
				client.emit('new', (toSend as IPoll).toApiModel());
			}
		});
	}

	private sendList(client: Socket) {
		Poll.find((err, res) => {
			if (res) {
				client.emit('list', res.map(poll => poll.toApiModel()));
			}
		});
	}
}
