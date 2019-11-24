import React, {Component} from "react";
import io from 'socket.io-client';
import {ITitle} from '../../../backend/src/models/title';

export interface TitleProps {

}

export interface TitleState {
	title: String;
}

export class Title extends Component<TitleProps, TitleState> {
	state: TitleState = {
		title: ""
	};

	render() {
		return (
			<h1>{this.state.title}</h1>
		);
	}

	componentDidMount(): void {
		const titleSocket = io('http://localhost:8080/title');

		titleSocket.on('update', (newTitle: ITitle) => {
			this.setState({
				title: newTitle.text
			});
		});
	}
}
