import * as mongoose from "mongoose";
import {Schema, Document} from "mongoose";
import {Constraint, IConstrainable, IConstraint} from "../constraints/constraint";
import {PhraseModel} from "../api/models/phrase-model";

export interface IPhrase extends Document, IConstrainable {
	text: string;
	constraint: IConstraint;

	toApiModel(): PhraseModel
}

export class PhraseSchema extends Schema {
	constructor() {
		super({
			text: {type: String, required: true},
			constraint: {type: Constraint, required: false}
		});

		this.methods.toApiModel = this.toApiModel;
	}

	toApiModel(this: IPhrase): PhraseModel {
		return {
			id: this._id,
			constraint: this.constraint,
			text: this.text
		};
	}
}

export default mongoose.model<IPhrase>('Phrase', new PhraseSchema());
