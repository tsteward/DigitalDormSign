import {ConstraintType, IConstraint} from "./constraint";

export class TimeConstraint implements IConstraint {
	type: ConstraintType = ConstraintType.Time;

	constructor(private rule: ITimeConstraintRule | null = null) { }

	checkConstraint(): boolean {
		if (this.rule) {
			return this.rule.checkRule(new Date());
		} else {
			// There is no rule, thus the constraint has been met
			return true;
		}
	}
}

export enum TimeConstraintRuleType {
	None = -1,
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

		return time.getHours() < this.hour;
	}
}

export class AfterHourRule implements ITimeConstraintRule {
	readonly type: TimeConstraintRuleType = TimeConstraintRuleType.AfterHour;

	constructor(private hour: number, private inclusive = false) { }

	checkRule(time: Date): boolean {
		if (this.inclusive && time.getHours() == this.hour) {
			return true;
		}

		console.log('hours: ' + time.getHours() + ' ' + this.hour);
		return time.getHours() > this.hour;
	}
}
