import {TimeConstraintModel, TimeConstraintRuleType} from '../../../../backend/src/api/models/constraint-model'
import {ConstraintUpdatedCallback} from "./constraint-editor";
import React, {Component} from "react";
import _ from 'lodash';

export interface TimeConstraintEditorProps {
	initialConstraint: TimeConstraintModel;
	onUpdate: ConstraintUpdatedCallback;
}

export interface TimeConstraintEditorState {
	curConstraint: TimeConstraintModel;
}

export class TimeConstraintEditor extends Component<TimeConstraintEditorProps, TimeConstraintEditorState> {
	constructor(props: TimeConstraintEditorProps) {
		super(props);

		this.state = {
			curConstraint: _.cloneDeep(props.initialConstraint)
		};
	}

	render() {
		const selected: number = (this.state.curConstraint.rule) ? this.state.curConstraint.rule.type : -1;

		return (
			<div>
				<select value={selected}>
					<option value={-1}>None</option>
					<option value={TimeConstraintRuleType.BeforeHour}>Before Hour</option>
					<option value={TimeConstraintRuleType.AfterHour}>After Hour</option>
				</select>
			</div>
		);
	}
}
