import {ConstraintModel} from "./constraint-model";

export interface PhraseModel {
	id: string;
	text: string;
	constraint: ConstraintModel;
}
