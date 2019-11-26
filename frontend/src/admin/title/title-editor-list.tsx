import React, {Component} from "react";
import io from "socket.io-client";
import {TitleModel} from "../../../../backend/src/api/models/title-model";
import {TitleEditorElement} from "./title-editor-element";
import {ConstraintType} from "../../../../backend/src/constraints/constraint";

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
				)},
				<input type="button" value="Add" onClick={() => this.onAddClicked()}/>
			</div>
		);
	}

	onAddClicked(): void {
		const newTitle: TitleModel = {
			id: 'placeholder',
			constraint: {
				type: ConstraintType.None
			},
			text: ''
		};
		this.socket.emit('add', newTitle);
	}

	componentDidMount(): void {
		this.socket = io('http://localhost:8080/title');
		this.socket.on('list', (titles: TitleModel[]) => {
			this.setState({
				titles: titles
			});
		});

		this.socket.emit('list');
	}

	componentWillUnmount(): void {
		this.socket.close();
	}
}
