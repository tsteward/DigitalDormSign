import React, {Component} from "react";
import {Route, Switch} from 'react-router'
import {BrowserRouter} from "react-router-dom";
import {Admin} from "./admin/admin";
import {App} from "./app/app";

export class Router extends Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={App}/>
					<Route path="/admin" component={Admin}/>
				</Switch>
			</BrowserRouter>
		);
	}
}
