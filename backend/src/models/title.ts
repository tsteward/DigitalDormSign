import * as mongoose from "mongoose";
import {Schema, Document, SchemaTypes} from "mongoose";
import {Constraint, IConstrainable, IConstraint} from "../constraints/constraint";

export interface ITitle extends Document, IConstrainable {
	text: String;
	constraint: IConstraint;
}

const TitleSchema: Schema = new Schema({
	text: {type: String, required: true},
	// @ts-ignore
	constraint: {type: Constraint, required: false}
});

export default mongoose.model<ITitle>('Title', TitleSchema);
