import * as mongoose from "mongoose";
import {Schema, Document, SchemaTypes} from "mongoose";
import {Constraint, IConstrainable, IConstraint} from "../constraints/constraint";
import {PollModel} from "../api/models/poll-model";
import _ from "lodash";

export interface IPoll extends Document, IConstrainable {
	question: string;
	answers: string[];
	answerCounts: number[];
	totalAnswers: number;
	constraint: IConstraint;

	toApiModel(): PollModel;
	updateFromModel(updatedTitle: PollModel): Promise<IPoll>;
}

export class PollSchema extends Schema {
	constructor() {
		super({
			question: {type: String, required: false},
			answers: {type: [String], required: true},
			answerCounts: {type: [Number], required: true},
			totalAnswers: {type: Number, required: true},
			constraint: {type: Constraint, required: false}
		});

		this.methods.toApiModel = this.toApiModel;
		this.methods.updateFromModel = this.updateFromModel;
	}

	toApiModel(this: IPoll): PollModel {
		return {
			id: this._id,
			question: this.question,
			answers: this.answers,
			answerCounts: this.answerCounts,
			totalAnswers: this.totalAnswers,
			constraint: this.constraint
		};
	}

	updateFromModel(this: IPoll, updatedPoll: PollModel): Promise<IPoll> {
		// Don't merge the id in, it should never be modified
		_.merge(this, {
			question: updatedPoll.question,
			totalAnswers: updatedPoll.totalAnswers,
			constraint: updatedPoll.constraint
		});

		this.answers = updatedPoll.answers;
		this.answerCounts = updatedPoll.answerCounts;

		this.markModified('question');
		this.markModified('answers');
		this.markModified('answerCounts');
		this.markModified('totalAnswers');
		this.markModified('constraint');
		return this.save();
	}
}

export default mongoose.model<IPoll>('Poll', new PollSchema());
