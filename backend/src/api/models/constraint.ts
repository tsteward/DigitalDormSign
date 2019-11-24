import {ConstraintType} from "../../constraints/constraint";
import {TimeConstraintRuleType} from "../../constraints/time_constraint";

// Re-export these enums so that the frontend is not importing from outside the api directory
export {ConstraintType, TimeConstraintRuleType};

export interface Constraint {
	type: ConstraintType;
}

export interface TimeConstraintRule {
	type: TimeConstraintRuleType
}

export interface TimeConstraint {
	rules: TimeConstraintRule[] | undefined | null;
}

export interface BeforeHourTimeConstraint {
	hour: number;
	inclusive: boolean;
}
export {BeforeHourTimeConstraint as AfterHourTimeConstraint};
