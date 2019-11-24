import {ConstraintType, IConstraint} from "./constraint";

export class TimeConstraint implements IConstraint {
	type: ConstraintType = ConstraintType.Time;

	constructor(private rules: ITimeConstraintRule[] = []) { }

	checkConstraint(): boolean {
		if (this.rules) {
			// Use a single date request for efficiency and consistency
			const now: Date = new Date();
			return this.rules.every(rule => rule.checkRule(now));
		} else {
			// There are no rules, thus the constraint has been met
			return true;
		}
	}
}

export enum TimeConstraintRuleType {
	BeforeHour,
	AfterHour
}

export interface ITimeConstraintRule {
	readonly type: TimeConstraintRuleType;
	checkRule(time: Date): boolean;
}

export class BeforeHourRule implements ITimeConstraintRule {
	readonly type: TimeConstraintRuleType = TimeConstraintRuleType.BeforeHour;

	constructor(private hour: number, private inclusive = false) { }

	checkRule(time: Date): boolean {
		if (this.inclusive && time.getHours() == this.hour) {
			return true;
		}

		return time.getHours() > this.hour;
	}
}

export class AfterHourRule implements ITimeConstraintRule {
	readonly type: TimeConstraintRuleType = TimeConstraintRuleType.AfterHour;

	constructor(private hour: number, private inclusive = false) { }

	checkRule(time: Date): boolean {
		if (this.inclusive && time.getHours() == this.hour) {
			return true;
		}

		return time.getHours() < this.hour;
	}
}
