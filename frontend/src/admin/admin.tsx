import React, {Component} from "react";
import './admin.scss';
import {TitleEditorList} from "./title/title-editor-list";

export class Admin extends Component {
	render() {
		return (
			<div>
				<TitleEditorList/>
			</div>
		);
	}
}
