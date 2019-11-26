import React, {Component} from "react";
import io from "socket.io-client";
import {PollModel} from "../../../../backend/src/api/models/poll-model";
import {ConstraintType} from "../../../../backend/src/constraints/constraint";
import {PollEditorElement} from "./poll-editor-element";

export interface PollEditorListState {
	polls: PollModel[];
}

export interface PollEditorListProps {

}

export class PollEditorList extends Component<PollEditorListProps, PollEditorListState> {
	state: PollEditorListState = {
		polls: []
	};

	socket!: SocketIOClient.Socket;

	render() {
		return (
			<div>
				{
					this.state.polls.map(poll => (
						<div key={poll.id}>
							<PollEditorElement initial={poll} socket={this.socket}/>
						</div>
					))
				}
				<input type="button" value="Add" onClick={() => this.onAddClicked()}/>
			</div>
		);
	}

	private onAddClicked(): void {
		const newPoll: PollModel = {
			id: 'placeholder',
			question: '',
			answers: [],
			answerCounts: [],
			totalAnswers: 0,
			constraint: {
				type: ConstraintType.None
			}
		};
		this.socket.emit('add', newPoll);
	}

	componentDidMount(): void {
		this.socket = io('http://localhost:8080/poll');
		this.socket.on('list', (polls: PollModel[]) => {
			this.setState({
				polls: polls
			});
		});

		this.socket.emit('list');
	}
}
