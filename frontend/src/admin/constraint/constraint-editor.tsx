import React, {Component} from "react";
import {ConstraintModel, ConstraintType, TimeConstraintModel} from "../../../../backend/src/api/models/constraint-model"
import {TimeConstraintEditor} from "./time-constraint-editor";

export type ConstraintUpdatedCallback = (newConstraint: ConstraintModel) => void;

export interface ConstraintEditorProps {
	initialConstraint: ConstraintModel;
	onUpdate: ConstraintUpdatedCallback;
}

export class ConstraintEditor extends Component<ConstraintEditorProps> {
	render() {
		switch (this.props.initialConstraint.type) {
			case ConstraintType.Time:
				return (
					<TimeConstraintEditor
						initialConstraint={this.props.initialConstraint as unknown as TimeConstraintModel}
						onUpdate={() => console.log("testing")}/>
				);
			default:
				return null;
		}
	}
}
