import React, {Component} from "react";
import io from 'socket.io-client';

export class Title extends Component {
	render() {
		return (
			<h1>Welcome to 2280 Stanton</h1>
		);
	}

	componentDidMount(): void {
		const conn = io('http://localhost:8080');
		conn.on('echo', (test: any) => {console.log(test)});
		conn.on('connect', () => {
			console.log("connected");
			conn.emit('echo', "once again");
		});
	}
}
