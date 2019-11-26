import React, {Component} from 'react';
import {Title} from "./title/title";
import './app.scss';
import {PollActivity} from "./activities/poll/poll-activity";

export class App extends Component {
	render() {
		return (
			<div className="app">
				<div className="title">
					<Title/>
				</div>
				<div className="activity">
					<PollActivity/>
				</div>
			</div>
		);
	}
}
