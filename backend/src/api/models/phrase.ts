import {Constraint} from "./constraint";

export interface Phrase {
	id: string;
	text: string;
	constraint: Constraint;
}
