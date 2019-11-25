import React, {Component} from "react";

export type EditableObject = {hour: number, inclusive: boolean}

export interface TimeConstraintHourEditorProps {
	onUpdate: (newObj: EditableObject) => void;
	rule: EditableObject
}

export class TimeConstraintHourEditor extends Component<TimeConstraintHourEditorProps> {
	render() {
		return (
			<span>
				<input type='number' value={this.props.rule.hour} onChange={(e) => this.onHourChange(e)}/>
				<input type='checkbox' checked={this.props.rule.inclusive} onChange={(e) => this.onInclusiveChange(e)}/>
			</span>
		);
	}

	onHourChange(e: any): void {
		let newObj: EditableObject = Object.assign(this.props.rule, {hour: e.target.value});
		this.props.onUpdate(newObj);
	}

	onInclusiveChange(e: any): void {
		let newObj: EditableObject = Object.assign(this.props.rule, {inclusive: e.target.checked});
		this.props.onUpdate(newObj);
	}
}
