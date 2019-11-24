import React, {Component} from "react";
import {Route, Switch} from 'react-router'
import {App} from "./app";
import {BrowserRouter, HashRouter} from "react-router-dom";
import {Admin} from "./admin/admin-component";

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
