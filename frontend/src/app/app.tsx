import React, {Component} from 'react';
import {Title} from "./title/title";
import './app.scss';

export class App extends Component {
	render() {
		return (
			<div className="app">
				<div className="title">
					<Title/>
				</div>
				<div className="activity">
				</div>
			</div>
		);
	}
}
