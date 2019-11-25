import React, {Component, ReactElement} from "react";
import {ConstraintModel, TimeConstraintModel} from "../../../../backend/src/api/models/constraint-model"
import {TimeConstraintEditor} from "./time-constraint-editor";
import {ConstraintType} from "../../../../backend/src/constraints/constraint";

export type ConstraintUpdatedCallback = (newConstraint: ConstraintModel) => void;

export interface ConstraintEditorProps {
	constraint: ConstraintModel;
	onUpdate: ConstraintUpdatedCallback;
}

export class ConstraintEditor extends Component<ConstraintEditorProps> {
	render() {
		let editor: ReactElement | null;
		switch (this.props.constraint.type) {
			case ConstraintType.Time:
				editor = (
					<TimeConstraintEditor
						constraint={this.props.constraint as unknown as TimeConstraintModel}
						onUpdate={this.props.onUpdate}/>
				);
				break;
			default:
				editor = null;
		}

		return (
			<div>
				<select value={this.props.constraint.type} onChange={e => this.onTypeChange(e)}>
					<option value={-1}>None</option>
					<option value={ConstraintType.Time}>Time</option>
				</select>
				{editor}
			</div>
		);
	}

	onTypeChange(e: any) {
		switch (parseInt(e.target.value)) {
			case ConstraintType.Time: {
				let newConstraint: TimeConstraintModel = {
					type: ConstraintType.Time,
					rule: null
				};
				this.props.onUpdate(newConstraint);
				break;
			}
			default:
				this.props.onUpdate({type: ConstraintType.None});
		}
	}
}
