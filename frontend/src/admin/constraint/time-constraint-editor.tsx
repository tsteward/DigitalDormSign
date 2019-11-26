import React, {Component, ReactElement} from "react";
import _ from 'lodash';
import {TimeConstraintBeforeEditor} from "./time-constraint-before-editor";
import {
	AfterRuleModel,
	BeforeRuleModel,
	EqualRuleModel,
	TimeConstraintModel,
    TimeConstraintRuleModel,
    TimeConstraintRuleType,
    TimeConstraintUnit
} from "../../../../backend/src/api/models/constraint-model";
import {TimeConstraintAfterEditor} from "./time-constraint-after-editor";
import {TimeConstraintEqualEditor} from "./time-constraint-equal-editor";

export interface TimeConstraintEditorProps {
	constraint: TimeConstraintModel;
	onUpdate: (newConstraint: TimeConstraintModel) => void;
}

export class TimeConstraintEditor extends Component<TimeConstraintEditorProps> {
	render() {
		return (
			<span>
				<select name="type" value={this.getSelected()} onChange={(e) => this.onTypeChange(e)}>
					<option value={-1}>None</option>
					<option value={TimeConstraintRuleType.Before}>Before</option>
					<option value={TimeConstraintRuleType.Equal}>Equal</option>
					<option value={TimeConstraintRuleType.After}>After</option>
				</select>
				{this.renderEditor()}
			</span>
		);
	}

	/**
	 * Renders the appropriate editor for the current time constraint rule
	 */
	private renderEditor(): ReactElement | null {
		switch (this.getSelected()) {
			case TimeConstraintRuleType.After:
				return <TimeConstraintAfterEditor
					rule={this.props.constraint.rule as AfterRuleModel}
					onChange={(newRule) => this.onRuleChange(newRule)}/>;
			case TimeConstraintRuleType.Before:
				return <TimeConstraintBeforeEditor
					rule={this.props.constraint.rule as BeforeRuleModel}
					onChange={(newRule) => this.onRuleChange(newRule)}/>;
			case TimeConstraintRuleType.Equal:
				return <TimeConstraintEqualEditor
					rule={this.props.constraint.rule as EqualRuleModel}
					onChange={(newRule) => this.onRuleChange(newRule)}/>;
			default:
				return null;
		}
	}

	private getSelected(): TimeConstraintRuleType {
		return (this.props.constraint.rule) ? this.props.constraint.rule.type : TimeConstraintRuleType.None;
	}

	onTypeChange(e: any) {
		let newConstraint: TimeConstraintModel = _.cloneDeep(this.props.constraint);

		switch (parseInt(e.target.value)) {
			case TimeConstraintRuleType.After: {
				let newRule: AfterRuleModel = {
					type: TimeConstraintRuleType.After,
					unit: TimeConstraintUnit.HOUR_24,
					value: 0,
					inclusive: false
				};
				newConstraint.rule = newRule;
				break;
			}
			case TimeConstraintRuleType.Before: {
				let newRule: BeforeRuleModel = {
					type: TimeConstraintRuleType.Before,
					unit: TimeConstraintUnit.HOUR_24,
					value: 0,
					inclusive: false
				};
				newConstraint.rule = newRule;
				break;
			}
			case TimeConstraintRuleType.Equal: {
				let newRule: EqualRuleModel = {
					type: TimeConstraintRuleType.Equal,
					unit: TimeConstraintUnit.HOUR_24,
					value: 0,
				};
				newConstraint.rule = newRule;
				break;
			}
			default:
				newConstraint.rule = null;
		}

		this.props.onUpdate(newConstraint);
	}

	onRuleChange(newRule: TimeConstraintRuleModel) {
		let newConstraint: TimeConstraintModel = _.cloneDeep(this.props.constraint);
		newConstraint.rule = newRule;
		this.props.onUpdate(newConstraint);
	}
}
