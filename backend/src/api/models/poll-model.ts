import {ConstraintModel} from "./constraint-model";

export interface PollModel {
	id: string;
	question: string;
	answers: string[];
	answerCounts: number[];
	totalAnswers: number;
	constraint: ConstraintModel;
}
