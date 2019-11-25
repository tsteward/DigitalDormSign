import React, {Component} from "react";
import {ConstraintModel, ConstraintType, TimeConstraintModel} from "../../../../backend/src/api/models/constraint-model"
import {TimeConstraintEditor} from "./time-constraint-editor";

export type ConstraintUpdatedCallback = (newConstraint: ConstraintModel) => void;

export interface ConstraintEditorProps {
	constraint: ConstraintModel;
	onUpdate: ConstraintUpdatedCallback;
}

export class ConstraintEditor extends Component<ConstraintEditorProps> {
	render() {
		switch (this.props.constraint.type) {
			case ConstraintType.Time:
				return (
					<TimeConstraintEditor
						constraint={this.props.constraint as unknown as TimeConstraintModel}
						onUpdate={this.props.onUpdate}/>
				);
			default:
				return null;
		}
	}
}
