import {ConstraintType} from "../../constraints/constraint";
import {TimeConstraintRuleType} from "../../constraints/time_constraint";

// Re-export these enums so that the frontend is not importing from outside the api directory
export {ConstraintType as ConstraintType, TimeConstraintRuleType as TimeConstraintRuleType};

export interface ConstraintModel {
	type: ConstraintType;
}

export interface TimeConstraintRuleModel {
	type: TimeConstraintRuleType
}

export interface TimeConstraintModel extends ConstraintModel{
	rule: TimeConstraintRuleModel | undefined | null;
}

export interface BeforeHourTimeConstraintModel extends TimeConstraintRuleModel {
	hour: number;
	inclusive: boolean;
}
export {BeforeHourTimeConstraintModel as AfterHourTimeConstraintModel};
