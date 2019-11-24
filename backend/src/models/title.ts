import * as mongoose from "mongoose";
import {Schema, Document} from "mongoose";

export interface ITitle extends Document {
	text: String;
}

const TitleSchema: Schema = new Schema({
	text: {type: String, required: true}
});

export default mongoose.model<ITitle>('Title', TitleSchema);
