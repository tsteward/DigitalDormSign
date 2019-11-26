import {Namespace, Socket} from "socket.io";
import Title, {ITitle} from '../models/title';
import {ConstrainableSelector} from "../constraints/constrainable_selector";
import {TitleModel} from "../api/models/title-model";

export class TitleActivity {
	private selector: ConstrainableSelector;

	constructor(private socket: Namespace) {
		this.selector = new ConstrainableSelector();

		this.initOnConnect();
	}

	private initOnConnect() {
		this.socket.on('connection', client => {
			client.on('refresh', () => this.sendRefresh(client));
			client.on('list', () => this.sendList(client));
			client.on('update', this.update);
			client.on('add', (newTitle: TitleModel) => this.add(client, newTitle));
			client.on('delete', (id: string) => this.delete(client, id));
		});
	}

	private update(updatedTitle: TitleModel) {
		Title.findById(updatedTitle.id, (err, res) => {
			if (res) {
				res.updateFromModel(updatedTitle);
			}
		});
	}

	private add(client: Socket, newTitleData: TitleModel) {
		const newTitle: ITitle = new Title({
			text: newTitleData.text,
			constraint: newTitleData.constraint
		});

		newTitle.save().then(() => this.sendList(client));
	}

	private delete(client: Socket, id: string) {
		Title.findByIdAndDelete(id).then(() => this.sendList(client));
	}

	private sendRefresh(client: Socket) {
		Title.find((err, res) => {
			const newTitle = this.selector.pick(res) as ITitle;

			if (newTitle) {
				client.emit('refresh', newTitle.toApiModel());
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
