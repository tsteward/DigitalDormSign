import React, {Component} from "react";
import {TitleModel} from "../../../../backend/src/api/models/title-model";
import {debounce} from "debounce";
import {ConstraintEditor} from "../constraint/constraint-editor";
import { ConstraintModel } from "../../../../backend/src/api/models/constraint-model";

export interface TitleEditorElementProps {
	initial: TitleModel;
	socket: SocketIOClient.Socket;
}

interface TitleEditorElementState {
	curText: string;
	curConstraint: ConstraintModel;
}

export class TitleEditorElement extends Component<TitleEditorElementProps, TitleEditorElementState> {
	constructor(props: TitleEditorElementProps) {
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
		console.log('this is sent: ' + JSON.stringify(newConstraint));
		this.setState({
			curConstraint: newConstraint
		});

		this.sendUpdate();
	}

	sendUpdate: Function = debounce(() => {
		const update: TitleModel = {
			id: this.props.initial.id,
			constraint: this.state.curConstraint,
			text: this.state.curText
		};

		this.props.socket.emit('update', update);
	}, 500);
}
