import {Namespace, Socket} from "socket.io";
import Title, {ITitle} from '../models/title';
import {ConstrainableSelector} from "../constraints/constrainable_selector";

export class TitleActivity {
	private selector: ConstrainableSelector;

	constructor(private socket: Namespace) {
		this.selector = new ConstrainableSelector();

		this.initOnConnect();
	}

	private initOnConnect() {
		this.socket.on('connection', client => {
			this.initOnUpdate(client);
			this.sendUpdate(client);
		});
	}

	private initOnUpdate(client: Socket): void {
		client.on('update', this.sendUpdate);
	}

	private initOnList(client: Socket): void {
		client.on('list', this.sendList);
	}

	private sendUpdate(client: Socket) {
		// Return the first title
		Title.find((err, res) => {
			const newTitle = this.selector.pick(res) as ITitle;

			if (newTitle) {
				client.emit('update', newTitle.toApiModel());
			}
		});
	}

	private sendList(client: Socket) {
		Title.find((err, res) => {
			if (res) {
				client.emit('list', res.map(title => title.toApiModel()));
			}
		});
	}
}
