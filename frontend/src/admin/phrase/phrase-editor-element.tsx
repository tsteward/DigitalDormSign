import React, {Component} from "react";
import {debounce} from "debounce";
import {ConstraintEditor} from "../constraint/constraint-editor";
import { ConstraintModel } from "../../../../backend/src/api/models/constraint-model";
import { PhraseModel } from "../../../../backend/src/api/models/phrase-model";

export interface PhraseEditorElementProps {
	initial: PhraseModel;
	socket: SocketIOClient.Socket;
}

interface PhraseEditorElementState {
	curText: string;
	curConstraint: ConstraintModel;
}

export class PhraseEditorElement extends Component<PhraseEditorElementProps, PhraseEditorElementState> {
	constructor(props: PhraseEditorElementProps) {
		super(props);

		this.state = {
			curText: this.props.initial.text,
			curConstraint: this.props.initial.constraint
		};
	}

	render() {
		return (
			<div>
				<input type="text" onChange={(e) => this.textChange(e)} value={this.state.curText}/>
				<ConstraintEditor
					constraint={this.state.curConstraint}
					onUpdate={(newConstraint) => this.constraintChange(newConstraint)}/>
			</div>
		);
	}

	textChange(e: any): void {
		this.setState({
			curText: e.target.value
		});

		this.sendUpdate();
	}

	constraintChange(newConstraint: ConstraintModel): void {
		this.setState({
			curConstraint: newConstraint
		});

		this.sendUpdate();
	}

	sendUpdate: Function = debounce(() => {
		const update: PhraseModel = {
			id: this.props.initial.id,
			constraint: this.state.curConstraint,
			text: this.state.curText
		};

		this.props.socket.emit('update', update);
	}, 500);
}
