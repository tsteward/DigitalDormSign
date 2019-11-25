import * as models from '../../../../backend/src/api/models/constraint-model'
import React, {Component, ReactElement} from "react";
import _ from 'lodash';
import {TimeConstraintHourEditor} from "./time-constraint-hour-editor";

export interface TimeConstraintEditorProps {
	constraint: models.TimeConstraintModel;
	onUpdate: (newConstraint: models.TimeConstraintModel) => void;
}

export class TimeConstraintEditor extends Component<TimeConstraintEditorProps> {
	render() {
		const selected = (this.props.constraint.rule) ? this.props.constraint.rule.type : -1;

		let editor: ReactElement | null;
		switch (selected) {
			case models.TimeConstraintRuleType.AfterHour:
			case models.TimeConstraintRuleType.BeforeHour:
				editor = (
					<TimeConstraintHourEditor
						rule={this.props.constraint.rule as unknown as models.AfterHourTimeConstraintModel}
						onUpdate={(newRule) => this.onRuleChange(newRule as unknown as models.TimeConstraintRuleModel)}/>);
					break;
			default:
				editor = null;
		}

		return (
			<div>
				<select name="type" value={selected} onChange={(e) => this.onTypeChange(e)}>
					<option value={-1}>None</option>
					<option value={models.TimeConstraintRuleType.BeforeHour}>Before Hour</option>
					<option value={models.TimeConstraintRuleType.AfterHour}>After Hour</option>
				</select>
				{editor}
			</div>
		);
	}

	onTypeChange(e: any) {
		let newConstraint: models.TimeConstraintModel = _.cloneDeep(this.props.constraint);

		switch (parseInt(e.target.value)) {
			case models.TimeConstraintRuleType.AfterHour: {
				let newRule: models.AfterHourTimeConstraintModel = {
					type: models.TimeConstraintRuleType.AfterHour,
					hour: -1,
					inclusive: false
				};
				newConstraint.rule = newRule;
				break;
			}
			case models.TimeConstraintRuleType.BeforeHour: {
				let newRule: models.AfterHourTimeConstraintModel = {
					type: models.TimeConstraintRuleType.BeforeHour,
					hour: -1,
					inclusive: false
				};
				newConstraint.rule = newRule;
				break;
			}
			default:
				newConstraint.rule = null;
		}

		this.props.onUpdate(newConstraint);
	}

	onRuleChange(newRule: models.TimeConstraintRuleModel) {
		let newConstraint: models.TimeConstraintModel = _.cloneDeep(this.props.constraint);
		newConstraint.rule = newRule;
		this.props.onUpdate(newConstraint);
	}
}
