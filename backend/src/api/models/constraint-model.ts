import {ConstraintType} from "../../constraints/constraint";
import {TimeConstraintRuleType, TimeConstraintUnit} from "../../constraints/time_constraint";

// Re-export these enums so that the frontend is not importing from outside the api directory
export {
	ConstraintType as ConstraintType,
	TimeConstraintUnit as TimeConstraintUnit,
	TimeConstraintRuleType as TimeConstraintRuleType
};

export interface ConstraintModel {
	type: ConstraintType;
}

export interface TimeConstraintRuleModel {
	type: TimeConstraintRuleType
}

export interface BeforeRuleModel extends TimeConstraintRuleModel {
	value: number;
	unit: TimeConstraintUnit;
	inclusive: boolean;
}

export interface AfterRuleModel extends TimeConstraintRuleModel {
	value: number;
	unit: TimeConstraintUnit;
	inclusive: boolean;
}

export interface EqualRuleModel extends TimeConstraintRuleModel {
	value: number;
	unit: TimeConstraintUnit;
}

export interface TimeConstraintModel extends ConstraintModel{
	rule: TimeConstraintRuleModel | undefined | null;
}
