import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import {Router} from "./router";

ReactDOM.render((
	<div className="root">
		<link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet" />

		<Router/>
	</div>
), document.getElementById('root'));
