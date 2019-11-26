import * as mongoose from "mongoose";
import {Schema, Document} from "mongoose";
import {Constraint, IConstrainable, IConstraint} from "../constraints/constraint";
import {PhraseModel} from "../api/models/phrase-model";
import _ from "lodash";

export interface IPhrase extends Document, IConstrainable {
	text: string;
	constraint: IConstraint;

	toApiModel(): PhraseModel;
	updateFromModel(updatedPhrase: PhraseModel): Promise<IPhrase>;
}

export class PhraseSchema extends Schema {
	constructor() {
		super({
			text: {type: String, required: false},
			constraint: {type: Constraint, required: false}
		});

		this.methods.toApiModel = this.toApiModel;
		this.methods.updateFromModel = this.updateFromModel;
	}

	toApiModel(this: IPhrase): PhraseModel {
		return {
			id: this._id,
			constraint: this.constraint,
			text: this.text
		};
	}

	updateFromModel(this: IPhrase, updatedPhrase: PhraseModel): Promise<IPhrase> {
		// Don't merge the id in, it should never be modified
		_.merge(this, {
			constraint: updatedPhrase.constraint,
			text: updatedPhrase.text
		});

		this.markModified('constraint');
		this.markModified('text');
		return this.save();
	}
}

export default mongoose.model<IPhrase>('Phrase', new PhraseSchema());
