import {SchemaType} from "mongoose";
import * as mongoose from "mongoose";
import {AfterHourRule, BeforeHourRule, TimeConstraint, TimeConstraintRuleType} from "./time_constraint";

export enum ConstraintType {
	Time
}

/**
 * An interface for all constraints to implement. This gives a way to identify the type of the constraint so that it can
 * be correctly cast and called.
 */
export interface IConstraint {
	type: ConstraintType;
	checkConstraint(): boolean;
}

/**
 * A interface that describes an object that can be constrained. For instance, a title option can be constrained so that
 * different titles are displayed at certain times of the day
 */
export interface IConstrainable {
	constraint: IConstraint | null | undefined;
}

// Add ConstraintModel as a schema type. This is necessarily messy. A custom schema used so that when the records are
// returned by mongoose they are not just plain value objects but are full classes with all of the functions associated
// with them.

// Add an object to be used in schemas in placed of IConstrain which is invalid since it is an interface
export class Constraint { }

// Create the schema type
class ConstraintSchemaType extends SchemaType {
	constructor(key: any, options: any) {
		super(key, options, 'Constraint');
	}

	cast(value: any): any | null {
		// Add for each new constraint type
		switch (value.type) {
			case ConstraintType.Time:
				const rules = (value.rules) ? value.rules.map((valueRule: any) => {
					switch (valueRule.type) {
						case TimeConstraintRuleType.AfterHour:
							return new AfterHourRule(valueRule.hour, valueRule.inclusive);
						case TimeConstraintRuleType.BeforeHour:
							return new BeforeHourRule(valueRule.hour, valueRule.inclusive);
					}
				}) : [];
				return new TimeConstraint(rules);
			default:
				return null;
		}
	}
}

// Mongoose checks if it has a property in Types that matches the name of the schema type supplied. So assign the type
// here even though we will never reference it again.
// @ts-ignore
mongoose.Schema.Types.Constraint = ConstraintSchemaType;
