import React, {Component} from "react";
import './admin.scss';
import {TitleEditorList} from "./title/title-editor-list";
import {PhraseEditorList} from "./phrase/phrase-editor-list";
import {PollEditorList} from "./poll/poll-editor-list";

export class Admin extends Component {
	render() {
		return (
			<div>
				<TitleEditorList/>
				<PhraseEditorList/>
				<PollEditorList/>
			</div>
		);
	}
}
