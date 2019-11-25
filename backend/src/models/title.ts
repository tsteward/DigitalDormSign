import * as mongoose from "mongoose";
import {Schema, Document, SchemaTypes} from "mongoose";
import {Constraint, IConstrainable, IConstraint} from "../constraints/constraint";
import {TitleModel} from "../api/models/title-model";
import _ from "lodash";

export interface ITitle extends Document, IConstrainable {
	text: string;
	constraint: IConstraint;

	toApiModel(): TitleModel;
	updateFromModel(updatedTitle: TitleModel): void;
}

export class TitleSchema extends Schema {
	constructor() {
		super({
			text: {type: String, required: true},
			constraint: {type: Constraint, required: false}
		});

		this.methods.toApiModel = this.toApiModel;
		this.methods.updateFromModel = this.updateFromModel;
	}

	toApiModel(this: ITitle): TitleModel {
		return {
			id: this._id,
			constraint: this.constraint,
			text: this.text
		};
	}

	updateFromModel(this: ITitle, updatedTitle: TitleModel) {
		// Don't merge the id in, it should never be modified
		_.merge(this, {
			constraint: updatedTitle.constraint,
			text: updatedTitle.text
		});

		this.save();
	}
}

export default mongoose.model<ITitle>('Title', new TitleSchema());
