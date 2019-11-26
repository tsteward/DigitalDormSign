import React, {Component} from "react";
import io from "socket.io-client";
import {ConstraintType} from "../../../../backend/src/constraints/constraint";
import { PhraseModel } from "../../../../backend/src/api/models/phrase-model";
import {PhraseEditorElement} from "./phrase-editor-element";

export interface PhraseEditorListState {
	phrases: PhraseModel[];
}

export interface PhraseEditorListProps {

}

export class PhraseEditorList extends Component<PhraseEditorListProps, PhraseEditorListState> {
	state: PhraseEditorListState = {
		phrases: []
	};

	socket!: SocketIOClient.Socket;

	render() {
		return (
			<div>
				{
					this.state.phrases.map(phrase => (
							<div key={phrase.id}>
								<PhraseEditorElement initial={phrase} socket={this.socket}/>
							</div>
						)
					)},
				<input type="button" value="Add" onClick={() => this.onAddClicked()}/>
			</div>
		);
	}

	onAddClicked(): void {
		const newTitle: PhraseModel = {
			id: 'placeholder',
			constraint: {
				type: ConstraintType.None
			},
			text: ''
		};
		this.socket.emit('add', newTitle);
	}

	componentDidMount(): void {
		this.socket = io('http://localhost:8080/phrase');
		this.socket.on('list', (phrases: PhraseModel[]) => {
			this.setState({
				phrases: phrases
			});
		});

		this.socket.emit('list');
	}

	componentWillUnmount(): void {
		this.socket.close();
	}
}
