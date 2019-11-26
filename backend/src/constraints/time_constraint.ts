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
	Before,
	After,
	Equal
}

export enum TimeConstraintUnit {
	MILLISECONDS_EPOCH,
	MINUTE,
	HOUR_12,
	HOUR_24,
	DAY_WEEK,
	DAY_MONTH,
	DAY_YEAR,
	MONTH,
	YEAR
}

export interface ITimeConstraintRule {
	readonly type: TimeConstraintRuleType;
	checkRule(time: Date): boolean;
}

/**
 * Compares the given value to the current time. Returns a positive if the value is greater than the current time, and
 * a negative number if the value is less than the current time
 * @param value
 * @param unit
 * @param time
 */
function compare(value: number, unit: TimeConstraintUnit, time: Date): number {
	switch (unit) {
		case TimeConstraintUnit.MILLISECONDS_EPOCH: return value - time.getTime();
		case TimeConstraintUnit.MINUTE: return value - time.getMinutes();
		case TimeConstraintUnit.HOUR_12: return value - (time.getHours() % 12);
		case TimeConstraintUnit.HOUR_24: return value - (time.getHours());
		case TimeConstraintUnit.DAY_WEEK: return value - time.getDay();
		case TimeConstraintUnit.DAY_MONTH: return value - time.getDate();
		case TimeConstraintUnit.DAY_YEAR: {
			// Copied: https://stackoverflow.com/questions/8619879/javascript-calculate-the-day-of-the-year-1-366
			const start = new Date(time.getFullYear(), 0, 0);
			const diff = (time.getTime() - start.getTime()) + ((start.getTimezoneOffset() - time.getTimezoneOffset()) * 60 * 1000);
			const oneDay = 1000 * 60 * 60 * 24;
			const day = Math.floor(diff / oneDay);
			return value - day;
		}
		case TimeConstraintUnit.MONTH: return value - time.getMonth();
		case TimeConstraintUnit.YEAR: return value - time.getFullYear();
	}
}

export class BeforeRule implements ITimeConstraintRule {
	readonly type: TimeConstraintRuleType = TimeConstraintRuleType.Before;

	constructor(private unit: TimeConstraintUnit, private value: number, private inclusive = false) { }

	checkRule(time: Date): boolean {
		if (this.inclusive) {
			return compare(this.value, this.unit, time) <= 0;
		} else {
			return compare(this.value, this.unit, time) < 0;
		}
	}
}

export class AfterRule implements ITimeConstraintRule {
	readonly type: TimeConstraintRuleType = TimeConstraintRuleType.After;

	constructor(private unit: TimeConstraintUnit, private value: number, private inclusive = false) { }

	checkRule(time: Date): boolean {
		if (this.inclusive) {
			return compare(this.value, this.unit, time) >= 0;
		} else {
			return compare(this.value, this.unit, time) > 0;
		}
	}
}

export class EqualRule implements ITimeConstraintRule {
	readonly type: TimeConstraintRuleType = TimeConstraintRuleType.Equal;

	constructor(private unit: TimeConstraintUnit, private value: number) { }

	checkRule(time: Date): boolean {
		return compare(this.value, this.unit, time) == 0;
	}
}
