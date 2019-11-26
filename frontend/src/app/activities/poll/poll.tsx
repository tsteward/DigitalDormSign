import { PollModel } from "../../../../../backend/src/api/models/poll-model";
import React, {Component, ReactElement} from "react";

export interface PollProps {
	poll: PollModel;
	onResponse: (index: number) => void;
}

export class Poll extends Component<PollProps> {
	render() {
		return (
			<div>
				<h2>{this.props.poll.question}</h2>
				{this.renderButtons()}
			</div>
		);
	}

	private renderButtons(): ReactElement[] {
		return this.props.poll.answers.map((answer: string, index: number) => (
			<input type="button" key={index} value={answer} onClick={() => this.props.onResponse(index)}/>
		));
	}
}
