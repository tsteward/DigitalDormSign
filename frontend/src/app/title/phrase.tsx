import React, {Component} from "react";
import io from "socket.io-client";
import {PhraseModel} from '../../../../backend/src/api/models/phrase-model';
import './phrase.scss';

interface PhraseProps {

}

interface PhraseState {
	curPhrase: string;
}

export class Phrase extends Component<PhraseProps, PhraseState> {
	state: PhraseState = {
		curPhrase: ''
	};

	render() {
		return (
			<p className="phrase">{this.state.curPhrase}</p>
		);
	}

	componentDidMount(): void {
		const phraseSocket = io('http://localhost:8080/phrase');
		phraseSocket.emit('refresh');

		phraseSocket.on('refresh', (newPhrase: PhraseModel) => {
			this.setState({
				curPhrase: newPhrase.text
			});
		});
	}
}
