import { PollModel } from "../../../../backend/src/api/models/poll-model";
import React, {Component, ReactElement} from "react";
import { ConstraintEditor } from "../constraint/constraint-editor";
import { ConstraintModel } from "../../../../backend/src/api/models/constraint-model";
import {debounce} from "debounce";
import _ from "lodash";

export interface PollEditorElementProps {
	initial: PollModel;
	socket: SocketIOClient.Socket;
}

export interface PollEditorElementState {
	curQuestion: string,
	curAnswers: string[],
	curConstraint: ConstraintModel
}

export class PollEditorElement extends Component<PollEditorElementProps, PollEditorElementState> {
	constructor(props: PollEditorElementProps) {
		super(props);

		this.state = {
			curQuestion: props.initial.question,
			curAnswers: props.initial.answers,
			curConstraint: props.initial.constraint
		}
	}

	render() {
		return (
			<div>
				<input type="text" value={this.state.curQuestion} onChange={e => this.onQuestionUpdate(e)}/>
				<input type="button" value="Delete Poll" onClick={() => this.onDeletePoll()}/>
				{this.renderAnswers()}
				<div>
					<input type="button" value="Add Answer" onClick={() => this.onAddAnswer()}/>
				</div>
				<ConstraintEditor
					constraint={this.state.curConstraint}
					onUpdate={(newConstraint: ConstraintModel) => this.onConstraintUpdate(newConstraint)}/>
			</div>
		);
	}

	private renderAnswers(): ReactElement[] {
		return this.state.curAnswers.map((answer: string, index: number) => (
			<div key={index}>
				<input type="text" value={answer} onChange={e => this.onAnswerUpdate(index, e)}/>
				<input type="button" value="Delete Answer" onClick={() => this.onDeleteAnswer(index)}/>
			</div>
		));
	}

	private onQuestionUpdate(e: any): void {
		this.setState({
			curQuestion: e.target.value
		});
		this.sendUpdate();
	}

	private onAnswerUpdate(index: number, e: any) {
		let newAnswers: string[] = _.cloneDeep(this.state.curAnswers);
		newAnswers[index] = e.target.value;
		this.setState({
			curAnswers: newAnswers
		});
		this.sendUpdate();
	}

	private onAddAnswer(): void {
		let newAnswers: string[] = _.cloneDeep(this.state.curAnswers);
		newAnswers.push('');
		this.setState({
			curAnswers: newAnswers
		});
		this.sendUpdate();
	}

	private onDeletePoll(): void {
		this.props.socket.emit('delete', this.props.initial.id);
	}

	private onDeleteAnswer(index: number): void {
		let newAnswers: string[] = _.cloneDeep(this.state.curAnswers);
		newAnswers.splice(index, 1);
		this.setState({
			curAnswers: newAnswers
		});
		this.sendUpdate();
	}

	private onConstraintUpdate(newConstraint: ConstraintModel): void {
		this.setState({
			curConstraint: newConstraint
		});
		this.sendUpdate();
	}

	sendUpdate: Function = debounce(() => {
		const update: PollModel = {
			id: this.props.initial.id,
			question: this.state.curQuestion,
			answers: this.state.curAnswers,
			answerCounts: this.props.initial.answerCounts,
			totalAnswers: this.props.initial.totalAnswers,
			constraint: this.state.curConstraint,
		};

		this.props.socket.emit('update', update);
	}, 500);
}
