import React, {Component} from "react";
import {TitleModel} from "../../../../backend/src/api/models/title-model";
import {debounce} from "debounce";
import {ConstraintEditor} from "../constraint/constraint-editor";

export interface TitleEditorElementProps {
	initial: TitleModel;
	socket: SocketIOClient.Socket;
}

interface TitleEditorElementState {
	curText: string;
}

export class TitleEditorElement extends Component<TitleEditorElementProps, TitleEditorElementState> {
	constructor(props: TitleEditorElementProps) {
		super(props);

		this.state = {
			curText: this.props.initial.text
		};
	}

	render() {
		return (
			<div>
				<input type="text" onChange={(e) => this.textChange(e)} value={this.state.curText}/>
				<ConstraintEditor initialConstraint={this.props.initial.constraint} onUpdate={() => {console.log("hot damn")}}/>
			</div>
		);
	}

	textChange(e: any): void {
		this.setState({
			curText: e.target.value
		});

		this.sendUpdate();
	}

	sendUpdate: Function = debounce(() => {
		const update: TitleModel = {
			id: this.props.initial.id,
			constraint: this.props.initial.constraint,
			text: this.state.curText
		};

		this.props.socket.emit('update', update);
	}, 500);
}
