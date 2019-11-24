import {ConstrainableSelector} from "../constraints/constrainable_selector";
import {Namespace, Socket} from "socket.io";
import Phrase, {IPhrase} from "../models/phrase";

export class PhraseActivity {
	private selector: ConstrainableSelector;

	constructor(private socket: Namespace) {
		this.selector = new ConstrainableSelector();
	}

	private initOnConnect(): void {
		this.socket.on('connection', client => {
			this.initOnUpdate(client);
			this.updatePhrase(client);
		});
	}

	private initOnUpdate(client: Socket): void {
		client.on('update', (client: Socket) => {
			this.updatePhrase(client);
		});
	}

	private updatePhrase(client: Socket) {
		// Return the first phrase
		Phrase.find((err, res) => {
			const newPhrase = this.selector.pick(res) as IPhrase;

			if (newPhrase) {
				client.emit('update', newPhrase.toApiModel());
			}
		});
	}
}
