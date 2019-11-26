import {IConstraint} from "../../constraints/constraint";

export interface PollModel {
	id: string;
	question: string;
	answers: string[];
	answerCounts: number[];
	totalAnswers: number;
	constraint: IConstraint;
}
