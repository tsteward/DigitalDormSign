import {ConstrainableSelector} from "../constraints/constrainable_selector";
import {Namespace, Socket} from "socket.io";
import Phrase, {IPhrase} from "../models/phrase";
import {PhraseModel} from "../api/models/phrase-model";

export class PhraseActivity {
	private selector: ConstrainableSelector;

	constructor(private socket: Namespace) {
		this.selector = new ConstrainableSelector();

		this.initOnConnect();
	}

	private initOnConnect(): void {
		this.socket.on('connection', client => {
			client.on('refresh', () => this.sendRefresh(client));
			client.on('list', () => this.sendList(client));
			client.on('update', this.update);
			client.on('add', (newPhrase: PhraseModel) => this.add(client, newPhrase));
		});
	}

	private update(updatedPhrase: PhraseModel) {
		Phrase.findById(updatedPhrase.id, (err, res) => {
			if (res) {
				res.updateFromModel(updatedPhrase);
			}
		});
	}

	private add(client: Socket, newPhraseData: PhraseModel) {
		const newPhrase: IPhrase = new Phrase({
			text: newPhraseData.text,
			constraint: newPhraseData.constraint
		});
		console.log(newPhraseData);
		newPhrase.save().then(() => this.sendList(client)).catch(reason => console.log(console.log('test ' + reason)));
	}

	private sendRefresh(client: Socket) {
		Phrase.find((err, res) => {
			const newPhrase = this.selector.pick(res) as IPhrase;

			if (newPhrase) {
				client.emit('refresh', newPhrase.toApiModel());
			}
		});
	}

	private sendList(client: Socket) {
		Phrase.find((err, res) => {
			if (res) {
				client.emit('list', res.map(phrase => phrase.toApiModel()));
			}
		});
	}
}
