import {Component} from "react";
import * as React from "react";
import io from 'socket.io-client';
import { PollModel } from "../../../../../backend/src/api/models/poll-model";
import {Poll} from "./poll";
import _ from "lodash";

export interface PollActivityState {
	curPoll: PollModel | null;
}

export interface PollActivityProps {

}

export class PollActivity extends Component<PollActivityProps, PollActivityState> {
	state: PollActivityState = {
		curPoll: null
	};

	private socket!: SocketIOClient.Socket;

	render() {
		return (
			<div>
				{(this.state.curPoll) ?
					<Poll poll={this.state.curPoll} onResponse={index => this.onResponse(index)}/> :
					<p>Loading a Poll...</p>}
			</div>
		)
	}

	private onResponse(index: number): void {
		if (this.state.curPoll) {
			let newCurPoll: PollModel = _.cloneDeep(this.state.curPoll);
			newCurPoll.answerCounts[index]++;
			this.setState({
				curPoll: newCurPoll
			});

			this.socket.emit('update', newCurPoll);
		}
	}

	componentDidMount(): void {
		this.socket = io('http://localhost:8080/poll');
		this.socket.on('new', (newPoll: PollModel) => {
			this.setState({
				curPoll: newPoll
			});
		});

		this.socket.emit('refresh');
	}

	componentWillUnmount(): void {
		this.socket.close();
	}
}
