import * as mongoose from "mongoose";
import {Schema, Document} from "mongoose";
import {Constraint, IConstrainable, IConstraint} from "../constraints/constraint";

export interface IPhrase extends Document, IConstrainable {
	text: String;
	constraint: IConstraint;
}

const PhraseSchema: Schema = new Schema({
	text: {type: String, required: true},
	// @ts-ignore
	constraint: {type: Constraint, required: false}
});

export default mongoose.model<IPhrase>('Phrase', PhraseSchema);
