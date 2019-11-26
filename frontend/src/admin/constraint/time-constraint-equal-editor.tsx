import React, {Component} from "react";
import {EqualRuleModel, TimeConstraintUnit} from "../../../../backend/src/api/models/constraint-model";
import _ from "lodash";

export interface TimeConstraintEqualEditorProps {
	rule: EqualRuleModel;
	onChange: (newRule: EqualRuleModel) => void;
}

export class TimeConstraintEqualEditor extends Component<TimeConstraintEqualEditorProps> {
	render() {
		return (
			<span>
				<select value={this.props.rule.unit} onChange={(e) => this.onUnitChange(e)}>
					<option value={TimeConstraintUnit.MILLISECONDS_EPOCH}>Epoch Milliseconds</option>
					<option value={TimeConstraintUnit.MINUTE}>Minute (0-60)</option>
					<option value={TimeConstraintUnit.HOUR_12}>Hour (0-11)</option>
					<option value={TimeConstraintUnit.HOUR_24}>Hour (0-23)</option>
					<option value={TimeConstraintUnit.DAY_WEEK}>Day of Week (0-6)</option>
					<option value={TimeConstraintUnit.DAY_MONTH}>Day of Month (0-30)</option>
					<option value={TimeConstraintUnit.DAY_YEAR}>Day of Year (0-365)</option>
					<option value={TimeConstraintUnit.MONTH}>Month of Year (0-11)</option>
					<option value={TimeConstraintUnit.YEAR}>Year (calendar)</option>
				</select>
				<input type='number' value={this.props.rule.value} onChange={(e) => this.onValueChange(e)}/>
			</span>
		);
	}

	private onUnitChange(e: any): void {
		let newRule: EqualRuleModel = _.cloneDeep(this.props.rule);
		newRule.unit = parseInt(e.target.value);
		this.props.onChange(newRule);
	}

	private onValueChange(e: any): void {
		let newRule: EqualRuleModel = _.cloneDeep(this.props.rule);
		newRule.value = parseFloat(e.target.value);
		this.props.onChange(newRule);
	}
}
