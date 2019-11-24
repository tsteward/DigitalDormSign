import React, {Component} from "react";
import io from 'socket.io-client';
import {TitleModel} from '../../../../backend/src/api/models/title-model';
import {Phrase} from "./phrase";
import './title.scss';

interface TitleProps {

}

interface TitleState {
	title: String;
}

export class Title extends Component<TitleProps, TitleState> {
	state: TitleState = {
		title: ""
	};

	render() {
		return (
			<div className="title-container">
				<h1>{this.state.title}</h1>
				<Phrase/>
			</div>
		);
	}

	componentDidMount(): void {
		const titleSocket = io('http://localhost:8080/title');

		titleSocket.on('update', (newTitle: TitleModel) => {
			console.log(newTitle);
			this.setState({
				title: newTitle.text
			});
		});
	}
}
