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
	constraint: IConstraint;
}
