import * as mongoose from "mongoose";
import {Schema, Document} from "mongoose";
import {Constraint, IConstrainable, IConstraint} from "../constraints/constraint";
import {Phrase} from "../api/models/phrase";

export interface IPhrase extends Document, IConstrainable {
	text: string;
	constraint: IConstraint;

	toApiModel(): Phrase
}

export class PhraseSchema extends Schema {
	constructor() {
		super({
			text: {type: String, required: true},
			constraint: {type: Constraint, required: false}
		});

		this.methods.toApiModel = this.toApiModel;
	}

	toApiModel(this: IPhrase): Phrase {
		return {
			id: this._id,
			constraint: this.constraint,
			text: this.text
		};
	}
}

export default mongoose.model<IPhrase>('Phrase', new PhraseSchema());
