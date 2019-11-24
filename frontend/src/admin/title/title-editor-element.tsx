import React, {Component} from "react";
import {TitleModel} from "../../../../backend/src/api/models/title-model";
import {debounce} from "debounce";

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
			<input type="text" onChange={(e) => this.textChange(e)} value={this.state.curText}/>
		);
	}

	textChange(e: any): void {
		this.setState({
			curText: e.target.value
		});

		this.sendUpdate();
	}

	sendUpdate: Function = debounce(() => {
		console.log('send update');
	}, 500);
}
