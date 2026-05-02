import mongoose, { Schema, Document, Types } from "mongoose";

export interface INoteSample extends Document {
  nodeIndex: string;
  audioUrl: number;
  guitar: Types.ObjectId;
}

const noteSampleSchema: Schema = new Schema({
  nodeIndex: {
    type: Number,
    required: true,
  },
  audioUrl: {
    type: String,
    required: true,
  },
  guitar: {
    type: Types.ObjectId,
    ref: "Guitar",
  },
});

const NoteSample = mongoose.model<INoteSample>("NoteSample", noteSampleSchema);
export default NoteSample;
