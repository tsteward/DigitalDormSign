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
			this.updateTitle(client);
		});
	}

	private initOnUpdate(client: Socket): void {
		client.on('update', (client: Socket) => {
			this.updateTitle(client);
		});
	}

	private updateTitle(client: Socket) {
		// Return the first title
		Title.find((err, res) => {
			const newTitle = this.selector.pick(res) as ITitle;

			if (newTitle) {
				client.emit('update', newTitle.toApiModel());
			}
		});
	}
}
