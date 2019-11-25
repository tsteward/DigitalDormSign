import React, {Component} from "react";
import io from "socket.io-client";
import {TitleModel} from "../../../../backend/src/api/models/title-model";
import {TitleEditorElement} from "./title-editor-element";

export interface TitleEditorListState {
	titles: TitleModel[];
}

export interface TitleEditorListProps {

}

export class TitleEditorList extends Component<TitleEditorListProps, TitleEditorListState> {
	state: TitleEditorListState = {
		titles: []
	};

	socket!: SocketIOClient.Socket;

	render() {
		return (
			<div>
				{
					this.state.titles.map(title => (
						<div key={title.id}>
							<TitleEditorElement initial={title} socket={this.socket}/>
						</div>
					)
				)}
			</div>
		);
	}

	componentDidMount(): void {
		this.socket = io('http://localhost:8080/title');

		this.socket.on('connect', () => {
			this.socket.emit('list')
		});
		this.socket.on('list', (titles: TitleModel[]) => {
			this.setState({
				titles: titles
			});
		});
	}

	componentWillUnmount(): void {
		this.socket.close();
	}
}
