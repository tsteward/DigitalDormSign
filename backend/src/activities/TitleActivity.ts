import {Namespace, Socket} from "socket.io";
import Title from '../models/title';

export class TitleActivity {
	constructor(private socket: Namespace) {
		this.initOnConnect();
	}

	private initOnConnect() {
		this.socket.on('connection', client => {
			TitleActivity.initOnUpdate(client);
			TitleActivity.updateTitle(client);
		});
	}

	private static initOnUpdate(client: Socket): void {
		client.on('update', (client: Socket) => {
			this.updateTitle(client);
		});
	}

	private static updateTitle(client: Socket) {
		// Return the first title
		Title.findOne({}, (err, res) => {
			if (res) {
				client.emit('update', res);
			}
		});
	}
}
