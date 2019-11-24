import * as mongoose from "mongoose";
import {Schema, Document, SchemaTypes} from "mongoose";
import {Constraint, IConstrainable, IConstraint} from "../constraints/constraint";
import {TitleModel} from "../api/models/title-model";

export interface ITitle extends Document, IConstrainable {
	text: string;
	constraint: IConstraint;

	toApiModel(): TitleModel;
}

export class TitleSchema extends Schema {
	constructor() {
		super({
			text: {type: String, required: true},
			constraint: {type: Constraint, required: false}
		});

		this.methods.toApiModel = this.toApiModel;
	}

	toApiModel(this: ITitle): TitleModel {
		return {
			id: this._id,
			constraint: this.constraint,
			text: this.text
		};
	}
}

export default mongoose.model<ITitle>('Title', new TitleSchema());
